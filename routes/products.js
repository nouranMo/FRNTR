import { Router } from 'express';
var router = Router();

/* GET products page. */
router.get('/', function(req, res, next) {
  res.render('products');
});
/* GET AddProduct page. */
router.get('/AddProduct', function(req, res, next) {
  res.render('AddProduct');
});
/* GET EditProduct page. */
router.get('/EditProduct', function(req, res, next) {
  res.render('EditProduct');
});

export default router;