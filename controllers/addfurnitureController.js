import Furniture from "../models/furniture.js";
const furnitureController = {};

furnitureController.createFurniture = async (req, res) => {
    // Extract data from the request body
    const { productname, category, color, price, quantity, comments } = req.body;
  
    // Check if any required fields are empty
    if (!productname || !color || !price || !quantity) {
      return res.render("addproduct", { failMessage: "Please fill in all required fields" });
    }
  
    let imagePaths = [];
  
    // Check if files were uploaded
    if (req.files) {
      imagePaths = req.files.map((file) => file.path);
    }
  
    // Check if the product already exists
    const existingProduct = await Furniture.findOne({ productName: productname });
    if (existingProduct) {
      return res.render("addproduct", { failMessage: "Product already exists" });
    }
  
    // Create a new furniture object
    const newFurniture = new Furniture({
      productName: productname,
      category: category,
      color: color,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      comments: comments,
      photo: imagePaths,
    });
  
    // Save the new furniture item to the database
    console.log("New furniture item:", newFurniture)
    try {
      await newFurniture.save();
      return res.render("addproduct", {
        successMessage: "Successfully added an item",
      });
    } catch (error) {
      return res.render("addproduct", { failMessage: "Failed to add item" });
    }
  };
  
// ...
export default furnitureController;


