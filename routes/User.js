import { Router } from 'express';

// Create a new router instance
var router = Router();



/* GET cart page. */
router.get('/cart', function(req, res, next) {
  res.render('cart');
});





/* GET Wishlist page. */
router.get('/wishlist', function(req, res, next) {
  res.render('wishlist');
});






/* GET account page. */
router.get('/account',function(req,res,next){
res.render('account');
});
// Export the router
export default router;
