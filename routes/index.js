import { Router } from 'express';
import addemailController from '../controllers/addemailController.js';
let router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index',{ userr: req.session.userr });
  res.render('index',{user:req.session.user===undefined?"":req.session.user});
});
router.post('/addemail',addemailController.addEmail);
export default router;