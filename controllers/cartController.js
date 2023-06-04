import Cart from "../models/cart.js";
import Furniture from "../models/furniture.js";

const cartController = {};

cartController.addToCart = async (req, res) => {
  const { productId, productName, productPrice , quantity,stock } = req.body;
  console.log(productId, productName, productPrice,quantity, stock,"done");
  const userId = req.session.user._id;
  const furniture = await Furniture.findOne({ _id: productId });
  



  try {
    let cart = await Cart.findOne({ UserId: userId });
    console.log(userId, cart, "done here");
    console.log("Add to cart function", cart, "done here");

    if (cart) {
      console.log("Cart exists", cart, "done here");

      const item = cart.item.find((item) => item.productId === productId);
      const availableStock = furniture.quantity - (item ? item.quantity : 0);
      if (availableStock < 1) {
        console.log("Item is out of stock");
        res.redirect('/error');
        return;
          }

      if (item) {
        const newQuantity = item.quantity + 1;
        const newStock = item.stock - 1;
      //need to check if the stock is greater than the quantity
      if(newStock < 0){
        console.log("can't add item is out of stock", newStock);
        res.redirect('/error');
      }
        

        console.log("new quantity", newQuantity, "done here");
        console.log("new stock", newStock, "done here");


        await Cart.updateOne(
          { "item.productId": productId },
          { $set: {
            "item.$.quantity": newQuantity,
            "item.$.stock": newStock,},
            $inc: { totalPrice: productPrice}
          } );
          console.log("updating cart", cart, "done here");

          await Furniture.updateOne({ _id: productId }, 
            { $set: { "quantity": newStock } });
          console.log("updating furniture", furniture, "done here");

      } else {
        console.log("item does not exist", item, "done here");
        const newQuantity = parseInt(quantity)+1;
        const newStock = parseInt(stock) - 1;
        cart.item.push({
          productId,
          productName,
          productPrice,
          quantity: parseInt(newQuantity),
          stock: parseInt(newStock)
        });

        furniture.quantity--;
        await Furniture.updateOne({ _id: productId }, { $set: { "quantity": furniture.quantity } });

        //need to update cart with the new item
        await Cart.updateOne(
          { UserId: userId},
          { $push: {
            item: {
              productId,
              productName,
              productPrice,
              quantity: parseInt(newQuantity),
              stock: parseInt(newStock)
            }
          },
          $inc: { totalPrice: productPrice }}
        );
        console.log("updating cart with new item in user", userId, "done here");
          console.log("updating cart with new item", cart, "done here");
        
      }
    } else {
      console.log("Cart does not exist", cart, "done here");
      furniture.quantity--;
      await Furniture.updateOne({ _id: productId }, { $set: { "quantity": furniture.quantity } });
      const newCart = new Cart({
        UserId: userId,
        item: [{ productId, productName, productPrice, quantity:1 , stock:furniture.quantity }],
         totalPrice: productPrice
      });
      
      await newCart.save();
      console.log("saving new cart", newCart, "done here");
      
    }

    res.redirect('/cart');
  } catch (error) {
    console.error("An error occurred while adding to cart:", error);
    res.redirect('/error');
  }
};

cartController.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ UserId: req.session.user._id }).populate('item.productId');
    res.render('cart', { cart });
  } catch (error) {
    console.error("An error occurred while retrieving the cart:", error);
    res.redirect('/error');
  }
};

export default cartController;