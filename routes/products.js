import { Router } from 'express';
import multer from "multer";
import productsController from "../controllers/adminviewprodController.js";
var router = Router();
router.get('/itempage', function(req, res, next) {
  res.render('itempage');
});

/* GET client Product page. */
router.get('/clientproduct', function(req, res, next) {
  res.render('clientproduct');
});


// Authentication, securing the admin dashboard.

router.use((req,res,next)=>{

  if(req.session.user!==undefined && req.session.user.userType==="admin")
  {
    
    next();

  }
  else
  {

  res.render('404');
  
  }
  });
router.get('/', productsController.viewAllProducts);

export default router;