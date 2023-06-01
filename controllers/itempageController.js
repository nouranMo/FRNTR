import Furniture from "../models/furniture.js";
const itemproductdetail={

detail: async(req,res)=>{
    const {id}=req.params;

    const product=await Furniture.findOne({_id:id})
try{
    if(product){
        
  
            if (product.photo && product.photo.length > 0) {
                
                console.log("hello");
              product.photo = product.photo.map((photo)=>photo.replace(/\\/g, '/').replace('public/','/'));
            }
 
    }
    else{
        console.log("Product not found");
    }
    
    console.log(product);

    res.render("itempage",{product,user:req.session.user===undefined?"":req.session.user});
   
}catch (error) {
        console.error(error);
    }
}

};
export default itemproductdetail;