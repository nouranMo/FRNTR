import Furniture from "../models/furniture.js";
const productsController = {
    viewAllProducts: async (req, res) => {
      try {
        // Retrieve all products from the database
        const products = await Furniture.find();
        
        // Render the "products" view and pass the products data
        res.render("products", { products });
      } catch (error) {
        // Handle error if retrieval fails
        console.error("Error retrieving products:", error);
        res.render("error", { message: "Failed to retrieve products" });
      }
    },
  };
  
  export default productsController;