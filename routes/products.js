import { Router } from 'express';
var router = Router();

// view all lel user , 

/* GET item page. */
router.get('/itemPage', function(req, res, next) {
  res.render('itemPage');
});

/* GET client Product page. */
router.get('/clientProduct', function(req, res, next) {
  res.render('clientProduct');
});
export default router;