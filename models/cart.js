import mongoose from 'mongoose';
import Furniture from "../models/furniture.js";
import User from "../models/user.js";

const cartSchema = new mongoose.Schema({
    UserId: Number,
    productId: Number,
    productName: String,
    productPrice: Number,
    quantity: Number
  });
const Cart = mongoose.model('Cart', cartSchema);

export default Cart;