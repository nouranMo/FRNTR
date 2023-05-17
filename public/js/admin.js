function validateProductName() {
  const field = document.getElementById("productname").value.trim();
  const nameError = document.getElementById("nameid");
  const nameInput = document.getElementById("productname");

  if (field === "") {
    nameError.innerHTML = "You must enter the product name!";
    nameInput.style.borderColor = "red";
    return false;
  }
  nameError.innerHTML = "";
  nameInput.style.borderColor = "black";
  return true;
}

function validateColor() {
  const field = document.getElementById("color").value.trim();
  const colorError = document.getElementById("colorid");
  const colorInput = document.getElementById("color");

  if (field === "") {
    colorError.innerHTML = "You must choose an available color!";
    colorInput.style.borderColor = "red";
    return false;
  }
  colorError.innerHTML = "";
  colorInput.style.borderColor = "black";
  return true;
}
function validatePrice() {
  const field = document.getElementById("price").value;
  const priceError = document.getElementById("priceid");
  const priceInput = document.getElementById("price");

  if (
    isNaN(field) ||
    parseFloat(field) <= 0 ||
    !/^\d+(\.\d{1,2})?$/.test(field)
  ) {
    priceError.innerHTML =
      "Please enter a valid price (up to 2 decimal places).";
    priceInput.style.borderColor = "red";
    return false;
  }
  priceError.innerHTML = "";
  priceInput.style.borderColor = "black";
  return true;
}

function validateQuantity() {
  const field = document.getElementById("quantity").value;
  const quantityError = document.getElementById("quantityid");
  const quantityInput = document.getElementById("quantity");

  if (
    isNaN(field) ||
    !Number.isInteger(parseFloat(field)) ||
    parseInt(field) <= 0
  ) {
    quantityError.innerHTML =
      "Please enter a valid quantity (a positive whole number).";
    quantityInput.style.borderColor = "red";
    return false;
  }
  quantityError.innerHTML = "";
  quantityInput.style.borderColor = "black";
  return true;
}

function validateImageFile(input) {
  const files = input.files;
  const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  const fileStatus = document.getElementById('fileStatus');

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!allowedExtensions.test(file.name)) {
      fileStatus.style.color = 'red';
      fileStatus.textContent = 'Please select valid image files (JPEG, JPG, or PNG).';
      input.value = '';
      return false;
    }
  }

  fileStatus.style.color = 'green';
  fileStatus.textContent = 'Files are valid. You can proceed.';
  return true;
}

function validate(event) {

  event.preventDefault();
  validateProductName();
 
  validateColor();
 
  validatePrice();
  
  validateQuantity();
  
  if(!validateProductName() || !validateColor() || !validatePrice() || !validateQuantity()){  
    return false

}
event.target.submit();
}

function upvalidateProductName(field) {
  if (field == "") {
    document.getElementById("upnameid").innerHTML =
      "You must enter the products name !";
    document.getElementById("upproductname").style.borderColor = "red";
    return false;
  } else {
    document.getElementById("upnameid").innerHTML = "";
    document.getElementById("upproductname").style.borderColor = "black";
    return true;
  }
}

function upvalidateProductID(field) {
  if (field == "") {
    document.getElementById("upidid").innerHTML = "You must enter an ID !";
    document.getElementById("upID").style.borderColor = "red";
    return false;
  } else {
    document.getElementById("upidid").innerHTML = "";
    document.getElementById("upID").style.borderColor = "black";
    return true;
  }
}

function validate1(form) {
  let fail = "";
  fail &= upvalidateProductName(form.upproductname.value.trim());
  if (fail) return true;
  else {
    return false;
  }
}
