$(document).ready(function () {
    $.ajax({
      url: '/admin/largestOffer',
      method: 'GET',
      success: function (response) {
        $('#largestOffer').text(response);
        console.log(response)
      },
      error:function(err){
        console.log(err);
        
      }
    });
  });
  