import { Router } from 'express';
import User from "../models/user.js";
import signupController from '../controllers/signupController.js';
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
router.post("/SignUp", signupController.signup);
// Export the router
export default router;