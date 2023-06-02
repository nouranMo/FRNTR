// signupController.js
import bcrypt from 'bcryptjs'
import User from "../models/user.js";

const signupController = {};

// RegEx  Regular Expression

function validatePassword(password)
{
  var uppercasePattern = /[A-Z]/;
  var digitPattern = /[0-9]/;
  var pattern = /[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E$#&().|\\[\]{}]/;
// Characters:  ! to /, : to @, [ to `, { to ~, $, #, &, (, ), |, \, ], }

  return uppercasePattern.test(password) && digitPattern.test(password) && pattern.test(password);
}

signupController.signup = async (req, res) => {
  console.log("Signup request received");

  // Extract form data from request body
  const { Firstname, last, email, address, address2, pas, pasconfirm, userType } = req.body;

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

  if (address.trim() === "") {
    errors.address = "You must enter your address!";
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    errors.email = "Email already exists!";
  }

  if (pas === "") {
    errors.password = "You must enter a password!";
  } else if (pas.length < 8) {
    errors.password = "Password must be at least 8 characters!";
  } else if (!validatePassword(pas))
  {
    errors.password= "Password must contain at least one number, one special character, and one uppercase letter!"
  }

  if (pas !== pasconfirm) {
    errors.confirmPassword = "Password does not match!";
  }

  if (Object.keys(errors).length > 0) {
    // Return validation errors to the client
    return res.render("signup", { errors ,user:req.session.user===undefined?"":req.session.user});
  }

  try {
    // Password hashing
    const saltRounds=10;
    const hashedPassword = await bcrypt.hash(pas, saltRounds);

    // Create a new user instance
    const newUser = new User({
      firstName: Firstname,
      lastName: last,
      email,
      address,
      address2,
      password: hashedPassword,
      passwordConfirm: pasconfirm,
      userType,
    });

    // Save the new user to the database
    await newUser.save();
    req.session.person=newUser;
    console.log("User saved:", newUser);

    // Redirect to the home page
    res.redirect("/auth/verifiy");
  } catch (error) {
    console.error("Error saving user:", error);

    // Redirect to the home page
    res.redirect("/");
  }
};

export default signupController;
