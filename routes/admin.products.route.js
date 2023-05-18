import { Router } from "express";
// Create a new router instance
var router = Router();

/* GET products page. */
router.get("/", function (req, res, next) {
  res.render("products");
});
/* GET addproduct page. */
router.get("/addproduct", function (req, res, next) {
  res.render("addproduct");
});
router.get("/deleteproduct", function (req, res, next) {
  res.render("deleteproduct");
});
/* GET EditProduct page. */
router.get("/productedit", function (req, res, next) {
  res.render("productedit");
});

// Export the router
export default router;
