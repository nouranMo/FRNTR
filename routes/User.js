import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
/* GET cart page. */
router.get('/cart', function(req, res, next) {
  res.render('cart');
});
/* GET item page. */
router.get('/itemPage', function(req, res, next) {
  res.render('itemPage');
});
/* GET client Product page. */
router.get('/clientProduct', function(req, res, next) {
  res.render('clientProduct');
});
/* GET Sig Up page. */
router.get('/SignUp', function(req, res, next) {
  res.render('SignUp');
});
/* GET Wishlist page. */
router.get('/wishlist', function(req, res, next) {
  res.render('wishlist');
});


export default router;