import { Router } from 'express';
var router = Router();

// view all lel user , 

/* GET item page. */
router.get('/', function(req, res, next) {
  res.render('products');
});
router.get('/itempage', function(req, res, next) {
  res.render('itempage');
});

/* GET client Product page. */
router.get('/clientproduct', function(req, res, next) {
  res.render('clientproduct');
});
export default router;