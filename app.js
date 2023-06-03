// Import required modules
import express from "express";
import session from "express-session";
import connectDB from "./config/db.js";
import User from "./models/user.js";
import Furniture from "./models/furniture.js";
import multer from "multer";
import path from "path";
import image from "express-image";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import mailchimp from "@mailchimp/mailchimp_marketing";
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

// Set up Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

const run = async () => {
  const response = await mailchimp.ping.get();
  console.log(response);
};

run();
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
app.use(bodyParser.json());

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
import product_router from "./routes/products.js";
import user_router from "./routes/User.js";
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

//test pagination
const products = [
  {id: 1  , name:'product 1'},
  {id: 2  , name:'product 2'},
  {id: 3  , name:'product 3'},
  {id: 4  , name:'product 4'},
  {id: 5  , name:'product 5'},
  {id: 6  , name:'product 6'},
  {id: 7  , name:'product 7'},
  {id: 8  , name:'product 8'},
  {id: 9  , name:'product 9'},
  {id: 10 , name:'product 10'},
] 


app.get('/product/clientproduct' , paginatedResults(Furniture),(req , res) =>{
 
  res.json(res.paginatedResults);
})

function paginatedResults(model){
return (req , res , next) =>{
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)

  const startIndex = (page -1) *limit
  const endIndex = page * limit


  const results = {}
  
if(endIndex < model.length){
  results.next = {
    page: page + 1 ,
    limit: limit
  }
}

  if(startIndex > 0){

  results.previous = {
    page: page - 1 ,
    limit: limit
  }
}
results.results = model.slice(startIndex , endIndex)
res.paginatedResults = results
next();
}
}

// app.post("/account", (req, res) => {
//   //req.session.userr = req.body.email;
//   // req.session.pw = req.body.pas;
//   let errors={};

//   var data = { email: req.body.email };
//   User.find(data)
  
//   .then((result) => {
//     console.log(result[0]);
//     console.log(result[0].firstName);
//     req.session.user = result[0];
//     if (req.body.email.trim() === "") {
//       errors.email = "You must enter your email!";
//     }
  
  
//     if(result[0].password!=req.body.pas){
//         errors.password="incoorect password !"
//     }

//   });
  

//   if (Object.keys(errors).length > 0) {
//     // Return validation errors to the client
//     return res.status(400).json({ errors });
//   }
//   res.render("account", { userP: req.session.user });
//   req.session.x = "x";
//   // res.redirect('/User/account',{userP:result[0]});
// });






app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render("404",{user:req.session.user===undefined?"":req.session.user});
});

// Start the server
app.listen(port);

// Export the app
export default app;
