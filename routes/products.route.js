import { Router } from 'express';
import multer from "multer";
import productsController from "../controllers/adminviewprodController.js";
import userviewproduct from "../controllers/userproductController.js";
import itemproductdetail from "../controllers/itempageController.js";
import furnitureController from "../controllers/addfurnitureController.js"
let router = Router();
router.get('/itempage',itemproductdetail.detail);


/* GET client Product page. */
router.get('/clientproduct', productsController.viewAllCategoryProducts);

router.get('/filter',userviewproduct.filtering);
router.post('/review',furnitureController.getreview);
router.get('/largestOffer', productsController.LargestOffers);
export default router;