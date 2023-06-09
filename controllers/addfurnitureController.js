import Furniture from "../models/furniture.js";
import User  from "../models/user.js";
const furnitureController = {};

furnitureController.createFurniture = async (req, res) => {
  // Extract data from the request body
  const {
    productname,
    category,
    color,
    price,
    quantity,
    comments,
    measurements,
  } = req.body;

  const uploadedImagePaths = JSON.parse(req.body.uploadedImagePaths);

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
    return res.render("addeditproduct", { errors, product: "add" });
  }

  try {
    // Check if the product already exists
    const existingProduct = await Furniture.findOne({
      productName: productname,
    });
    if (existingProduct) {
      errors.productname = "Product already exists";
      return res.render("addeditproduct", { errors, product: "add" });
    }

    // Create a new furniture object
    const newFurniture = new Furniture({
      productName: productname,
      category: category,
      color: color,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      comments: comments,
      photo: uploadedImagePaths,
      size: measurements,
      sold: 0,
      offer: 0,
    
    });

    // Save the new furniture item to the database
    await newFurniture.save();
    console.log("New furniture item:", newFurniture);

    return res.redirect("/adminproduct/product");
  } catch (error) {
    console.error("Error saving furniture item:", error);
    errors.general = "Failed to add item";
    res.render("addeditproduct", { errors, product: "add" });
  }
};

furnitureController.uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file received" });
  }

  // File was successfully uploaded
  return res.status(200).json({ message: "File uploaded successfully" });
};

furnitureController.getreview = async (req, res) => {
  console.log("in function");
  const {id, review,category}=req.body;
const furniture = await Furniture.findById({_id:id});
 if(furniture){
    console.log("updated review");
    furniture.review.push(review);
    const updatedFurniture = await furniture.save();    
    console.log(updatedFurniture);
      console.log("after redirect ?");
  }
  const reviewuser=await User.findById({_id:req.session.user._id});
  if(reviewuser){
    console.log("updated review in user");
    reviewuser.review.push(review);
    const updatedUsereview = await reviewuser.save();    
    console.log(updatedUsereview);
  }
  else{
    console.log("errrroorr")
  }
  res.redirect("/product/itempage?id="+id+"&category="+category);
  };


// ...
export default furnitureController;
