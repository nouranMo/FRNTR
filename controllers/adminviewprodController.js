import Furniture from "../models/furniture.js";
import user from "../models/user.js";
console.log("Retrieved products from the database:");
const productsController = {

    viewAllProducts: async (req, res) => {
      try {
        console.log("Inside viewAllProducts");

        // Retrieve all products from the database
        const products = await Furniture.find();

        console.log("Retrieved products from the database:", products);

        products.forEach((product) => {
          if (product.photo && product.photo.length > 0) {
            product.imagePath = product.photo.map((photo)=>photo.replace(/\\/g, '/').replace('public/',''));
          }
        });
        if (products.length === 0) {
          // If no low stock items, render the page without passing lowStock or imagePath
          res.render("products",{products});
        } else {
          // If there are low stock items, render the page with lowStock and imagePath
          res.render("products", {  products, imagePath: products[0].imagePath  });
    
        }
        // Render the "products" view and pass the products data
         } 
      catch (error) {
        // Handle error if retrieval fails
        console.error("Error retrieving products:", error);
        res.render("404", { message: "Failed to retrieve products" ,user:req.session.user===undefined?"":req.session.user});
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
    
        if (lowStock.length === 0) {
          // If no low stock items, render the page without passing lowStock or imagePath
          res.render("dashboard",{lowStock});
        } else {
          // If there are low stock items, render the page with lowStock and imagePath
          res.render("dashboard", {
            lowStock, 
            imagePath: lowStock[0].imagePath,
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
    
    Offers: async (req, res) => {
      try {
        console.log("Inside offers");
    
        // Retrieve products with quantities less than 10 from the database
        const offers = await Furniture.find({ offer: { $exists: true, $ne: null, $gt: 0 } });
    
        console.log("Retrieved products with offers from the database:", offers);
    
        offers.forEach((product) => {
          if (product.photo && product.photo.length > 0) {
            product.imagePath = product.photo.map((photo) =>
              photo.replace(/\\/g, "/").replace("public/", "../")
            );
            console.log( "offer", product.photo);
          }
        });
        if(offers.length===0)
        {
          res.render("offers",{offers});
        }
        else{
          res.render("offers", {  offers , imagePath: offers[0].imagePath});
     
        }
        } catch (error) {
        // Handle error if retrieval fails
        console.error("Error retrieving products with offers:", error);
        res.status(500).render("404", { message: "Failed to retrieve products with offers",user:req.session.user===undefined?"":req.session.user});
 
      }
    },
    viewAllUsers: async(req,res)=>{
      try{
        console.log(" inside viewAllUsers");
        const Users = await user.find();
        console.log("Retrived User from database: ", Users);
    
        res.render('customers',{Users});

      }
      catch (error) {
        // Handle error if retrieval fails
        console.error("Error retrieving products:", error);
        res.render("404", { message: "Failed to retrieve products" });
      }
    },
    beAdmin: async(req,res)=>{
      try {
        const userId = req.params.id;
        const targetUser = await user.findById(userId);
        if (!targetUser) {
          return res.render("404", { message: "User not found" });
        }
        if (targetUser.userType === 'admin') {
          return res.render("404", { message: "User is already an admin" });
        }
        console.log(req.params.id);
        await user.findByIdAndUpdate(req.params.id, { userType: 'admin' });
        res.redirect('/admin/customers');
      } catch (error) {
        console.error("Error changing the user:", error);
        res.render("404", { message: "Failed to change the user" });
      }
      
    },
    beClient: async(req,res)=>{
      try {
        //add verifcation that the one changing from clien to admina nd vice versa is an admin
        const userId = req.params.id;
        const targetUser = await user.findById(userId);
    
    if (!targetUser) {
      return res.render("404", { message: "User not found" });
    }
    
    if (targetUser.userType === 'client') {
      return res.render("404", { message: "User is already a client" });
    }
        console.log(req.params.id);
        await user.findByIdAndUpdate(req.params.id, { userType: 'client' });
        res.redirect('/admin/customers');
      } catch (error) {
        console.error("Error changing the user:", error);
        res.render("404", { message: "Failed to change the user" });
      }
    
  },
  deleteUser: async(req,res)=>{
    try{
      const userID = req.params.id;
      console.log(userID);
      const targetUser = await user.findById(userID);
    if (!targetUser) {
      return res.render("404", { message: "User not found" });
    }
    else{
      await user.findByIdAndDelete(userID);
      res.redirect('/admin/customers');
    }
  }
  catch(error)
  {
    console.error("Error deleting the user: ", error);
    res.render("404",{message:"Failed to change the user"});
  }
  },
  editUser: async (req, res) => {

    console.log("the user id is: " + userID);
    console.log("initiated user edit in backend");
    
    try {
      const { id, firstName, lastName, email, address, address2 } = req.body;
      // Use the extracted values to update the user in your database
      const updatedUser = await user.findByIdAndUpdate(id, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        address2: address2,
      });
  
      // Once the user is updated successfully, you can send a response indicating success
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      // If an error occurs during the update process, you can send an error response
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  },
  
  };
  
  export default productsController;