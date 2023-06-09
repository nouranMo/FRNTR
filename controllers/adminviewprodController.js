import Furniture from "../models/furniture.js";
import order from "../models/order.js";
import user from "../models/user.js";
console.log("Retrieved products from the database:");
const productsController = {
  viewAllProducts: async (req, res) => {
    try {
      console.log("Inside viewAllProducts");

      // Retrieve all products from the database
      let products = await Furniture.find();

      console.log("Retrieved products from the database:", products);

      products.forEach((product) => {
        if (product.photo && product.photo.length > 0) {
          product.imagePath = product.photo.map((photo) =>
            photo.replace(/\\/g, "/").replace("public/", "")
          );
        }
      });

      // Filter products by name if search query is provided
      const searchQuery = req.query.search;
      if (searchQuery) {
        products = products.filter((product) =>
          product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      const sortQuery = req.query.sort;
      if (sortQuery) {
        if (sortQuery === "atoz") {
          // Sort products alphabetically: A to Z
          products.sort((a, b) => a.productName.localeCompare(b.productName));
        } else if (sortQuery === "ztoa") {
          // Sort products alphabetically: Z to A
          products.sort((a, b) => b.productName.localeCompare(a.productName));
        } else if (sortQuery === "lowtohigh") {
          // Sort products by price: Low to High
          products.sort((a, b) => a.price - b.price);
        } else if (sortQuery === "hightolow") {
          // Sort products by price: High to Low
          products.sort((a, b) => b.price - a.price);
        } else if (sortQuery === "oldtonew") {
          // Sort products by date: Old to New
          products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }
        else if(sortQuery === "newtoold")
          {
            // Sort products by date: New to Old
            products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          }
      }
      
      // Calculate pagination variables
      const currentPage = parseInt(req.query.page) || 1; // Current page number
      const itemsPerPage = 10; // Number of products to display per page
      const totalItems = products.length; // Total number of products
      const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages

      // Get the products for the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentProducts = products.slice(startIndex, endIndex);

      res.render("products", {
        user: req.session.user === undefined ? "" : req.session.user,
        products: currentProducts,
        currentPage,
        totalPages,
        searchQuery,
      });
    } catch (error) {
      // Handle error if retrieval fails
      console.error("Error retrieving products:", error);
      res.render("404", {
        message: "Failed to retrieve products",
        user: req.session.user === undefined ? "" : req.session.user,
      });
    }
  },
  viewAllCategoryProducts: async (req, res) => {
    try {
      console.log("Inside viewAllProducts");

      // Retrieve all products from the database
      let products = await Furniture.find();

      console.log("Retrieved products from the database:", products);

      products.forEach((product) => {
        if (product.photo && product.photo.length > 0) {
          product.imagePath = product.photo.map((photo) =>
            photo.replace(/\\/g, "/").replace("public/", "")
          );
        }
      });

      // Filter products by name if search query is provided
      const searchQuery = req.query.search;
      if (searchQuery) {
        products = products.filter((product) =>
          product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      const categoryQuery = req.query.category;
      if(categoryQuery){
        if(categoryQuery!="allcategories" && categoryQuery!="")
        {
        products = products.filter((product) =>
          product.category.toLowerCase().includes(categoryQuery.toLowerCase())
          
        );
        }
      }
      const sortQuery = req.query.sort;
      if (sortQuery) {
        if (sortQuery === "atoz") {
          // Sort products alphabetically: A to Z
          products.sort((a, b) => a.productName.localeCompare(b.productName));
        } else if (sortQuery === "ztoa") {
          // Sort products alphabetically: Z to A
          products.sort((a, b) => b.productName.localeCompare(a.productName));
        } else if (sortQuery === "lowtohigh") {
          // Sort products by price: Low to High
          products.sort((a, b) => a.price - b.price);
        } else if (sortQuery === "hightolow") {
          // Sort products by price: High to Low
          products.sort((a, b) => b.price - a.price);
        } else if (sortQuery === "oldtonew") {
          // Sort products by date: Old to New
          products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }
          else if(sortQuery === "newtoold")
          {
            // Sort products by date: New to Old
            products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          }
        
      }
      const min = req.query.min;
      const max = req.query.max;
      if(min && max){
        products = products.filter((product) =>
          product.price >= min && product.price <= max
        );
      }

      // Calculate pagination variables
      const currentPage = parseInt(req.query.page) || 1; // Current page number
      const itemsPerPage = 10; // Number of products to display per page
      const totalItems = products.length; // Total number of products
      const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages

      // Get the products for the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentProducts = products.slice(startIndex, endIndex);

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
        user: req.session.user === undefined ? "" : req.session.user,
        product: currentProducts,
        lowestPrice,
        highestPrice,
        currentPage,
        totalPages,
        category:categoryQuery,
        searchQuery,
        categoryQuery,
        sortQuery,
      });
    } catch (error) {
      // Handle error if retrieval fails
      console.error("Error retrieving products:", error);
      res.render("404", {
        message: "Failed to retrieve products",
        user: req.session.user === undefined ? "" : req.session.user,
      });
    }
  },

  LowInStock: async (req, res) => {
    try {
      console.log("Inside LowInStock");
  
      const lowStock = await Furniture.find({ quantity: { $lt: 10 } });
  
      console.log("Retrieved low stock products from the database:", lowStock);
  
      lowStock.forEach((product) => {
        if (product.photo && product.photo.length > 0) {
          product.imagePath = product.photo.map((photo) =>
            photo.replace(/\\/g, "/").replace("public/", "")
          );
          console.log(product.photo);
        }
      });
     
      // Retrieve 5 most sold items with offers
      const topSoldItemsWithOffers = await Furniture.find({
        sold: { $exists: true, $ne: null, $ne: 0 },
        offer: { $exists: true, $ne: null,$ne: 0 },
      }) 
      .sort({ sold: -1 })
      .limit(5);

      console.log("Retrieved top sold items with offers:", topSoldItemsWithOffers);
  
      // Retrieve 5 most sold items in general
      const topSoldItems = await Furniture.find({
        sold: { $exists: true, $ne: null, $ne: 0 },
      })
        .sort({ sold: -1 })
        .limit(5);
  
      console.log("Retrieved top sold items:", topSoldItems);
      // Retrieve the number of all users
    const totalUsers = await user.countDocuments();

    // Retrieve the number of all products
    const totalProducts = await Furniture.countDocuments();

    // Retrieve the number of total orders
    const totalOrders = await Furniture.countDocuments({ sold: { $exists: true, $ne: null, $ne: 0 } });


   topSoldItemsWithOffers.forEach((product) => {
        if (product.photo && product.photo.length > 0) {
          product.imagePath = product.photo.map((photo) =>
            photo.replace(/\\/g, "/").replace("public/", "../")
          );
        }
      });
      topSoldItems.forEach((product) => {
        if (product.photo && product.photo.length > 0) {
          product.imagePath = product.photo.map((photo) =>
            photo.replace(/\\/g, "/").replace("public/", "../")
          );
        }
      });
      if (lowStock.length === 0) {
        // If no low stock items, render the page without passing lowStock or imagePath
        res.render("dashboard", { 
        lowStock,
        topSoldItemsWithOffers,
        topSoldItems,
        totalUsers,
        totalProducts,
        totalOrders, });
      } else {
        // If there are low stock items, render the page with lowStock, imagePath, topSoldItemsWithOffers, and topSoldItems
        res.render("dashboard", {
          lowStock,
          imagePath: lowStock[0].imagePath,
          topSoldItemsWithOffers,
        topSoldItems,
        totalUsers,
        totalProducts,
        totalOrders,
        });
      }
    } catch (error) {
      console.error("Error retrieving low stock products:", error);
      res.render("404", {
        message: "Failed to retrieve low stock products",
        user: req.session.user === undefined ? "" : req.session.user,
      });
    }
  },  
  revtoadmin:async(req,res)=>{
    try{
      console.log("inside reviews to admin");
      const revadmin = await Furniture.find({ review: { $exists: true, $ne: [] } });
      console.log("revadmin before modification:");
      if (revadmin && revadmin.length > 0) {
        revadmin.forEach((product) => {
          if (product.photo && product.photo.length > 0) {
            product.photo = product.photo.map((photo) =>
              photo.replace(/\\/g, "/").replace("public/", "/")
            );
          }
        });
        
      }

      //console.log("Retrieved products with reviews from the database:", revadmin);
        res.render("reviews", { revadmin});
     
    }
    catch (error) {
      console.error("Error retrieving review products:", error);
      res.render("404", {
        message: "Failed to retrieve reviewd products",
        user: req.session.user === undefined ? "" : req.session.user,
      });
    }
  },

  Offers: async (req, res) => {
    try {
      console.log("Inside offers");

      // Retrieve products with quantities less than 10 from the database
      const offers = await Furniture.find({
        offer: { $exists: true, $ne: null , $ne: 0},
      });

      console.log("Retrieved products with offers from the database:", offers);

      offers.forEach((product) => {
        if (product.photo && product.photo.length > 0) {
          product.imagePath = product.photo.map((photo) =>
            photo.replace(/\\/g, "/").replace("public/", "../")
          );
          console.log("offer", product.photo);
        }
      });
      if (offers.length === 0) {
        res.render("offers", { offers });
      } else {
        res.render("offers", { offers, imagePath: offers[0].imagePath });
      }
    } catch (error) {
      // Handle error if retrieval fails
      console.error("Error retrieving products with offers:", error);
      res.status(500).render("404", {
        message: "Failed to retrieve products with offers",
        user: req.session.user === undefined ? "" : req.session.user,
      });
    }
  },
  LargestOffers: async (req, res) => {
    try {
      console.log("Inside Largest Offer");
  
      // Retrieve product with the largest offer from the database
      const largestOfferProduct = await Furniture.findOne({
        offer: { $exists: true, $ne: null, $ne: 0 },
      })
        .sort({ offer: -1 })
        .limit(1);
        
      if (largestOfferProduct) {
        const offer = largestOfferProduct.offer;
        console.log("Retrieved product with the largest offer from the database:", largestOfferProduct);
        res.send(offer.toString()); // Convert offer to string before sending the response
      } else {
        console.log("No product found with the largest offer");
        res.send('0'); // Send '0' if no product with offer is found
      }
    } catch (error) {
      // Handle error if retrieval fails
      console.error("Error retrieving product with the largest offer:", error);
      res.status(500).render("404", {
        message: "Failed to retrieve product with the largest offer",
        user: req.session.user === undefined ? "" : req.session.user,
      });
    }
  },
  Sold: async (req, res) => {
    try {
      console.log("Inside orders");
      // Retrieve products with quantities less than 10 from the database
      const sold = await order.find();
      const users = await user.find();
      // const sold = await order.aggregate([
      //   {
      //     $lookup: {
      //       from: 'user',
      //       localField: 'UserId',
      //       foreignField: '_id',
      //       as: 'customer_info'
      //     }
      //   }
      // ]).exec();
  
      console.log("Retrieved products that were sold from the database:", sold);
      console.log("Retrieved users in sold func from the database:", users);
      sold.forEach((product) => {
        if (product.photo && product.photo.length > 0) {
          product.imagePath = product.photo.map((photo) =>
            photo.replace(/\\/g, "/").replace("public/", "../")
          );
          console.log("orders", product.photo);
        }
      });
  
      if (sold.length === 0) {
        res.render("orders", { sold,users });
      } else {
        res.render("orders", { sold, imagePath: sold[0].imagePath,users });
      }
    } catch (error) {
      // Handle error if retrieval fails
      console.error("Error retrieving products sold:", error);
      res.status(500).render("404", {
        message: "Failed to retrieve products sold",
        user: req.session.user === undefined ? "" : req.session.user,
      });
    }
  },   
  SoldStatistics: async (req, res) => {
    try {
      console.log("Inside SoldStatistics function");
  
      // Retrieve 10 top sold products from the database
      const topSoldProducts = await Furniture.find({
        sold: { $exists: true, $ne: null, $ne: 0 },
      })
        .sort({ sold: -1 })
        .limit(10);
  
      console.log("Retrieved top sold products from the database:", topSoldProducts);
  
      // Retrieve 10 worst sold products from the database
      const worstSoldProducts = await Furniture.find({
        sold: { $exists: true, $ne: null },
      })
        .sort({ sold: 1 })
        .limit(10);
  
      console.log("Retrieved worst sold products from the database:", worstSoldProducts);
  
      topSoldProducts.forEach((product) => {
        if (product.photo && product.photo.length > 0) {
          product.imagePath = product.photo.map((photo) =>
            photo.replace(/\\/g, "/").replace("public/", "../")
          );
          console.log("offer", product.photo);
        }
      });
  
      worstSoldProducts.forEach((product) => {
        if (product.photo && product.photo.length > 0) {
          product.imagePath = product.photo.map((photo) =>
            photo.replace(/\\/g, "/").replace("public/", "../")
          );
          console.log("offer", product.photo);
        }
      });
  
      res.render("statistics", {
        topSoldProducts: topSoldProducts,
        worstSoldProducts: worstSoldProducts,
      });
    } catch (error) {
      // Handle error if retrieval fails
      console.error("Error retrieving sold products:", error);
      res.status(500).render("404", {
        message: "Failed to retrieve sold products",
        user: req.session.user === undefined ? "" : req.session.user,
      });
    }
  },
  
  
  viewAllUsers: async (req, res) => {
    try {
      console.log("Inside viewAllUsers");

      // Retrieve all users from the database
      let users = await user.find();

      console.log("Retrieved users from the database:", users);

      // Filter users by email if search query is provided
      const searchQuery = req.query.search;
      if (searchQuery) {
        users = users.filter((user) =>
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Calculate pagination variables
      const currentPage = parseInt(req.query.page) || 1; // Current page number
      const itemsPerPage = 10; // Number of users to display per page
      const totalItems = users.length; // Total number of users
      const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages

      // Get the users for the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentUsers = users.slice(startIndex, endIndex);

      res.render("customers", {
        Users: currentUsers,
        currentPage,
        totalPages,
        search: searchQuery || "",
      });
    } catch (error) {
      // Handle error if retrieval fails
      console.error("Error retrieving users:", error);
      res.render("404", { message: "Failed to retrieve users" });
    }
  },

  beAdmin: async (req, res) => {
    try {
      const userId = req.params.id;
      const targetUser = await user.findById(userId);
      if (!targetUser) {
        return res.render("404", { message: "User not found" });
      }
      if (targetUser.userType === "admin") {
        return res.render("404", { message: "User is already an admin" });
      }
      console.log(req.params.id);
      await user.findByIdAndUpdate(req.params.id, { userType: "admin" });
      res.redirect("/admin/customers");
    } catch (error) {
      console.error("Error changing the user:", error);
      res.render("404", { message: "Failed to change the user" });
    }
  },
  beClient: async (req, res) => {
    try {
      //add verifcation that the one changing from clien to admina nd vice versa is an admin
      const userId = req.params.id;
      const targetUser = await user.findById(userId);

      if (!targetUser) {
        return res.render("404", { message: "User not found" });
      }

      if (targetUser.userType === "client") {
        return res.render("404", { message: "User is already a client" });
      }
      console.log(req.params.id);
      await user.findByIdAndUpdate(req.params.id, { userType: "client" });
      res.redirect("/admin/customers");
    } catch (error) {
      console.error("Error changing the user:", error);
      res.render("404", { message: "Failed to change the user" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userID = req.params.id;
      console.log(userID);
      const targetUser = await user.findById(userID);
      if (!targetUser) {
        return res.render("404", { message: "User not found" });
      } else {
        await user.findByIdAndDelete(userID);
        res.redirect("/admin/customers");
      }
    } catch (error) {
      console.error("Error deleting the user: ", error);
      res.render("404", { message: "Failed to change the user" });
    }
  },
  editUser: async (req, res) => {
    console.log("initiated user edit in backend");

    try {
      const { id, firstName, lastName, email, address, address2 } = req.body;
      console.log(req.body);
      // Use the extracted values to update the user in your database
      const updatedUser = await user.findByIdAndUpdate(id, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        address2: address2,
      });
      console.log("updated user", updatedUser);
      // Once the user is updated successfully, you can send a response indicating success
      res.redirect("/admin/customers");
    } catch (error) {
      // If an error occurs during the update process, you can send an error response
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  },
  approverev: async (req, res) => {
    try {
      console.log("inside the function");
      const reviewIndex = parseInt(req.params.index);
      const productId = req.params.id;
  
      console.log(reviewIndex);
  
      const product = await Furniture.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      console.log("reviewIndex:", reviewIndex);
      console.log("product.review.length:", product.review.length);
  
      if (reviewIndex >= 0 && reviewIndex < product.review.length) {
        const review = product.review[reviewIndex]; // Get the review at the specified index
        // product.review.splice(reviewIndex, 1); // Remove the review from the original array
        product.approved.push(review); // Add the review to the 'approved' array
        await product.save();
        return res.redirect('/admin/reviews');
      } else {
        return res.status(404).json({ message: 'Review not found' });
      }
    } catch (error) {
      console.log("error not in function of accept review");
      console.error("Error adding the review to the 'approved' array: ", error);
      //res.render("404", { message: "Failed to add the review to the 'approved' array" ,user:req.session.user===undefined?"":req.session.user});
    }
  },
  

  deleterev: async(req,res)=>{
    
  try {
    const reviewIndex = parseInt(req.params.index);
    const productId = req.params.id;
    
    console.log(reviewIndex);
     
        const product = await Furniture.findById(productId);
        
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        console.log("reviewIndex:", reviewIndex);
        console.log("product.review.length:", product.review.length);
        
        if (reviewIndex >= 0 && reviewIndex < product.review.length) {
          product.review.splice(reviewIndex, 1); // Remove the review at the specified index
          await product.save();
          return res.redirect('/admin/reviews')
        } else {
          return res.status(404).json({ message: 'Review not found' });
        }
     
    
    
  } catch (error) {
    console.error("Error deleting the review: ", error);
    res.render("404", { message: "Failed to delete the review" });
  }
}
};



export default productsController;
