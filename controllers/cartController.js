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
    //found the cart for the user
    console.log("getting user:" , req.session.user._id);
    const cart = await Cart.findOne({ UserId: req.session.user._id });
    
    //res.json(cart);
    
   
    console.log("getting cart", cart, "done here");
  if(cart){
    console.log("cart exists", cart, "done here");
    if (cart.item && cart.item.length > 0) {
      const items = await Promise.all(cart.item.map(item => {
        return Furniture.findOne({ _id: item.productId });
      }));
      const products = items.map(item => {
        if (item.photo && item.photo.length > 0) {
          item.photo = item.photo.map((photo) =>
            photo.replace(/\\/g, "/").replace("public/", "/")
          );
        }
        return item;
      });
      res.render('cartPage', { cart , user: req.session.user===undefined?"":req.session.user , products: products});
    }}
  }
   catch (error) {
    console.error("An error occurred while retrieving the cart:", error);
    res.redirect('/error');
  }
};



cartController.removeFromCart = async (req, res) => {
  console.log("hello");
  const { productId } = req.body;
  const userId = req.session.user._id;
  console.log("Removing from cart", productId, "done here");

  try {
    let cart = await Cart.findOne({ UserId: userId });
    console.log(userId, cart, "done here");

    if (cart) {
      console.log("Cart exists", cart, "done here");

      const item = cart.item.find((item) => item.productId === productId);
      if (item) {
        const newQuantity = item.quantity - 1;
        const newStock = item.stock + 1;
        console.log("new quantity", newQuantity, "done here");
        console.log("new stock", newStock, "done here");

        // Remove the item from the cart if the quantity is zero
        if (newQuantity === 0) {
          await Cart.updateOne(
            { UserId: userId },
            { $pull: { item: { productId: productId } }, $inc: { totalPrice: -item.productPrice } }
          );
          console.log("removing item from cart", cart, "done here");
        } else {
          await Cart.updateOne(
            { "item.productId": productId },
            {
              $set: {
                "item.$.quantity": newQuantity,
                "item.$.stock": newStock,
              },
              $inc: { totalPrice: -item.productPrice },
            }
          );
          console.log("updating cart", cart, "done here");
        }

        await Furniture.updateOne({ _id: productId }, { $set: { "quantity": newStock } });
        console.log("updating furniture done here");
        res.redirect('/user/cartPage');
      } else {
        console.log("item does not exist in cart", item, "done here");
      }
    } else {
      console.log("Cart does not exist", cart, "done here");
    }

   ;
  } catch (error) {
    console.error("An error occurred while removing from cart:", error);
    res.redirect('/error');
  }
};


cartController.deleteItem = async (req, res) => {

  // try {
  //   const productId = req.params.id;
  //   const targetItem = await Cart.findOne({ productId });
  //   if (!targetItem) {
  //     return res.render("404", { message: "Product not found" });
  //   }
  //   else{
  //     await Cart.findOneAndUpdate(
  //       { UserId: req.session.user._id },
  //       { $pull: { item: { items: { productId }} } }, 
  //       { multi: false, new: true });
      
  //     res.redirect('/cart');
  //   }
  // } catch (error) {
  //   console.error("Error deleting item:", error);
  //   res.render("404", { message: "Failed to delete item" });
  // }


  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).render('404', { message: 'Cart not found' });
    }
    

const itemIndex = cart.item.findIndex(item => item.productId === productId);
if (itemIndex === -1) {
  return res.status(404).render('404', { message: 'Item not found' });
}

cart.item.splice(itemIndex, 1);
await cart.save();

res.redirect('/cart');
} catch (error) {
console.error('Error deleting item:', error);
res.status(500).render('500', { message: 'Failed to delete item' });

}
};
export default cartController;