function applyFilter() {
    console.log("inside button");
  const minPrice = parseInt(priceInput[0].value);
  const maxPrice = parseInt(priceInput[1].value);
  console.log("after minand max");
  // Send AJAX request to filter the products
  $.ajax({
    
    url: '/product/filter',
    method: 'GET',
    data: { min: minPrice, max: maxPrice },
    success: function (response) {
      // Access the products from the response object
      // const products = response;
      console.log("inajax");
      $('#rfilter').html(response); // Upd
      // Iterate over the products and do something with each product
      const products = response.products; // Assign the products from the response to the 'products' variable
      
      // Iterate over the products and render the product details
      products.forEach(function (product) {
        // Render the product details dynamically using the product data
        const productDiv = `
        <div class="col-md-3">
    <div class="products">
      <div class="product-image">
        <a href="/product/itemPage/${product._id}" class="images">
        ${product.photo && product.photo.length > 0 ? `
          <img src="${product.photo[0]}" class="pic-1" style="width: 100%" />
          <img src="${product.photo[1]}" class="pic-2" style="width: 100%" />
        </a>` : ''}
        <span class="discount">-26%</span>
        <div class="links">
          <div class="Icon">
            <a href=""><i class="fa-regular fa-heart"></i></a>
            <span class="tooltiptext">Add to WishList</span>
          </div>
          <div class="Icon">
            <a href="/product/itemPage"><i class="fa-regular fa-eye"></i></a>
            <span class="tooltiptext">Quick view</span>
          </div>
          <div class="Icon">
            <a href=""><i class="fa-solid fa-cart-plus"></i></a>
            <span class="tooltiptext">Add To Cart</span>
          </div>
        </div>
      </div>
      <div class="Content">
        <h3 class="product-title">
          ${product.productName}
        </h3>
        <del>10,680.00 EGP</del>
        <ins class="in">${product.price}EGP</ins>
      </div>
    </div>
  </div>

        `;
        
        $('#rfilter').append(productDiv); // Append the product div to the 'filter' div
      });
    },
    error: function (error) {
      console.error('Error:', error);
      console.log("in ajax error");
    }
  });
}