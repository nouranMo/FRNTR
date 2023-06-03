import Furniture from "../models/furniture.js";
import mongoose from "mongoose";

const itemproductdetail = {
  detail: async (req, res) => {
    const { id, category } = req.query;

    try {
   
      const product = await Furniture.findOne({ _id: id });
      const products = await Furniture.find({ category });

      if (product) {
        if (product.photo && product.photo.length > 0) {
          product.photo = product.photo.map((photo) =>
            photo.replace(/\\/g, "/").replace("public/", "/")
          );
        }
      } else {
        console.log("Product not found");
      }

      console.log(product);

      const filteredProducts = products.filter(
        (p) => p._id.toString() !== product._id.toString()
      );

      if (filteredProducts) {
        filteredProducts.forEach((prod) => {
          if (prod.photo && prod.photo.length > 0) {
            prod.photo = prod.photo.map((photo) =>
              photo.replace(/\\/g, "/").replace("public/", "/")
            );
          }
        });
      }

      console.log(filteredProducts);

      res.render("itempage", {
        product,
        products: filteredProducts,
        user: req.session.user === undefined ? "" : req.session.user,
      });
    } catch (error) {
      console.error(error);
    }
  },
};

export default itemproductdetail;
