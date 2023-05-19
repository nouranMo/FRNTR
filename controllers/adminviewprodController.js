import Furniture from "../models/furniture.js";
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
  };
  
  export default productsController;