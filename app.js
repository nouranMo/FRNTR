// Import required modules
import express from 'express';
import session from 'express-session';
import connectDB from './config/db.js';
import User from './models/user.js';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Set up port and database URI
const port = process.env.PORT;
const URI = process.env.URI;

// Connect to the database
connectDB();

// Create an Express app
const app = express();

// Configure session middleware
app.use(session({
    secret: 'FYNGZ_KEY',
    resave: false, // Set to false to avoid the deprecation warning
    saveUninitialized: true // Set to true or false based on your needs
  }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse JSON requests
app.use(express.json());

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Import routers
import index_router from "./routes/index.js";
import product_router from "./routes/Products.js";
import user_router from "./routes/User.js";

// Register routers
app.use('/', index_router);
app.use('/User', user_router);
app.use('/Product', product_router);

// Handle signup form submission
app.post('/signup', async (req, res) => {
  console.log('Signup request received');

  // Extract form data from request body
  const { Firstname, last, email, pas, pasconfirm, userType } = req.body;

  try {
    // Create a new user instance
    const newUser = new User({
      firstName: Firstname,
      lastName: last,
      email,
      password: pas,
      passwordConfirm: pasconfirm,
      userType
    });

    // Save the new user to the database
    await newUser.save();
    console.log('User saved:', newUser);

    // Redirect to the home page
    res.redirect('/');
  } catch (error) {
    console.error('Error saving user:', error);

    // Redirect to the home page
    res.redirect('/');
  }
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('404');
});

// Start the server
app.listen(port);

// Export the app
export default app;
