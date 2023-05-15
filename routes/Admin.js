import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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