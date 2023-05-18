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
// Function to add an image preview and remove button
function addImagePreview(file) {
  var reader = new FileReader();
  reader.onload = function (e) {
    var imgSrc = e.target.result;
    var imagePreview = document.createElement('div');
    var imageElement = document.createElement('img');
    var removeButton = document.createElement('button');

    // Set the maximum dimensions for the image
    imageElement.style.maxWidth = '200px';
    imageElement.style.maxHeight = '200px';

    imageElement.src = imgSrc;
    removeButton.textContent = 'Remove';
    removeButton.type = 'button';
    removeButton.classList.add('remove-image');
    removeButton.addEventListener('click', function () {
      removeImage(this);
    });

    imagePreview.classList.add('image-preview');
    imagePreview.appendChild(imageElement);
    imagePreview.appendChild(removeButton);

    document.getElementById('photoContainer').appendChild(imagePreview);
  };
  reader.readAsDataURL(file);
}


// Function to remove an image preview and update selected files
function removeImage(button) {
  var imageContainer = button.parentNode;
  var imagePath = imageContainer.querySelector('img').src;

  // Remove the image preview from the page
  imageContainer.remove();

  // Get the selected files input element
  var input = document.getElementById("photo");

  // Clear the file input
  input.value = '';

  // Re-add the remaining files
  var remainingFiles = Array.from(input.files).filter(function(file) {
    return file.previewImage !== imagePath;
  });

  remainingFiles.forEach(function(file) {
    addImagePreview(file);
  });
}



// Helper function to extract the file name from the image path
function getImageFileName(imagePath) {
  var startIndex = imagePath.lastIndexOf('/') + 1;
  var endIndex = imagePath.lastIndexOf('.');
  return imagePath.substring(startIndex, endIndex);
}

// Function to handle file selection and display previews
function validateImageFiles(input) {
  const files = input.files;
  const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  const fileStatus = document.getElementById('fileStatus');

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!allowedExtensions.test(file.name)) {
      fileStatus.style.color = 'red';
      fileStatus.textContent = 'Please select valid image files (JPEG, JPG, or PNG).';
      input.value = '';
      var container = document.getElementById("photoContainer");
      container.innerHTML = '';
      return;
    }
  }

  fileStatus.style.color = 'green';
  fileStatus.textContent = 'Files are valid. You can proceed.';

  var container = document.getElementById("photoContainer");
  container.innerHTML = '';
  for (let i = 0; i < files.length; i++) {
    addImagePreview(files[i]);
  }
}



function validate(event) {

  event.preventDefault();
  validateProductName();
 
  validateColor();
 
  validatePrice();
  
  validateQuantity();
  console.log('test')
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
