import { Router } from 'express';

// Create a new router instance
var router = Router();



/* GET cart page. */
router.get('/cart', function(req, res, next) {
  res.render('cart',{user:req.session.user===undefined?"":req.session.user});
});





/* GET Wishlist page. */
router.get('/wishlist', function(req, res, next) {
  res.render('wishlist',{user:req.session.user===undefined?"":req.session.user});
});







// Export the router
export default router;
;