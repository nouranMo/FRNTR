import Furniture from "../models/furniture.js";
const furnitureController = {};

furnitureController.createFurniture = async (req, res) => {
    // Extract data from the request body
    const { productname, category, color, price, quantity, comments } = req.body;
  
    // Backend validation
    let errors = {};
  
    if (!productname || productname.trim() === "") {
      errors.productname = "Please enter the product name";
    }
  
    if (!color || color.trim() === "") {
      errors.color = "Please enter the available color";
    }
  
    if (!price) {
      errors.price = "Please enter the price";
    } else if (!/^\d+(\.\d{1,2})?$/.test(price)) {
      errors.price = "Price must be a number with maximum two decimal places";
    }
  
    if (!quantity) {
      errors.quantity = "Please enter the quantity";
    } else if (!/^\d+$/.test(quantity)) {
      errors.quantity = "Quantity must be a positive whole number";
    }
  
    if (Object.keys(errors).length > 0) {
      // Return validation errors to the client
      return res.render("addproduct", { errors });
    }
  
    let imagePaths = [];
  
    // Check if files were uploaded
    if (req.files) {
        const maxImageCount = 5;
      
        if (req.files.length > maxImageCount) {
          errors.photo = `Maximum ${maxImageCount} images allowed`;
          return res.render("addproduct", { errors });
        }
      
        imagePaths = req.files.map((file) => file.path);
      }      
  
    try {
      // Check if the product already exists
      const existingProduct = await Furniture.findOne({ productName: productname });
      if (existingProduct) {
        errors.productname = "Product already exists";
        return res.render("addproduct", { errors });
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
      await newFurniture.save();
      console.log("New furniture item:", newFurniture);
  
      return res.render("addproduct", { successMessage: "Successfully added an item" });
    } catch (error) {
      console.error("Error saving furniture item:", error);
      errors.general = "Failed to add item";
      return res.render("addproduct", { errors });
    }
  };
  
// ...
export default furnitureController;


