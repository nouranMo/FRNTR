// Import required modules
import express from "express";
import session from "express-session";
import connectDB from "./config/db.js";
import User from "./models/user.js";
import Furniture from "./models/furniture.js";
import multer from "multer";
import path from "path";
import image from "express-image";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: "public/images",
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});
const upload = multer({ storage });

// Set up port and database URI
const port = process.env.PORT;
const URI = process.env.URI;

// Connect to the database
connectDB();

// Create an Express app
const app = express();

// Configure session middleware
app.use(
  session({
    secret: "FYNGZ_KEY",
    resave: false, // Set to false to avoid the deprecation warning
    saveUninitialized: true, // Set to true or false based on your needs
  })
);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static("public"));
app.use("/images", image("images"));

// Parse JSON requests
app.use(express.json());

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Import routers
import index_router from "./routes/index.js";
import product_router from "./routes/Products.js";
import user_router from "./routes/user.js";
import auth_router from "./routes/auth.route.js";
import admin_router from "./routes/admin.route.js";
import adminproduct_router from "./routes/admin.products.route.js";
// Register routers
app.use("/", index_router);
app.use("/user", user_router);
app.use("/product", product_router);
app.use("/auth", auth_router);
app.use("/admin", admin_router);
app.use("/adminproduct", adminproduct_router);



app.post("/account", (req, res) => {
  //req.session.userr = req.body.email;
  // req.session.pw = req.body.pas;

  var data = { email: req.body.email };
  User.find(data).then((result) => {
    console.log(result[0]);
    console.log(result[0].firstName);
    req.session.user = result[0];
    res.render("account", { userP: req.session.user });
  });
  req.session.x = "x";
  // res.redirect('/User/account',{userP:result[0]});
});
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render("404");
});

// Start the server
app.listen(port);

// Export the app
export default app;
