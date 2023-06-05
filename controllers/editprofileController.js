import User from "../models/user.js";
import mongoose from "mongoose";

const editprofileController = {};

editprofileController.editprofile = async (req, res) => {
  console.log("Edit request received");

  const { firstname, lastn, email1, address1, address2 } = req.body;
  let errors = {};

  if (firstname.trim() === "") {
    errors.firstname = "You must enter your first name!";
    console.log(errors.firstname);
  }

  if (lastn.trim() === "") {
    errors.lastn = "You must enter your last name!";
  }

  console.log(email1);
  if (email1.trim() === "") {
    errors.email1 = "You must enter your email!";
  }

  const existingUser = await User.findOne({ email: email1 });
  if (existingUser) {
    errors.email1 = "Email already exists!";
  }

  if (address1.trim() === "") {
    errors.address1 = "You must enter your address!";
  }

  if (Object.keys(errors).length > 0) {
    console.log(errors.lastn);
    console.log(222);
    return res.render("editprofile", {
      errors: errors,
      user: req.session.user === undefined ? "" : req.session.user,
    });
  }

  try {
    const id = req.body.id;
    const useredit = await User.findById(id);
    useredit.firstName = firstname;
    useredit.lastName = lastn;
    useredit.email = email1;
    useredit.address = address1;
    useredit.address2 = address2;
    await useredit.save();
  } catch (error) {
    console.error("Error saving user:", error);
    return res.redirect("/");
  }
};

export default editprofileController;
