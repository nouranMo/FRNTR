import { Router } from 'express';
import multer from "multer";
import productsController from "../controllers/adminviewprodController.js";
import userviewproduct from "../controllers/userproductController.js";
import itemproductdetail from "../controllers/itempageController.js";
var router = Router();
router.get('/itempage/:id',itemproductdetail.detail);


/* GET client Product page. */
router.get('/clientproduct/:category', userviewproduct.userview);

router.get('/filter',userviewproduct.filtering);

// Authentication, securing the admin dashboard.

router.use((req,res,next)=>{

  if(req.session.user!==undefined && req.session.user.userType==="admin")
  {
    
    next();

  }
  else
  {

  res.render('404',{user:req.session.user===undefined?"":req.session.user});
  
  }
  });
router.get('/', productsController.viewAllProducts);

export default router;