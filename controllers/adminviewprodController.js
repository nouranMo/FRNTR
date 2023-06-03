import Furniture from "../models/furniture.js";
import user from "../models/user.js";
console.log("Retrieved products from the database:");
const productsController = {
  viewAllProducts: async (req, res) => {
    try {
      console.log("Inside viewAllProducts");

      // Retrieve all products from the database
      const products = await Furniture.find();

      console.log("Retrieved products from the database:", products);

      products.forEach((product) => {
        if (product.photo && product.photo.length > 0) {
          product.imagePath = product.photo.map((photo) =>
            photo.replace(/\\/g, "/").replace("public/", "")
          );
        }
      });

      // Calculate pagination variables
      const currentPage = parseInt(req.query.page) || 1; // Current page number
      const itemsPerPage = 10; // Number of products to display per page
      const totalItems = products.length; // Total number of products
      const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages

      // Get the products for the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentProducts = products.slice(startIndex, endIndex);

      res.render("products", {
        products: currentProducts,
        currentPage,
        totalPages,
        imagePath: currentProducts[0].imagePath,
      });
    } catch (error) {
      // Handle error if retrieval fails
      console.error("Error retrieving products:", error);
      res.render("404", {
        message: "Failed to retrieve products",
        user: req.session.user === undefined ? "" : req.session.user,
      });
    }
  },

  LowInStock: async (req, res) => {
    try {
      console.log("Inside LowInStock");
      const lowStock = await Furniture.find({ quantity: { $lt: 10 } });

      console.log("Retrieved low stock products from the database:", lowStock);

      lowStock.forEach((product) => {
        if (product.photo && product.photo.length > 0) {
          product.imagePath = product.photo.map((photo) =>
            photo.replace(/\\/g, "/").replace("public/", "")
          );
          console.log(product.photo);
        }
      });

      if (lowStock.length === 0) {
        // If no low stock items, render the page without passing lowStock or imagePath
        res.render("dashboard", { lowStock });
      } else {
        // If there are low stock items, render the page with lowStock and imagePath
        res.render("dashboard", {
          lowStock,
          imagePath: lowStock[0].imagePath,
        });
      }
    } catch (error) {
      console.error("Error retrieving low stock products:", error);
      res.render("404", {
        message: "Failed to retrieve low stock products",
        user: req.session.user === undefined ? "" : req.session.user,
      });
    }
  },

  Offers: async (req, res) => {
    try {
      console.log("Inside offers");

      // Retrieve products with quantities less than 10 from the database
      const offers = await Furniture.find({
        offer: { $exists: true, $ne: null },
      });

      console.log("Retrieved products with offers from the database:", offers);

      offers.forEach((product) => {
        if (product.photo && product.photo.length > 0) {
          product.imagePath = product.photo.map((photo) =>
            photo.replace(/\\/g, "/").replace("public/", "../")
          );
          console.log("offer", product.photo);
        }
      });
      if (offers.length === 0) {
        res.render("offers", { offers });
      } else {
        res.render("offers", { offers, imagePath: offers[0].imagePath });
      }
    } catch (error) {
      // Handle error if retrieval fails
      console.error("Error retrieving products with offers:", error);
      res
        .status(500)
        .render("404", {
          message: "Failed to retrieve products with offers",
          user: req.session.user === undefined ? "" : req.session.user,
        });
    }
  },
  viewAllUsers: async (req, res) => {
    try {
      console.log("Inside viewAllUsers");
      const Users = await user.find();
      console.log("Retrieved Users from the database: ", Users);

      const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter (default to 1 if not provided)
      const perPage = 10; // Number of customers per page

      const totalUsers = Users.length;
      const totalPages = Math.ceil(totalUsers / perPage);
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      const usersOnPage = Users.slice(startIndex, endIndex);

      res.render("customers", {
        Users: usersOnPage,
        currentPage: page,
        totalPages: totalPages,
        startIndex: startIndex,
        endIndex: endIndex,
      });
    } catch (error) {
      // Handle error if retrieval fails
      console.error("Error retrieving users:", error);
      res.render("404", { message: "Failed to retrieve users" });
    }
  },

  beAdmin: async (req, res) => {
    try {
      const userId = req.params.id;
      const targetUser = await user.findById(userId);
      if (!targetUser) {
        return res.render("404", { message: "User not found" });
      }
      if (targetUser.userType === "admin") {
        return res.render("404", { message: "User is already an admin" });
      }
      console.log(req.params.id);
      await user.findByIdAndUpdate(req.params.id, { userType: "admin" });
      res.redirect("/admin/customers");
    } catch (error) {
      console.error("Error changing the user:", error);
      res.render("404", { message: "Failed to change the user" });
    }
  },
  beClient: async (req, res) => {
    try {
      //add verifcation that the one changing from clien to admina nd vice versa is an admin
      const userId = req.params.id;
      const targetUser = await user.findById(userId);

      if (!targetUser) {
        return res.render("404", { message: "User not found" });
      }

      if (targetUser.userType === "client") {
        return res.render("404", { message: "User is already a client" });
      }
      console.log(req.params.id);
      await user.findByIdAndUpdate(req.params.id, { userType: "client" });
      res.redirect("/admin/customers");
    } catch (error) {
      console.error("Error changing the user:", error);
      res.render("404", { message: "Failed to change the user" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userID = req.params.id;
      console.log(userID);
      const targetUser = await user.findById(userID);
      if (!targetUser) {
        return res.render("404", { message: "User not found" });
      } else {
        await user.findByIdAndDelete(userID);
        res.redirect("/admin/customers");
      }
    } catch (error) {
      console.error("Error deleting the user: ", error);
      res.render("404", { message: "Failed to change the user" });
    }
  },
  editUser: async (req, res) => {
    console.log("initiated user edit in backend");

    try {
      const { id, firstName, lastName, email, address, address2 } = req.body;
      console.log(req.body);
      // Use the extracted values to update the user in your database
      const updatedUser = await user.findByIdAndUpdate(id, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        address2: address2,
      });
      console.log("updated user", updatedUser);
      // Once the user is updated successfully, you can send a response indicating success
      res.redirect("/admin/customers");
    } catch (error) {
      // If an error occurs during the update process, you can send an error response
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  },
};

export default productsController;
