import { Router } from 'express';
import multer from "multer";
import productsController from "../controllers/adminviewprodController.js";
var router = Router();

router.get('/', productsController.viewAllProducts);

router.get('/itempage', function(req, res, next) {
  res.render('itempage');
});

/* GET client Product page. */
router.get('/clientproduct', function(req, res, next) {
  res.render('clientproduct');
});
export default router;