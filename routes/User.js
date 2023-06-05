import express  from 'express';
import Furniture from "../models/furniture.js";
import furnitureController from "../controllers/addfurnitureController.js";
import Cart from "../models/cart.js";
import editprofileController1 from "../controllers/editprofileController.js"
import userviewproduct from '../controllers/userproductController.js';

// Create a new router instance
var router = express.Router();
import bodyParser from "body-parser";
import cartController from "../controllers/cartController.js";
import wishlistController from "../controllers/wishlistController.js";

router.use(bodyParser.json());

/* GET cart page. */


//Create Route for add item into cart
router.post('/add-to-cart', cartController.addToCart ); 

router.post('/editprofile', editprofileController1.editprofile);


router.post('/add-to-wishlist', wishlistController.addToWishlist); 

router.get('/wishlist',wishlistController.getWishlist);
//router.get('/add-to-cart', cartController.getCart);
      

//   // const userId = req.body.user._id; // Assuming you have implemented user authentication
//   console.log('req: '+req.body.productId)
//   console.log('req: '+req.body.productName)
//   console.log('req: '+req.body.productPrice)
//   console.log('req: '+req.body.productQuantity)


//   const productId = req.body.productId;
//   const productName = req.body.productName;
//   const productPrice = req.body.productPrice;
//   const productQuantatity = req.body.productQuantatity;
//   var query = {userId: "64629f1742f3bb2f1961437d"}
//   Cart.findOne(query) 
//       .then(result => {
//       if (!result) {
//         res.send("msh mawgod");      }
//       else {
//           req.session.user = result;
//           res.send("mawgod");
//       }
//   })
//   .catch(err => {
//       console.log(err);
//   });
  //   if (err) {
  //     console.error(err);
  //     res.status(500).send('Error finding cart');
  //   } else if (cart) {
  //     // Cart exists, check if it already contains the product
  //     const index = cart.items.findIndex(item => item.productId.equals(productId));
  //     if (index !== -1) {
  //       // Product already in cart, increment quantity
  //       cart.items[index].quantity++;
  //     } else {
  //       // Product not in cart, add new item
  //       cart.items.push({ productId: productId, productName: productName, productPrice: productPrice, quantity: 1 });
  //     }
  //     cart.save(function(err) {
  //       if (err) {
  //         console.error(err);
  //         res.status(500).send('Error saving cart');
  //       } else {
  //         res.send('Item added to cart');
  //       }
  //     });
  //   } else {
  //     // Cart does not exist, create new cart
  //     const newCart = new Cart({ userId: userId, items: { productId: productId, productName: productName, productPrice: productPrice, quantity: 1 } });
  //     newCart.save(function(err) {
  //       if (err) {
  //         console.error(err);
  //         res.status(500).send('Error saving cart');
  //       } else {
  //         res.send('Item added to cart');
  //       }
  //     });
  //   }
  // });
// });




/* GET Wishlist page. */
router.get('/wishlist', function(req, res, next) {
  res.render('wishlist',{user:req.session.user===undefined?"":req.session.user});
});
// cartPage
router.get('/cartPage', cartController.getCart);

//remove item from cart
router.post('/remove-from-cart', cartController.removeFromCart);

router.get('/checkout',userviewproduct.checkout);
 


router.get('/editprofile', function(req, res, next) {
  res.render('editprofile',{user:req.session.user===undefined?"":req.session.user});
});









// Export the router
export default router;
