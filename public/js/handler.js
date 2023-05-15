// ##################  START SLIDE SHOW SCRIPT ######################
var counter = 1;
var imageSlide;
var buttons;

function displayImage(num) {
  for (var i = 0; i < imageSlide.length; i++) {
    if (i == num) {
      imageSlide[i].style.display = "block";
      buttons[i].style.background = "black";
    } else {
      imageSlide[i].style.display = "none";
      buttons[i].style.background = "transparent";
    }
  }
}

function displayFirst() {
  imageSlide[0].style.display = "block";
  buttons[0].style.background = "black";
}

function nextSlide() {
  for (var i = 0; i < imageSlide.length; i++) {
    if (imageSlide[i].style.display == "block") {
      if (i === imageSlide.length - 1) {
        imageSlide[i].style.display = "none";
        buttons[i].style.background = "transparent";
        imageSlide[0].style.display = "block";
        buttons[0].style.background = "black";
      } else {
        imageSlide[i].style.display = "none";
        buttons[i].style.background = "transparent";
        imageSlide[i + 1].style.display = "block";
        buttons[i + 1].style.background = "black";
      }
      break;
    }
  }
}

function automaticImage() {
  setInterval(function() {
    nextSlide();
  }, 8000);
}

document.addEventListener("DOMContentLoaded", function() {
  imageSlide = document.getElementsByClassName("slideimage");
  buttons = document.getElementsByClassName("manual-btn");
  displayFirst();
  automaticImage();
});

// ##################  END SLIDE SHOW SCRIPT ######################



function addItem() {
  var x = parseFloat(document.getElementById("totalAmount").innerText);
  var y = parseFloat(
    document.getElementById("totalItemPrice").innerText.replace(/,/g, "")
  );
  var z = parseFloat(
    document.getElementById("subtotalNum").innerText.replace(/,/g, "")
  );
  z = z - y;
  y /= x;
  x = x + 1;
  document.getElementById("totalAmount").innerText = x;
  document.getElementById("totalItemPrice").innerText = (
    y * x
  ).toLocaleString();
  document.getElementById("subtotalNum").innerText = (
    z +
    y * x
  ).toLocaleString();
}
function removeItem() {
  var x = parseInt(document.getElementById("totalAmount").innerText);
  if (x != 1) {
    var y = parseFloat(
      document.getElementById("totalItemPrice").innerText.replace(/,/g, "")
    );
    var z = parseFloat(
      document.getElementById("subtotalNum").innerText.replace(/,/g, "")
    );
    z = z - y;
    y /= x;
    x--;
    document.getElementById("totalAmount").innerText = x;
    document.getElementById("totalItemPrice").innerText = (
      y * x
    ).toLocaleString();
    document.getElementById("subtotalNum").innerText = (
      z +
      y * x
    ).toLocaleString();
  }
}

function addItemCart() {
  var x = parseFloat(document.getElementById("totalAmountBar").innerText);
  var y = parseFloat(
    document.getElementById("priceAfterSale").innerText.replace(/,/g, "")
  );
  y /= x;
  x = x + 1;
  document.getElementById("totalAmountBar").innerText = x;
}
function removeItemCart() {
  var x = parseInt(document.getElementById("totalAmountBar").innerText);
  if (x != 1) {
    var y = parseFloat(
      document.getElementById("priceAfterSale").innerText.replace(/,/g, "")
    );
    y /= x;
    x--;
    document.getElementById("totalAmountBar").innerText = x;
  }
}
