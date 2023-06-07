import { Router } from 'express';
import User from "../models/user.js";
import VerificationToken from"../models/token.js";
import signupController from '../controllers/signupController.js';
import loginController from '../controllers/loginControllers.js';
import verifiyController from'../controllers/verifiyController.js';
import forgetpassController from '../controllers/forgetpassController.js';
// Create a new router instance
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index',{user:req.session.user===undefined?"":req.session.user});
  });
  
/* GET Sign Up page. */
router.get('/signup', function(req, res, next) {
  const errors = {};
    res.render('signup',{errors,user:req.session.user===undefined?"":req.session.user});
  });
// Handle signup form submission
router.post("/signup", signupController.signup);

router.get("/verifiy",function(req,res,next){
  const errors = '';
  const message=''
res.render("verifiy",{errors,message,user:req.session.user===undefined?"":req.session.user});
});
router.get('/verify/:token',verifiyController.active);


router.post("/verifiy",verifiyController.verifiy);


router.get('/forgetpassword', function(req, res, next) {
  const errors = '';
    res.render('forgetpassword',{errors,user:req.session.user===undefined?"":req.session.user});
  });

  
router.post('/forgetpassword',forgetpassController.forgetpass);

router.get('/forget-password/:token',forgetpassController.forgetPasswordLoad);
router.post('/forget-password',forgetpassController.resetpassword);

router.get('/login',function(req,res,next){
  const errors = '';
  res.render('login',{errors,user:req.session.user===undefined?"":req.session.user});
});

router.post("/login", loginController.login);
router.use((req,res,next)=>{

  if(req.session.user!==undefined )
  {
    
    next();

  }
  else
  {

  res.render('404',{user:req.session.user===undefined?"":req.session.user});
  
  }
  });

router.get('/account',function(req,res,next){
res.render("account",{user:req.session.user===undefined?"":req.session.user});
});



// Export the router
export default router;