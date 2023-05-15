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
/* GET Admin page. */
router.get('/Admin', function(req, res, next) {
    res.render('dashboard');
  });
/* GET customers page. */
router.get('/customers', function(req, res, next) {
    res.render('customers');
  });
  /* GET statistics page. */
  router.get('/statistics', function(req, res, next) {
    res.render('statistics');
  });
  /* GET reviews page. */
  router.get('/reviews', function(req, res, next) {
    res.render('reviews');
  });
  /* GET orders page. */
  router.get('/orders', function(req, res, next) {
    res.render('orders');
  });


export default router;