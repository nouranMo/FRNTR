import Cart from "../models/cart.js";
import Furniture from "../models/furniture.js";
import Wishlist from "../models/wishlist.js";

const wishlistController = {};

wishlistController.addToWishlist = async (req, res) => {
    const { productId, productName, productPrice , productQuantity} = req.body;
    console.log(productId, productName, productPrice, productQuantity , "done");
    const userId = req.session.user._id;
    const furniture = await Furniture.findOne({ _id: productId });
    console.log("user id" , userId)
    console.log("product quantity", productQuantity);
  
    try {
      let wishlist = await Wishlist.findOne({ UserId: userId });
      console.log(userId, wishlist, "done here");
      console.log("Add to wishlist function", wishlist, "done here");
  
      if (wishlist) {
        console.log("wishlist exists", wishlist, "done here");
  
        const item = wishlist.item.find((item) => item.productId === productId);

        if (item) {
          console.log("item exists in wishlist", item, "done here");
  
        } else {
          console.log("item does not exist in wishlist", item, "done here");
          wishlist.item.push({
            productId,
            productName,
            productPrice,
            productQuantity,
            
          });
          //need to update wishlist with the new item
          await Wishlist.updateOne(
            { UserId: userId},
            { $push: {
              item: {
                productId,
                productName,
                productPrice,
                productQuantity
                
              }
            }}
          );
          console.log("updating wishlist with new item in user", userId, "done here");
            console.log("updating wishlist with new item", wishlist, "done here");
          
        }
      } else {
        console.log("wishlist does not exist", wishlist, "done here");
        const newWishlist = new Wishlist({
          UserId: userId,
          item: [{ productId, productName, productPrice, productQuantity }],
        });
        
        await newWishlist.save();
        console.log("saving new wishlist", wishlist, "done here");
        
      }
  
      res.redirect('/wishlist');
    } catch (error) {
      console.error("An error occurred while adding to wishlist:", error);
      res.redirect('/error');
    }
  };
  



    wishlistController.getWishlist = async (req, res) => {
    try {
      //found the wishlist for the user
      console.log("getting user:" , req.session.user._id);
      const wishlist = await Wishlist.findOne({ UserId: req.session.user._id });
      
      //res.json(wishlist);
      
     
      console.log("getting wishlist", wishlist, "done here");
    if(wishlist){
      console.log("wishlist exists", wishlist, "done here");
      if (wishlist.item && wishlist.item.length > 0) {
        const items = await Promise.all(wishlist.item.map(item => {
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
        res.render('wishlist', { wishlist , user: req.session.user===undefined?"":req.session.user , products: products});
      }}
    }
     catch (error) {
      console.error("An error occurred while retrieving the wishlist:", error);
      res.redirect('/error');
    }
  };


  
wishlistController.deleteItem = async (req, res) => {

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
      const wishlist = await Wishlist.findOne({ userId });
      if (!wishlist) {
        return res.status(404).render('404', { message: 'wishlist not found' });
      }
      
  
  const itemIndex = wishlist.item.findIndex(item => item.productId === productId);
  if (itemIndex === -1) {
    return res.status(404).render('404', { message: 'Item not found' });
  }
  
  wishlist.item.splice(itemIndex, 1);
  await wishlist.save();
  
  res.redirect('/wishlist');
  } catch (error) {
  console.error('Error deleting item:', error);
  res.status(500).render('500', { message: 'Failed to delete item' });
  
  }
  };

  export default wishlistController;