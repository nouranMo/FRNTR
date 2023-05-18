// signupController.js
import User from "../models/user.js";

const signupController = {};

signupController.signup = async (req, res) => {
  console.log("Signup request received");

  // Extract form data from request body
  const { Firstname, last, email, pas, pasconfirm, userType } = req.body;

  // Backend validation
  let errors = {};

  if (Firstname.trim() === "") {
    errors.firstname = "You must enter your first name!";
  }

  if (last.trim() === "") {
    errors.lastname = "You must enter your last name!";
  }

  if (email.trim() === "") {
    errors.email = "You must enter your email!";
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    errors.email = "Email already exists!";
  }

  if (pas === "") {
    errors.password = "You must enter a password!";
  } else if (pas.length < 8) {
    errors.password = "Password must be at least 8 characters!";
  }

  if (pas !== pasconfirm) {
    errors.confirmPassword = "Password does not match!";
  }

  if (Object.keys(errors).length > 0) {
    // Return validation errors to the client
    return res.render("signup", { errors });
  }

  try {
    // Create a new user instance
    const newUser = new User({
      firstName: Firstname,
      lastName: last,
      email,
      password: pas,
      passwordConfirm: pasconfirm,
      userType,
    });

    // Save the new user to the database
    await newUser.save();
    console.log("User saved:", newUser);

    // Redirect to the home page
    res.redirect("/");
  } catch (error) {
    console.error("Error saving user:", error);

    // Redirect to the home page
    res.redirect("/");
  }
};

export default signupController;
