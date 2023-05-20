import Furniture from "../models/furniture.js";
const idcheckController = {};

idcheckController.EnterID = async (req, res) => {
    const { upproductID } = req.body;
    let errors = {};
    try {
      console.log("Inside idfind")
      // Check if the product ID exists in the database
      const product = await Furniture.findById(upproductID);
      const errors={};
      if (product) {
        // Product ID found, redirect to a new page with the product ID as a URL parameter
        console.log(product);
        res.render("productedit", { id: upproductID, product: product,errors});
      } else {
        // Product ID not found, redirect back to the same page with an error message
        errors.productID = 'Product ID not found';
        res.render('idcheck', { errors, upproductID });
      }
    } catch (error) {
      // Handle any errors that occur during database query
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
// ...
export default idcheckController;


