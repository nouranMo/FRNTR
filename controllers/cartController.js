import Cart from "../models/cart.js";
import Furniture from "../models/furniture.js";

const cartController = {};

cartController.addToCart = async (req, res) => {
  const { productId, productName, productPrice, quantity, stock, value } =
    req.body;
  console.log(productId, productName, productPrice, quantity, stock, "done");
  const userId = req.session.user._id;
  const furniture = await Furniture.findOne({ _id: productId });

  try {
    let cart = await Cart.findOne({ UserId: userId });
    console.log(userId, cart, "done here");
    console.log("Add to cart function", cart, "done here");

    if (cart) {
      console.log("Cart exists", cart, "done here");

      const item = cart.item.find((item) => item.productId === productId);
      const availableStock = furniture.quantity;

      if (parseInt(value) > availableStock) {
        console.log("Insufficient quantity in stock");
        res.redirect("/error");
        return;
      }

      if (item) {
        const newQuantity = item.quantity + parseInt(value);
        const newStock = furniture.quantity - parseInt(value);
        const newSold = furniture.sold + parseInt(value);
        console.log("new quantity", newQuantity, "done here");
        console.log("new stock", newStock, "done here");

        if (furniture.offer && furniture.offer) {
          const offerValue = furniture.offer;
          const totalPrice = productPrice * parseInt(value);

          // Apply the offer calculation
          const discountedPrice = totalPrice - (totalPrice * offerValue) / 100;

          await Cart.updateOne(
            { "item.productId": productId },
            {
              $set: {
                "item.$.quantity": newQuantity,
                "item.$.stock": newStock,
              },
              $inc: { totalPrice: discountedPrice },
            }
          );
        } else {
          // No offer, use the original price for the calculation
          await Cart.updateOne(
            { "item.productId": productId },
            {
              $set: {
                "item.$.quantity": newQuantity,
                "item.$.stock": newStock,
              },
              $inc: { totalPrice: productPrice * parseInt(value) },
            }
          );
        }
        console.log("updating cart", cart, "done here");

        await Furniture.updateOne(
          { _id: productId },
          { $set: { quantity: newStock,
               sold: newSold } }
        );
        console.log("updating furniture", furniture, "done here");
      } else {
        console.log("Item does not exist", item, "done here");
        const newQuantity = parseInt(value);
        const newStock = furniture.quantity - parseInt(value);
        const newSold = furniture.sold + parseInt(value);
        if (newStock < 0) {
          console.log("Cannot add item. Insufficient stock");
          res.redirect("/error");
          return;
        }

        let totalPrice;
        if (furniture.offer && furniture.offer) {
          const offerValue = furniture.offer;
          totalPrice = productPrice * parseInt(value);

          // Apply the offer calculation
          totalPrice = totalPrice - (totalPrice * offerValue) / 100;
        } else {
          // No offer, use the original price for the calculation
          totalPrice = productPrice * parseInt(value);
        }

        cart.item.push({
          productId,
          productName,
          productPrice,
          quantity: parseInt(newQuantity),
          stock: parseInt(newStock),
        });

        await Furniture.updateOne(
          { _id: productId },
          { $set: { quantity: newStock,
            sold: newSold} }
        );

        // Need to update cart with the new item
        await Cart.updateOne(
          { UserId: userId },
          {
            $push: {
              item: {
                productId,
                productName,
                productPrice,
                quantity: parseInt(newQuantity),
                stock: parseInt(newStock),
              },
            },
            $inc: { totalPrice: totalPrice },
          }
        );
        console.log("updating cart with new item in user", userId, "done here");
        console.log("updating cart with new item", cart, "done here");
      }
    } else {
      console.log("Cart does not exist", cart, "done here");
      const newQuantity = parseInt(value);
      const newStock = furniture.quantity - parseInt(value);
      const newSold = furniture.sold + parseInt(value);
      if (newStock < 0) {
        console.log("Cannot add item. Insufficient stock");
        res.redirect("/error");
        return;
      }


      let totalPrice;
      if (furniture.offer && furniture.offer) {
        const offerValue = furniture.offer;
        totalPrice = productPrice * parseInt(value);


        // Apply the offer calculation
        totalPrice = totalPrice - (totalPrice * offerValue) / 100;
        console.log(totalPrice)
      } else {
        // No offer, use the original price for the calculation
        totalPrice = productPrice * parseInt(value);
      }

      const newCart = new Cart({
        UserId: userId,
        item: [
          {
            productId,
            productName,
            productPrice,
            quantity: newQuantity,
            stock: newStock,
          },
        ],
        totalPrice: totalPrice,
      });

      await newCart.save();
      await Furniture.updateOne(
        { _id: productId },
        { $set: { quantity: newStock, 
                  sold:newSold} }
      );
      console.log("saving new cart", newCart, "done here");
    }

    res.status(200).json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("An error occurred while adding to cart:", error);
    res.redirect("/error");
  }
};

