async function addToCart(productid, productname , productprice , productQuantity) {
    console.log(productid, productname, productprice, productQuantity, "done");
    openPopup();
                console.log(productname);
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
                  url:'/user/add-to-cart',
                  method:'POST',
                  contentType: 'application/json',
                  data:JSON.stringify({ productId: productid, productName:productname,
                  productPrice: productprice, quantity:0 ,stock: productQuantity}),
                  success:function(response){
                  // $('#result').html(response);
                  

                  },
                  error:function(err){}
                })
            
                  

             
            }

   // remove item from cart
   async function removeFromCart(productid, productname , productprice , productQuantity) {
    console.log("in remove from cart");
                product = {
                  productId: productid,
                  productName: productname,
                  productPrice: productprice,
                  productQuantity: productQuantity,
                }
                console.log(product);

                $.ajax({
                    url:'/user/remove-from-cart',
                    method:'POST',
                    contentType: 'application/json',
                    data:JSON.stringify({ productId: productid, productName:productname,
                    productPrice: productprice, quantity:0 ,stock: productQuantity}),
                    success:function(response){
                     $('#result').html(response);
                      document.documentElement.innerHTML = response;
                      history.pushState({}, null, "/user/cartPage");
                    },
                    error:function(err){}
                  })             

   }
   function deleteItem(productId) {
    $.ajax({
      url: '/user/deleteItem',
      method: 'POST',
      data: { productId: productId },
      success: function(response) {
        document.documentElement.innerHTML = response;
history.pushState({}, null, "/user/cartPage");
      },
      error: function(xhr, status, error) {
        // Handle the error here, if needed
        console.error(error);
      }
    });
  }
  function addItemToCart(productId) {
    $.ajax({
      url: '/user/addItem',
      method: 'POST',
      data: { productId: productId },
      success: function(response) {
        document.documentElement.innerHTML = response;
history.pushState({}, null, "/user/cartPage");
      },
      error: function(xhr, status, error) {
        // Handle the error here, if needed
        console.error(error);
      }
    });
  }
  
   function openPopup(){
    popup.classList.add("open-popup");
}


function closePopup(){
    popup.classList.remove("open-popup");
}
   