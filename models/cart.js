import mongoose from 'mongoose';
import Furniture from "../models/furniture.js";
import User from "../models/user.js";

const cartSchema = new mongoose.Schema({
    UserId: String,

    item:[{ productId: String,
    productName: String,
    productPrice: Number,
    quantity:{ 
      type: Number ,
      default: 0
     },
    stock:{
      type: Number,
      default: 0
    },
  } ],

     totalPrice:{
      type: Number,
      default: 0
     }
    
  });
const Cart = mongoose.model('Cart', cartSchema);
export default Cart;



//  const cartItemSchema = new mongoose.Schema({
//   productId: String,
//   productName: String,
//   productPrice: Number,
//   quantity: Number
// });

// const cartSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.userId,
//     ref: 'User',
//     required: true
//   },
//   items: [cartItemSchema]
// });

// //const Furniture = mongoose.model('Furniture', furnitureSchema);
// const CartItem = mongoose.model('CartItem', cartItemSchema);
// const Cart = mongoose.model('Cart', cartSchema);
// export default {Cart , CartItem};