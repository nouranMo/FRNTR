import { Router } from 'express';
// Create a new router instance
var router = Router();

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

/* GET Admin page. */
router.get('/', function(req, res, next) {
    res.render('dashboard');
  });


/* GET Admin page. */
router.get('/dashboard', function(req, res, next) {
    res.render('dashboard');
  });

  /* GET statistics page. */
router.get('/statistics', function(req, res, next) {
    res.render('statistics');
  });

  /* GET reviews page. */
router.get('/reviews', function(req, res, next) {
    res.render('reviews');
  });

  /* GET orders page. */
router.get('/orders', function(req, res, next) {
    res.render('orders');
  });
  
  /* GET offers page. */
  router.get('/offers', function(req, res, next) {
    res.render('offers');
  });

  /* GET customers page. */
router.get('/customers', function(req, res, next) {
    res.render('customers');
  });
// Export the router
export default router;