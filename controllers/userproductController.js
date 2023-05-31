import Furniture from "../models/furniture.js";
const userviewproduct ={
 
    userview: async(req,res)=>{

    const {category}=req.params;
    const product= await Furniture.find({ category });

    if(product){
       
        product.forEach((products) => {
            if (products.photo && products.photo.length > 0) {
                console.log("hello");
              products.imagePath = products.photo.map((photo)=>photo.replace(/\\/g, '/').replace('public/','/'));
            }
          });
          
    }
    console.log(product);

res.render("clientproduct",{product,imagePath: product[0].imagePath });
    },
};
export default userviewproduct;