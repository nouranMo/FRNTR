import Cart from "../models/cart.js";

const cartController = {};

cartController.addToCart = async (req, res) => {
  const { productId, productName, productPrice, productQuantity } = req.body;
  const userId = req.session.user._id;

  try {
    let cart = await Cart.findOne({ UserId: userId });
    console.log("Add to cart function", cart, "done here");

    if (cart) {
      console.log("Cart exists", cart, "done here");

      const item = cart.item.find((item) => item.productId === productId);
//testtttttt
      if (item) {
        const newQuantity = item.quantity + parseInt(productQuantity);
        console.log("new quantity", newQuantity, "done here");

        await Cart.updateOne(
          { "item.productId": productId },
          { $set: { "item.$.quantity": newQuantity } }
        );
      } else {
        cart.item.push({
          productId,
          productName,
          productPrice,
          quantity: parseInt(productQuantity),
        });

        await cart.save();
      }
    } else {
      const newCart = new Cart({
        UserId: userId,
        item: [{ productId, productName, productPrice, quantity: parseInt(productQuantity) }],
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