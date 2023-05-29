import { Router } from "express";
import multer from "multer";
import Furniture from "../models/furniture.js";
import furnitureController from "../controllers/addfurnitureController.js";
import editfurnitureController from "../controllers/editfurnitureController.js";
import idcheckController from "../controllers/idcheckController.js";
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

/* GET products page. */
router.get("/", function (req, res, next) {
  res.render("products");
});

/* GET addproduct page. */
router.get("/addproduct", function (req, res, next) {
  const errors = {};
  res.render("addproduct", { errors });
});

router.get("/deleteproduct", function (req, res, next) {
  res.render("deleteproduct");
});

/* GET EditProduct page. */
router.get("/productedit", async function (req, res, next) {
  const errors = {};
  try {
    const id = req.query.id; // Access the ID from query parameters
    
    // Fetch the product details from the database using the ID
    const product = await Furniture.findById(id);
    
    if (product) {
      res.render("productedit", { id: id, product: product , errors});
    } else {
      // Handle the case where the product is not found
      res.render("productedit", { id: id, product: null , errors });
    }
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/* GET EditProduct page. */
router.get("/idcheck", function (req, res, next) {
  const errors={};
  res.render("idcheck",{errors});
});

// Handle POST request to create a new furniture item
router.post("/furniture", upload.array("photo", 5), furnitureController.createFurniture);
router.post("/edit",upload.array("photo", 5), editfurnitureController.editFurniture);
router.post("/idcheck",idcheckController.EnterID);

// ...
// Export the router
export default router;
