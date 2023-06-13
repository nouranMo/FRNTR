import Furniture from "../models/furniture.js";
import Cart from "../models/cart.js";
import Order from "../models/order.js";
import User from "../models/user.js";
import nodemailer from "nodemailer";
const userviewproduct = {
  userview: async (req, res) => {
    const { category } = req.params;
    let products = await Furniture.find({ category });

    if (products) {
      products.forEach((product) => {
        if (product.photo && product.photo.length > 0) {
          product.photo = product.photo.map((photo) =>
            photo.replace(/\\/g, "/").replace("public/", "/")
          );
        }
      });
    }

    // Find the highest and lowest prices
    const highestPrice = Math.max(...products.map((product) => product.price));
    const lowestPrice = Math.min(...products.map((product) => product.price));

    console.log("Highest Price:", highestPrice);
    console.log("Lowest Price:", lowestPrice);

    // Check if a filter has been applied
    const minPrice = parseInt(req.query.minPrice);
    const maxPrice = parseInt(req.query.maxPrice);

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      // Filter the products based on the price range
      products = products.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    res.render("clientproduct", {
      product: products,
      highestPrice,
      lowestPrice,
      user: req.session.user === undefined ? "" : req.session.user,
    });
  },
  filtering: async (req, res) => {
    const min = req.query.min;
    const max = req.query.max;

    try {
      // Use the min and max values to filter the products from the database
      const products = await Furniture.find({
        price: { $gte: min, $lte: max },
      });
      if (products) {
        products.forEach((product) => {
          if (product.photo && product.photo.length > 0) {
            product.photo = product.photo.map((photo) =>
              photo.replace(/\\/g, "/").replace("public/", "/")
            );
          }
        });
      }
      res.json({ products });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while filtering products." });
    }
  },

  checkout: async (req, res) => {
    console.log("hello");
    const cart = req.query.cart;
    const productlist = await Cart.findById({ _id: cart });
    const furniture = await Furniture.find();
    console.log("found the product " + productlist);
    if (productlist) {
      furniture.forEach((product) => {
        if (product.photo && product.photo.length > 0) {
          product.photo = product.photo.map((photo) =>
            photo.replace(/\\/g, "/").replace("public/", "/")
          );
        }
      });

      res.render("checkout", {
        errors: "",
        user: req.session.user === undefined ? "" : req.session.user,
        cart: productlist,
        furniture,
      });
    }
  },
  order: async (req, res) => {
    const {
      user_id,
      firstname,
      lastname,
      email,
      address,
      address2,
      addressadd,
      city,
      phone,
      apartment,
      cart,
    } = req.body;
    console.log("order detail");
    const productlist = await Cart.findById({ _id: cart });
    const furniture = await Furniture.find();
    furniture.forEach((product) => {
      if (product.photo && product.photo.length > 0) {
        product.photo = product.photo.map((photo) =>
          photo.replace(/\\/g, "/").replace("public/", "/")
        );
      }
    });
    let errors = {};
    if (firstname.trim() === "") {
      errors.firstname = "You must enter your first name!";
    }

    if (lastname.trim() === "") {
      errors.lastname = "You must enter your last name!";
    }

    if (email.trim() === "") {
      errors.email = "You must enter your email!";
    }

    if (address.trim() === "") {
      errors.address = "You must enter your address!";
    }
    
    if (address2.trim() === "") {
      errors.address2 = "You must enter your address2!";
    }

    
    if (city.trim() === "") {
      errors.city = "You must enter your city!";
    }

    if (phone.trim() === "") {
      errors.phone = "You must enter your phone number!";
    }else if (!/^\d+$/.test(phone)) {
      errors.phone =  "Phone number must contain only numbers!";
    
    }
    else if (!/^\d{11}$/.test(phone)) {

      errors.phone = "Phone number must be 11 digits!";
    }
    

    
    if (Object.keys(errors).length > 0) {
       return res.render("checkout", {
        errors,
        user: req.session.user === undefined ? "" : req.session.user,
        cart: productlist,
        furniture,
      });
    }
   
    // Create an array to hold the item objects
    const items = [];
    // Iterate through the productlist array
    productlist.item.forEach((item) => {
      // Create an object for each item
      const newItem = {
        productId: item.productId,
        productName: item.productName,
        productPrice: item.productPrice,
        quantity: item.quantity || 0, // Default quantity to 0 if not provided
      };

      // Push the item object to the items array
      items.push(newItem);
    });

    // Create a new order document using the Order model
    const newOrder = new Order({
      UserId: user_id,
      item: items,
      address: address,
      address2: address2,
      additionaladd: addressadd || "",
      city: city,
      phone: phone,
      Apartment: apartment || "",
      totalPrice: productlist.totalPrice,
    });
    // Save the new order document to the database
    await newOrder.save();
    await Cart.findByIdAndUpdate(
      { _id: cart },
      { $set: { item: [], totalPrice: 0 } }
    );

    userviewproduct.sendConfirmpassMail(firstname, email, newOrder._id);
    console.log("sent email");

    if (newOrder) {
      console.log("Order saved:", newOrder);
      // Handle success and continue with your code

      res.redirect("/");
    }

  },

  sendConfirmpassMail: async (name, email, orderid) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "projectfrntr@gmail.com", // Sender Email
          pass: "szuzlstihutpziej",
        },
      });
      const emailMessage = `Hello ${name},

        Thank you for your order! We are pleased to confirm your order with the following details:
        
        Order ID: ${orderid}
        
        If you have any questions or need further assistance, please feel free to contact us. We will be happy to help.
        
        Best regards,
        Your Company`;
      const mailOptions = {
        from: "projectfrntr@gmail.com",
        to: email,
        subject: "Order Confirmation",
        text: emailMessage,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error("Error sending reset password email:", error);
        } else {
          console.log("Order Confrimtion email sent successfully!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default userviewproduct;
