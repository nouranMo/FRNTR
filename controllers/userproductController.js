import Furniture from "../models/furniture.js";
import Cart from '../models/cart.js';

const userviewproduct = {
  userview: async (req, res) => {
    const { category } = req.params;
    let products = await Furniture.find({ category });

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

    // Check if a filter has been applied
    const minPrice = parseInt(req.query.minPrice);
    const maxPrice = parseInt(req.query.maxPrice);

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      // Filter the products based on the price range
      products = products.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }
    

    res.render("clientproduct", {
      product: products,
      highestPrice,
      lowestPrice,
      user: req.session.user === undefined ? "" : req.session.user,
    });
  },
  filtering: async (req, res) => {
      const min = req.query.min;
      const max = req.query.max;

    
      try {
        // Use the min and max values to filter the products from the database
        const products = await Furniture.find({ price: { $gte: min, $lte: max } });
        if (products) {
          products.forEach((product) => {
            if (product.photo && product.photo.length > 0) {
              product.photo = product.photo.map((photo) =>
                photo.replace(/\\/g, "/").replace("public/", "/")
              );
            }
          });
        }
        res.json({ products });
        
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while filtering products.' });
      }
    },


    checkout: async(req,res)=>{
      console.log('hello');
        const{cart}=req.query;
          const productlist= await Cart.findById({_id:cart});
          console.log("found the product "+productlist);
          if(productlist){
           
             res.render('checkout',{user:req.session.user===undefined?"":req.session.user,productlist});
          }
      
    },
  };

export default userviewproduct;