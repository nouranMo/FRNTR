import { Router } from 'express';
import productsController from "../controllers/adminviewprodController.js";
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
router.get('/', async(req, res, next) =>{
  try {
    // Retrieve low stock products from the controller
    const products = await productsController.LowInStock(req, res, next);
    const lowStock = products.products;

    // Render the "dashboard" view and pass the low stock products data
    res.render('dashboard', { lowStock });
  } catch (error) {
    // Handle error if retrieval fails
    console.error("Error retrieving low stock products:", error);
    res.render("error", { message: "Failed to retrieve low stock products" });
  }
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
  router.get('/customers', productsController.viewAllUsers);
  router.get('/beAdmin/:id',productsController.beAdmin);
  router.get('/beClient/:id',productsController.beClient);
  router.get('/lowInStock', productsController.LowInStock);

  /* GET customers page. */
// Export the router
export default router;