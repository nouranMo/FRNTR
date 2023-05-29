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
  
        // Render the "products" view and pass the products data
        res.render("products", {  products, imagePath: products[0].imagePath  });
      } 
      catch (error) {
        // Handle error if retrieval fails
        console.error("Error retrieving products:", error);
        res.render("error", { message: "Failed to retrieve products" });
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
        res.render("error", { message: "Failed to retrieve products" });
      }
    },
    beAdmin: async(req,res)=>{
      try {
        console.log(req.params.id);
        await user.findByIdAndUpdate(req.params.id, { userType: 'admin' });
        res.redirect('/admin/customers');
      } catch (error) {
        console.error("Error changing the user:", error);
        res.render("error", { message: "Failed to change the user" });
      }
      
    },
    beClient: async(req,res)=>{
      user.findByIdAndUpdate(req.params.id,{userType: 'client'})
      try {
        console.log(req.params.id);
        await user.findByIdAndUpdate(req.params.id, { userType: 'client' });
        res.redirect('/admin/customers');
      } catch (error) {
        console.error("Error changing the user:", error);
        res.render("error", { message: "Failed to change the user" });
      }
    
  },
  };
  
  export default productsController;