
import Furniture from "../models/furniture.js";
import Cart from "../models/cart.js";


const cartController = {};

cartController.addToCart = async (req, res) => {
  //const { productId, productName, productPrice, productQuantity } = req.body;

  const productId = req.body.productId;
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const productQuantity = req.body.productQuantity;


  // Find the cart for the current user
  let cart = await Cart.find({ _id:req.session.user._id});

  if (cart.length>0) {
    console.log(cart);

    // If the cart already exists, find the item with the specified productId
    const item = cart.item.find(item => item.productId === productId);
    if (item) {
      // If the item already exists, update its quantity
      item.quantity += parseInt(productQuantity);
      let newQuantity=item.quantity;
      console.log(newQuantity);
      cart.updateOne(
        { _id: item.productId },
        {$set:{productQuantity: parseInt(item.quantity)}});
    } else {
      // If the item does not exist, add a new item to the cart
      cart.item.push({ productId, productName, productPrice, productQuantity: parseInt(productQuantity) });
      cart.update(
        { _id: userId },
        {$push: { item: productId, productName, productPrice, productQuantity: parseInt(productQuantity) }});
    }

    
  } else {
    // If the cart does not exist, create a new cart with the item
    const newCart = new Cart({ userId:req.session.user._id, item: [{ productId, productName, productPrice, quantity: parseInt(productQuantity) }] });
    cart = await newCart.save();
    console.log(cart)
  }

  res.redirect('/cart');
};


  // get cart items
  cartController.getCart = async (req, res) => {
    // Find the cart for the current user
    const cart = await Cart.findOne({ userId: req.session.userId });
    if (cart) {
      // If the cart exists, populate the items in the cart
      await cart.populate('items.productId').execPopulate();
    }
    res.render('cart', { cart });
  };



export default cartController;


