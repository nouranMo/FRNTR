import { Router } from 'express';
import User from "../models/user.js";
import signupController from '../controllers/signupController.js';
import loginController from '../controllers/loginControllers.js';
// Create a new router instance
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
  });
  
/* GET Sign Up page. */
router.get('/signup', function(req, res, next) {
  const errors = {};
    res.render('signup',{errors});
  });
// Handle signup form submission
router.post("/signup", signupController.signup);


router.get('/login',function(req,res,next){
  const errors = '';
  res.render('login',{errors});
});

router.get('/account',function(req,res,next){
res.render("account",{userP:req.session.user===undefined?"":req.session.user});
});

router.post("/login", loginController.login);

// Export the router
export default router;