cartController.getCart = async (req, res) => {
  try {
    const userId = req.session.user._id;

    // Find the cart for the user
    const cart = await Cart.findOne({ UserId: userId });

    if (cart) {
      if (cart.item && cart.item.length > 0) {
        const items = await Promise.all(
          cart.item.map((item) => {
            return Furniture.findOne({ _id: item.productId });
          })
        );

        const validItems = items.filter((item) => item !== null);
        const validProductIds = validItems.map((item) => item._id.toString());

        // Remove invalid items from the cart
        cart.item = cart.item.filter((item) =>
          validProductIds.includes(item.productId.toString())
        );

        const products = validItems.map((item) => {
          if (item.photo && item.photo.length > 0) {
            item.photo = item.photo.map((photo) =>
              photo.replace(/\\/g, "/").replace("public/", "/")
            );
          }
          return item;
        });

        await cart.save(); // Save the updated cart

        res.render("cartPage", {
          cart: cart,
          user: req.session.user === undefined ? "" : req.session.user,
          products: products || [],
        });
      } else {
        res.render("cartPage", {
          cart: cart,
          user: req.session.user === undefined ? "" : req.session.user,
          products: [],
        });
      }
    } else {
      console.log("Cart does not exist");
      res.redirect("/error");
    }
  } catch (error) {
    console.error("An error occurred while retrieving the cart:", error);
    res.redirect("/error");
  }
};

cartController.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.session.user._id;

  try {
    const cart = await Cart.findOne({ UserId: userId });

    if (cart) {
      const item = cart.item.find((item) => item.productId === productId);

      if (item) {
        const furniture = await Furniture.findById(productId);
        const newQuantity = 0;
        const newStock = item.quantity;
        const newSold = furniture.sold + newStock;

        await Cart.updateOne(
          { UserId: userId },
          {
            $pull: { item: { productId: productId } },
            $inc: { totalPrice: -(item.quantity * item.productPrice) },
          }
        );

        await Furniture.updateOne(
          { _id: productId },
          { $inc: { quantity: newStock, sold: newSold } }
        );

        res.redirect("/user/cartPage");
      } else {
        console.log("Item does not exist in cart");
        res.redirect("/error");
      }
    } else {
      console.log("Cart does not exist");
      res.redirect("/error");
    }
  } catch (error) {
    console.error("An error occurred while removing from cart:", error);
    res.redirect("/error");
  }
};

cartController.deleteItem = async (req, res) => {
  const { productId } = req.body;
  const userId = req.session.user._id;

  try {
    const cart = await Cart.findOne({ UserId: userId });

    if (cart) {
      const item = cart.item.find((item) => item.productId === productId);

      if (item) {
        const newQuantity = item.quantity - 1;
        const newStock = item.stock + 1;

        if (newQuantity === 0) {
          await Cart.updateOne(
            { UserId: userId },
            {
              $pull: { item: { productId: productId } },
              $inc: { totalPrice: -item.productPrice },
            }
          );
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
        }

        await Furniture.updateOne(
          { _id: productId },
          { $inc: { quantity: 1 } }
        );
      } else {
        console.log("Item does not exist in cart");
        res.redirect("/error");
      }
    } else {
      console.log("Cart does not exist");
      res.redirect("/error");
    }
    res.redirect("/user/cartPage");
  } catch (error) {
    console.error("An error occurred while deleting item from cart:", error);
    res.redirect("/error");
  }
};

cartController.addItem = async (req, res) => {
  const { productId } = req.body;
  const userId = req.session.user._id;

  try {
    const cart = await Cart.findOne({ UserId: userId });

    if (cart) {
      const item = cart.item.find((item) => item.productId === productId);
      const product = await Furniture.findById(productId);

      if (item && product) {
        if (product.quantity > 0) {
          const newQuantity = item.quantity + 1;
          const newStock = product.quantity - 1;

          await Cart.updateOne(
            { UserId: userId, "item.productId": productId },
            { $set: { "item.$.quantity": newQuantity } }
          );

          await Furniture.updateOne(
            { _id: productId },
            { $set: { quantity: newStock } }
          );

          cart.totalPrice += item.productPrice;
          await cart.save();

          res.redirect("/user/cartPage");
        } else {
          res.status(400).json({ success: false, message: "Insufficient stock" });
        }
      } else {
        res.status(404).json({ success: false, message: "Item or product not found" });
      }
    } else {
      res.status(404).json({ success: false, message: "Cart not found" });
    }
  } catch (error) {
    console.error("An error occurred while adding item to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default cartController;
