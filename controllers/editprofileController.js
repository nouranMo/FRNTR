import User from "../models/user.js";
const editprofileController = {};

editprofileController.editprofile = async (req, res) => {
  console.log("Edit request received");

  const { Firstname, last, address, address2 } = req.body;
  const id = req.body.id;
  let errors = {};

  if (Firstname.trim() === "") {
    errors.Firstname = "You must enter your first name!";
  }

  if (last.trim() === "") {
    errors.last = "You must enter your last name!";
  }

  if (address.trim() === "") {
    errors.address = "You must enter your address!";
  }

  if (Object.keys(errors).length > 0) {
    return res.render("editprofile", {myerrors:errors, user: req.session.user === undefined ? "" : req.session.user});
  } 

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName: Firstname,
        lastName: last,
        address: address,
        address2: address2
      },
      { new: true }
    );

    if (!updatedUser) {
      // User not found
      return res.status(404).send("User not found");
    }
    // Redirect to the account page with the updated user
   req.session.user = updatedUser;
    return res.render("account", {user:req.session.user });
  } catch (error) {
    console.error("Error saving user:", error);
    return res.redirect("/");
  }
};

export default editprofileController;
