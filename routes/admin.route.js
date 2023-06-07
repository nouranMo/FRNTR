import { Router } from "express";
import multer from "multer";
import productsController from "../controllers/adminviewprodController.js";
// Create a new router instance
var router = Router();
const upload = multer({ dest: "public/images" });

// Authentication, securing the admin dashboard.
router.use((req, res, next) => {
  if (req.session.user !== undefined && req.session.user.userType === "admin") {
    next();
  } else {
    res.render("404", {
      user: req.session.user === undefined ? "" : req.session.user,
    });
  }
});

router.get("/", productsController.LowInStock, productsController.LargestOffers, (req, res) => {
  // Access the data returned by the LargestOffers middleware
  const largestOfferProduct = res.locals.largestOfferProduct;
});
router.get("/customers", productsController.viewAllUsers);
router.get("/beAdmin/:id", productsController.beAdmin);
router.get("/beClient/:id", productsController.beClient);
router.get("/deleteuser/:id", productsController.deleteUser);
router.get("/lowInStock", productsController.LowInStock);
router.get("/orders",  productsController.Sold);
router.get("/offer", productsController.Offers);
router.get("/reviews", productsController.revtoadmin);
router.get('/approverev/:id/:index',productsController.approverev);
router.get('/deleteReview/:id/:index',productsController.deleterev);
router.post("/editUser", upload.none(), productsController.editUser);
router.get("/statistics", productsController.SoldStatistics);

/* GET customers page. */
// Export the router
export default router;
