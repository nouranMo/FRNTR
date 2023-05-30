// loginController.js
import bcrypt from "bcryptjs"
import User from "../models/user.js";
const loginController = {}; 

loginController.login = async(req, res) => {
  console.log("Login request received");

  const { email, pass } = req.body;



  try {
    // Find the user in the database by email
    const result= await User.findOne({email});

        if (!result) {
          // User not found, display error message
          //return res.status(401).json({ error: "Invalid email " });

          return res.render("login", { errors: "Invalid email or password" });
        }
       // Comparing the entered password with the hashed one.
       if(!result.verified){
        return res.render("login", { errors: "Sorry This Email is not Verified Please check yot email" });
       }
        const isPasValid= await bcrypt.compare(pass,result.password);

            if (!isPasValid) {

              // Password does not match, display error message
              console.log("error");
              // return res.status(401).json({ error: "Invalid  password" });


              return res.render("login", { errors: "Invalid email or password" });
            }


        req.session.user = result;

        // Password matches, render the account page with user data
        // return res.render("account", { userP:result});
        return res.redirect('/auth/account');
          }
  catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default loginController;