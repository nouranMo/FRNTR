import mongoose from 'mongoose';
import Furniture from "../models/furniture.js";
import User from "../models/user.js";

const wishlistSchema = new mongoose.Schema({
    UserId: String,
    item:[{ productId: String,
    productName: String,
    productPrice:{ 
      type: Number ,
      default: 0
     },
    productQuantity:{
      type: Number,
      default: 0
    },
  } ],
    
  });
const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;