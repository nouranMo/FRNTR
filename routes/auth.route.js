import { Router } from 'express';
// Create a new router instance
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
  });
  
/* GET Sign Up page. */
router.get('/SignUp', function(req, res, next) {
    // res.render('SignUp',{ userr: req.session.userr });
    res.render('SignUp');
  });

// Export the router
export default router;