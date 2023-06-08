import mongoose from 'mongoose';
import Furniture from "../models/furniture.js";
import User from "../models/user.js";

const orderSchema = new mongoose.Schema({
  UserId: String,

  item: [{
    productId: String,
    productName: String,
    productPrice: Number,
    quantity: {
      type: Number,
      default: 0
    },
  }],
  totalPrice: {
    type: Number,
    default: 0
  },

  address: {
    type: String,
    required: true,

  },
  address2: {
    type: String,
    required: true,

  },

  additionaladd: {
    type: String,
    required: false,
    default: "",
  },

  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  Apartment: {
    type: String,
    required: false,
    default: "",
  }
});
const Order = mongoose.model('Order', orderSchema);
export default Order;