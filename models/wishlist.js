import mongoose from 'mongoose';
import Furniture from "../models/furniture.js";
import User from "../models/user.js";

const wishlistSchema = new mongoose.Schema({
    UserId: String,
    item:[{ productId: String,
    productName: String,
    productPrice: Number,
    productQuantity: Number
  } ],
    
  });
const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;