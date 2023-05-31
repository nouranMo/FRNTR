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

function validateEditProductName() {
  const field = document.getElementById("upproductname").value.trim();
  const nameError = document.getElementById("upnameid");
  const nameInput = document.getElementById("upproductname");

  if (field === "") {
    nameError.innerHTML = "You must enter the product name!";
    nameInput.style.borderColor = "red";
    return false;
  }
  nameError.innerHTML = "";
  nameInput.style.borderColor = "black";
  return true;
}

function validateEditColor() {
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

function validateEditPrice() {
  const field = document.getElementById("price").value;
  const priceError = document.getElementById("priceid");
  const priceInput = document.getElementById("price");

  if (isNaN(field) || parseFloat(field) <= 0 || !/^\d+(\.\d{1,2})?$/.test(field)) {
    priceError.innerHTML = "Please enter a valid price (up to 2 decimal places).";
    priceInput.style.borderColor = "red";
    return false;
  }
  priceError.innerHTML = "";
  priceInput.style.borderColor = "black";
  return true;
}

// function confirmChangeUserToAdmin()
// {
//   return confirm('Are you sure you want to change this user to an admin?');
// }
// function confirmChangeUserToClient(){
//   return confirm('Are you sure you want to change this user to a client?');

// }
// confirmation.js


function showConfirmationModal(message, callback) {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('confirmation-modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('confirmation-modal-content');

  const messageParagraph = document.createElement('p');
  messageParagraph.textContent = message;

  const yesButton = document.createElement('button');
  yesButton.textContent = 'Yes';
  yesButton.classList.add('btn', 'btn-confirmation-yes');

  const noButton = document.createElement('button');
  noButton.textContent = 'No';
  noButton.classList.add('btn', 'btn-confirmation-no');

  modalContent.appendChild(messageParagraph);
  modalContent.appendChild(yesButton);
  modalContent.appendChild(noButton);

  modalContainer.appendChild(modalContent);
  document.body.appendChild(modalContainer);

  yesButton.addEventListener('click', () => {
    callback(true);
    closeModal();
  });

  noButton.addEventListener('click', () => {
    callback(false);
    closeModal();
  });

  function closeModal() {
    document.body.removeChild(modalContainer);
  }
}

function confirmChangeUserToAdmin(userId) {
  showConfirmationModal('Are you sure you want to change this user to an admin?', (confirmed) => {
    if (confirmed) {
      // Proceed with the link action
      window.location.href = `/admin/beAdmin/${userId}`;
    }
  });

  return false; // Prevent the default link action
}

function confirmChangeUserToClient(userId) {
  showConfirmationModal('Are you sure you want to change this user to a client?', (confirmed) => {
    if (confirmed) {
      // Proceed with the link action
      window.location.href = `/admin/beClient/${userId}`;
    }
  });

  return false; // Prevent the default link action
}





function validateEditQuantity() {
  const field = document.getElementById("quantity").value;
  const quantityError = document.getElementById("quantityid");
  const quantityInput = document.getElementById("quantity");

  if (isNaN(field) || !Number.isInteger(parseFloat(field)) || parseInt(field) <= 0) {
    quantityError.innerHTML = "Please enter a valid quantity (a positive whole number).";
    quantityInput.style.borderColor = "red";
    return false;
  }
  quantityError.innerHTML = "";
  quantityInput.style.borderColor = "black";
  return true;
}
function validateEditID() {
  const field = document.getElementById("upID").value.trim();
  const idError = document.getElementById("upidid");
  const idInput = document.getElementById("upID");

  if (field === "") {
    idError.innerHTML = "Product ID is required!";
    idInput.style.borderColor = "red";
    return false;
  }
  
  // Additional validation logic for the ID field, if needed

  idError.innerHTML = "";
  idInput.style.borderColor = "black";
  return true;
}
function validateEditForm(event) {
  event.preventDefault();

  const isProductNameValid = validateEditProductName();
  const isColorValid = validateEditColor();
  const isPriceValid = validateEditPrice();
  const isQuantityValid = validateEditQuantity();
  const isIDValid = validateEditID();

  if (!isProductNameValid || !isColorValid || !isPriceValid || !isQuantityValid || !isIDValid) {
    return false;
  }

  event.target.submit();
}
function upvalidateProductID(field) {
  const idError = document.getElementById("productID");
  const idInput = document.getElementById("upproductID");
  if(field === "") {
    idError.innerHTML = "Product ID is required!";
    idInput.style.borderColor = "red";
    return false;
  }
  idError.innerHTML = "";
  idInput.style.borderColor = "black";
  return true;
}
function checkID(form) {
  document.addEventListener('submit', event => {
    event.preventDefault();
  
  let fail = true;
  fail &= upvalidateProductID(form.upproductID.value.trim());
  
  if (fail) {
    event.target.submit();
  }
  else {
    return false;

  }
})
}
//sidebars
function signOpen() {
  document.getElementById("sidebar-1").style.display = "block";
}

function signclose() {
  document.getElementById("sidebar-1").style.display = "none";
}

function searchOpen() {
  document.getElementById("sidebar-2").style.display = "block";
}

function searchclose() {
  document.getElementById("sidebar-2").style.display = "none";
}

function cartOpen() {
  document.getElementById("cartsidebar").style.display = "block";
}

function cartClose() {
  document.getElementById("cartsidebar").style.display = "none";
}
