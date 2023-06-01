import Furniture from "../models/furniture.js";

const userviewproduct = {
  userview: async (req, res) => {
    const { category } = req.params;
    const products = await Furniture.find({ category });

    if (products) {
      products.forEach((product) => {
        if (product.photo && product.photo.length > 0) {
          product.photo = product.photo.map((photo) =>
            photo.replace(/\\/g, "/").replace("public/", "/")
          );
        }
      });
    }

    // Find the highest and lowest prices
    const highestPrice = Math.max(...products.map((product) => product.price));
    const lowestPrice = Math.min(...products.map((product) => product.price));

    console.log("Highest Price:", highestPrice);
    console.log("Lowest Price:", lowestPrice);

    res.render("clientproduct", {
      product: products,
      highestPrice,
      lowestPrice,
    });
  },
};

export default userviewproduct;