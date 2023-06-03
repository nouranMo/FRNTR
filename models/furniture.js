import mongoose from 'mongoose';

const furnitureSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['armchair', 'beds', 'benches','sofas', 'beanbags', 'chaise lounges', 'living room set', 'kids furniture', 'pets furniture', 'space friendly','outdoors'],
    required: true
  },
  color: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 1
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  comments: {
    type: String,
    required: false
  },
  sold:{
    type:Number,
    required:true,
    default:0
  },
  offer:{
    type: Number,
    required: true,
    default:0
  },
  size:{
    type:String,
    required:true,
  },
  review:{
    type:String,
    required:false,
  },
  photo: {
    type: [String], // Array of strings
    required: true
  }
});

const Furniture = mongoose.model('Furniture', furnitureSchema);

export default Furniture;
