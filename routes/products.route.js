import { Router } from 'express';
import multer from "multer";
import productsController from "../controllers/adminviewprodController.js";
import userviewproduct from "../controllers/userproductController.js";
import itemproductdetail from "../controllers/itempageController.js";
var router = Router();
router.get('/itempage',itemproductdetail.detail);


/* GET client Product page. */
router.get('/clientproduct/:category', userviewproduct.userview);

router.get('/filter',userviewproduct.filtering);


export default router;