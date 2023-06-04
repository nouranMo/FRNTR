import Furniture from "../models/furniture.js";
import fs from "fs";
import path from 'path';
const editfurnitureController = {};

editfurnitureController.editFurniture = async (req, res) => {
    // Extract data from the request body
    const { productname, category, color, price,offer, quantity, comments, measurements } = req.body;
    const uploadedImagePaths = JSON.parse(req.body.uploadedImagePaths);
    const id = req.body.id;
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
  
    if (!measurements || measurements.trim() === "") {
      errors.measurements = "Please enter the measurements name";
    }
  
    if (Object.keys(errors).length > 0) {
      // Return validation errors to the client
      return res.render("addeditproduct", { errors, product: "edit" });
    }
  
    try {

      const existingFurniture = await Furniture.findById(id);
  
      if (!existingFurniture) {
        // Handle case where furniture item is not found
        return res.render("addeditproduct", { errors: { general: "Furniture item not found" }, product: "edit" });
      }
  
      // Update the furniture item with the new data
      existingFurniture.productName = productname;
      existingFurniture.category = category;
      existingFurniture.color = color;
      existingFurniture.price = parseFloat(price);
      existingFurniture.quantity = parseInt(quantity);
      existingFurniture.comments = comments.trim();
      existingFurniture.photo = uploadedImagePaths;
      existingFurniture.size = measurements.trim();
      existingFurniture.offer = offer;
  
      // Save the updated furniture item to the database
      await existingFurniture.save();
      console.log("Updated furniture item:", existingFurniture);
      const products = await Furniture.find();
      return res.redirect("/product")
    } catch (error) {
      console.error("Error updating furniture item:", error);
      errors.general = "Failed to update item";
      return res.render("addeditproduct", { errors, product: "edit" });
    }
  };
  editfurnitureController.deleteproduct = async (req, res)=>{
    try {
      const productId = req.params.id;
      const targetItem = await Furniture.findById(productId);
      if (!targetItem) {
        return res.render("404", { message: "Product not found" });
      }
      else{
        for (const imagePath of targetItem.photo) {
          const imagePathWithoutPrefix = path.join("public", imagePath).replace(/^public\//, '');
          try {
            fs.unlinkSync(imagePath);
            console.log(`Deleted image: ${imagePathWithoutPrefix}`);
          } catch (error) {
            console.error(`Error deleting image ${imagePathWithoutPrefix}:`, error);
          }
        }
        await Furniture.findByIdAndDelete(productId);
        res.redirect('/product');
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      res.render("404", { message: "Failed to delete item" });
    }
  };

export default editfurnitureController;
