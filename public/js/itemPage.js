/*##############addone############*/
let data = 1;
document.querySelector('.number').innerText = data;
function decrement() {
    if (data <= 1) {
        data = 1;
    } else {
        data--;
        document.querySelector('.number').innerText = data;
    }
}
function increment() {
    data++;
    document.querySelector('.number').innerText = data;
}
/*##################image Section ###############*/
document.addEventListener('DOMContentLoaded', function() {
    let smallDivs = document.querySelectorAll('.cp');
    smallDivs.forEach(function(smallDiv, index) {
      let anchorLink = smallDiv.querySelector('a');
      let targetImageId = "image" + (index + 1);
      let targetImage = document.getElementById(targetImageId);
  
      anchorLink.addEventListener('click', function(event) {
        event.preventDefault();
        targetImage.scrollIntoView({ behavior: 'smooth' });
      });
    });
  });
/*##################Review Section ###############*/
const accordion=document.querySelector('.contentBox');
accordion.addEventListener('click',function(event){
    this.classList.toggle('active');

    if(this.classList.contains('active')){
        this.querySelector("i").classList.replace("fa-plus","fa-minus");
    }
    else{
        this.querySelector("i").classList.replace("fa-minus","fa-plus");
    }
})
function showReviewForm() {
    const accordion = document.querySelector('.contentBox');
    accordion.addEventListener('click', function(event) {
      this.classList.toggle('active');
      if (this.classList.contains('active')) {
        this.querySelector("i").classList.replace("fa-plus", "fa-minus");
      } else {
        this.querySelector("i").classList.replace("fa-minus", "fa-plus");
      }
    });
  
    console.log("inside add review button");
    let reviewForm = document.getElementById("review-form");
    let closeButton = document.getElementById("close-button");
  
    closeButton.addEventListener('click', function() {
      reviewForm.style.display = "none";
      accordion.classList.remove('active');
      accordion.querySelector("i").classList.replace("fa-minus", "fa-plus");
    });
  
    if (reviewForm.style.display === "none") {
      reviewForm.style.display = "block";
      accordion.classList.add('active');
      accordion.querySelector("i").classList.replace("fa-plus", "fa-minus");
    } else {
      reviewForm.style.display = "none";
      accordion.classList.remove('active');
      accordion.querySelector("i").classList.replace("fa-minus", "fa-plus");
    }
  }
  function closeReviewForm() {
    let reviewForm = document.getElementById("review-form");
    reviewForm.style.display = "none";
  }
