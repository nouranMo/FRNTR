// loginController.js
import User from "../models/user.js";
const loginController = {};

loginController.login =  (req, res) => {
    console.log("Login request received");
  
    const { email, pass } = req.body;
  
   
  
    if (email === 'admin@gmail.com' && pass === 'admin!.!') {
      // Render the dashboard
      return res.render("dashboard");
    }
  
    try {
      // Find the user in the database by email
     User.findOne({ email })
  .then((result)=>{
  
    if (!result) {
      // User not found, display error message
      //return res.status(401).json({ error: "Invalid email " });
    
      return res.render("login",{errors:"Invalid email or password"});
    }
  
  
     if (result.password!=pass) {
      // Password does not match, display error message
      console.log("error");
      // return res.status(401).json({ error: "Invalid  password" });
     
  
      return res.render("login",{errors:"Invalid email or password"})
    }
  
  req.session.user=result;
  
    // Password matches, render the account page with user data
    // return res.render("account", { userP:result});
    return res.redirect('/auth/account')
  });
     
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  
  export default loginController;