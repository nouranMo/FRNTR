import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
/* GET home page. */
router.get('/cart', function(req, res, next) {
  res.render('cart');
});
/* GET home page. */
router.get('/itemPage', function(req, res, next) {
  res.render('itemPage');
});

export default router;