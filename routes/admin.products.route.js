import { Router } from "express";
import multer from "multer";
import furnitureController from "../controllers/addfurnitureController.js";
const storage = multer.diskStorage({
  destination: "public/images",
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});
const upload = multer({ storage });

// ...
// Import controller modules

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
// Handle POST request to create a new furniture item
router.post("/furniture", upload.array("photo", 5), furnitureController.createFurniture);

// ...
// Export the router
export default router;
