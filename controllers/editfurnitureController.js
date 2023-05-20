import Furniture from "../models/furniture.js";
const editfurnitureController = {};

editfurnitureController.editFurniture = async (req, res) => {
    // Extract data from the request body
    const { upproductname, upProductID, category, colorpicker, price, quantity,comments } = req.body;
  console.log(req.body);
    // Backend validation
    let errors = {};

  
    if (!upProductID || upProductID.trim() === "") {
      errors.upProductID = "Please enter the product ID";
    }
  
    if (!upproductname || upproductname.trim() === "") {
      errors.upproductname = "Please enter the product name";
    }
  
    if (!colorpicker || colorpicker.trim() === "") {
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
      const product = await Furniture.findById(upProductID);
      return res.render("productedit", { errors, product });
    }
  
    let imagePaths = [];
  
    // Check if files were uploaded
    if (req.files) {
      const maxImageCount = 5;
  
      if (req.files.length > maxImageCount) {
        errors.photo = `Maximum ${maxImageCount} images allowed`;
        const product = await Furniture.findById(upProductID);
        return res.render("productedit", { errors, product });
      }
  
      imagePaths = req.files.map((file) => file.path);
    }
  
    try {
      // Find the existing product by ID and update it
      const result = await Furniture.updateOne(
        { _id: upProductID },
        {
          productName: upproductname,
          category,
          color:colorpicker,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          photo: imagePaths, // Replace the existing photo array with the new images
          comments,
        }
      );
  
      if (result.nModified === 0) {
        // No product was modified (product ID not found)
        errors.upProductID = "Product ID not found";
        const product = await Furniture.findById(upProductID);
        return res.render("productedit", { errors, product });
      }
  
      // Fetch the updated product
      const updatedProduct = await Furniture.findById(upProductID);
  
      return res.render("productedit", { successMessage: "Successfully updated the item",errors, product: updatedProduct });
    } catch (error) {
      console.error("Error updating furniture item:", error);
      errors.general = "Failed to update item";
      const product = await Furniture.findById(upProductID);
      return res.render("productedit", { errors, product });
    }
  };
  

export default editfurnitureController;
