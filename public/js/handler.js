// ##################  START SLIDE SHOW SCRIPT ######################
let counter = 1;
let imageSlide;
let buttons;

function displayImage(num) {
  for (let i = 0; i < imageSlide.length; i++) {
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
  for (let i = 0; i < imageSlide.length; i++) {
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
  let x = parseFloat(document.getElementById("totalAmount").innerText);
  let y = parseFloat(
    document.getElementById("totalItemPrice").innerText.replace(/,/g, "")
  );
  let z = parseFloat(
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
  let x = parseInt(document.getElementById("totalAmount").innerText);
  if (x != 1) {
    let y = parseFloat(
      document.getElementById("totalItemPrice").innerText.replace(/,/g, "")
    );
    let z = parseFloat(
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
  let x = parseFloat(document.getElementById("totalAmountBar").innerText);
  let y = parseFloat(
    document.getElementById("priceAfterSale").innerText.replace(/,/g, "")
  );
  y /= x;
  x = x + 1;
  document.getElementById("totalAmountBar").innerText = x;
}
function removeItemCart() {
  let x = parseInt(document.getElementById("totalAmountBar").innerText);
  if (x != 1) {
    let y = parseFloat(
      document.getElementById("priceAfterSale").innerText.replace(/,/g, "")
    );
    y /= x;
    x--;
    document.getElementById("totalAmountBar").innerText = x;
  }
}
