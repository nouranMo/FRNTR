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

/* GET statistics page. */
router.get("/statistics", function (req, res, next) {
  res.render("statistics");
});

router.post("/editUser", upload.none(), productsController.editUser);
/* GET orders page. */
router.get("/orders", function (req, res, next) {
  res.render("orders");
});
router.get("/", productsController.LowInStock);
router.get("/customers", productsController.viewAllUsers);
router.get("/beAdmin/:id", productsController.beAdmin);
router.get("/beClient/:id", productsController.beClient);
router.get("/deleteuser/:id", productsController.deleteUser);
router.get("/lowInStock", productsController.LowInStock);
router.get("/offer", productsController.Offers);
router.get("/reviews", productsController.revtoadmin);
/* GET customers page. */
// Export the router
export default router;
