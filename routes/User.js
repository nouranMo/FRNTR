import express  from 'express';
import Furniture from "../models/furniture.js";
import furnitureController from "../controllers/addfurnitureController.js";
import Cart from "../models/cart.js";
import editprofileController1 from "../controllers/editprofileController.js"
import userviewproduct from '../controllers/userproductController.js';

// Create a new router instance
let router = express.Router();
import bodyParser from "body-parser";
import cartController from "../controllers/cartController.js";
import wishlistController from "../controllers/wishlistController.js";

router.use(bodyParser.json());

/* GET cart page. */



router.use((req,res,next)=>{

  if(req.session.user!==undefined)
  {
    
    next();

  }
  else
  {

  res.render('404',{user:req.session.user===undefined?"":req.session.user});
  
  }
  });
//Create Route for add item into cart
router.post('/add-to-cart', cartController.addToCart ); 




router.post('/add-to-wishlist', wishlistController.addToWishlist); 
router.get('/wishlist',wishlistController.getWishlist);
router.post('/deleteFromWishlist', wishlistController.deleteFromWishlist );


/* GET Wishlist page. */
router.get('/wishlist', function(req, res, next) {
  res.render('wishlist',{user:req.session.user===undefined?"":req.session.user});
});
// cartPage
router.get('/cartPage', cartController.getCart);
router.post('/deleteItem',cartController.deleteItem);
router.post('/addItem',cartController.addItem);
//remove item from cart
router.post('/remove-from-cart', cartController.removeFromCart);

router.get('/checkout',userviewproduct.checkout);
 
router.post('/order',userviewproduct.order);

router.post('/editprofile', editprofileController1.editprofile);

router.get('/editprofile', function(req, res, next) {
  let errors = {};
  res.render('editprofile',{myerrors:errors,user:req.session.user===undefined?"":req.session.user});
});


// Export the router
export default router;
