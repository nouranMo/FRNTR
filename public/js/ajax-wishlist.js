async function addToWishlist(productid, productname , productprice , productQuantity) {
  console.log("in ajax wishlist");
    console.log(productid, productname, productprice, productQuantity, "done");

       product = {
      productId: productid,
      productName: productname,
      productPrice: productprice,
      productQuantity: productQuantity,
       }
      console.log(product);

                // fetch('/user/add-to-cart', {
                //   contentType: 'application/json',
                //   method: 'POST',
                //   body: JSON.stringify({product: product})
                // })
                //   .then(response => {
                //     // Handle response
                //     console.log(response);
                //   })
                //   .catch(error => {
                //     // Handle error
                //     console.error(error);
                //   });

                $.ajax({
                  url:'/user/add-to-wishlist',
                  method:'POST',
                  contentType: 'application/json',
                  data:JSON.stringify({ productId: productid, productName:productname,
                  productPrice: productprice, productQuantity: productQuantity}),
                  success:function(response){
                   //$('#result').html(response);
                  },
                  error:function(err){

                    console.log(err);
                  }
                })
            }



            async function deleteFromWishlist(productid, productname , productprice , productQuantity) {
              console.log("in ajax delete from wishlist");
                console.log(productid, productname, productprice, productQuantity, "done");
            
                   product = {
                  productId: productid,
                  productName: productname,
                  productPrice: productprice,
                  productQuantity: productQuantity,
                   }
                  console.log(product);
            
                            // fetch('/user/add-to-cart', {
                            //   contentType: 'application/json',
                            //   method: 'POST',
                            //   body: JSON.stringify({product: product})
                            // })
                            //   .then(response => {
                            //     // Handle response
                            //     console.log(response);
                            //   })
                            //   .catch(error => {
                            //     // Handle error
                            //     console.error(error);
                            //   });
            
                            $.ajax({
                              url:'/user/deleteFromWishlist',
                              method:'POST',
                              contentType: 'application/json',
                              data:JSON.stringify({ productId: productid, productName:productname,
                              productPrice: productprice, productQuantity: productQuantity}),
                              success:function(response){
                                document.documentElement.innerHTML = response;
                                history.pushState({}, null, "/user/wishlist");
                              },
                              error:function(err){}
                            })
                        }