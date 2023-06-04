import { Router } from 'express';
import multer from "multer";
import productsController from "../controllers/adminviewprodController.js";
import userviewproduct from "../controllers/userproductController.js";
import itemproductdetail from "../controllers/itempageController.js";
var router = Router();
router.get('/itempage',itemproductdetail.detail);


/* GET client Product page. */
router.get('/clientproduct', productsController.viewAllCategoryProducts);

router.get('/filter',userviewproduct.filtering);
router.post('/review',furnitureController.getreview);

export default router;