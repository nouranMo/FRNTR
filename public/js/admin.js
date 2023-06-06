Dropzone.autoDiscover = false;
var uploadedImagePaths = [];
$(document).ready(function () {
  // Initialize Dropzone
  var myDropzone = new Dropzone("#my-dropzone", {
    // Configuration options for Dropzone
    paramName: "file", // The name that will be used to transfer the file
    url: "/adminproduct/upload", // The URL where the file should be uploaded
    maxFilesize: 5, // Maximum file size in megabytes
    acceptedFiles: ".jpg,.png,.gif,.webp,.jpeg", // Allowed file types
    autoProcessQueue: true,
    // Customized initialization function
    init: function () {
      var previewElement = document.getElementById("preview");

      this.on("addedfile", function (file) {
        // Action to be performed when a file is added
        console.log("File added: " + file.name);
        // Display the file thumbnail
        // You can replace this with your own desired action
        var reader = new FileReader();
        reader.onload = function (e) {
          var thumbnail = document.createElement("div");
          thumbnail.classList.add("thumbnail");
          thumbnail.setAttribute("data-dz-name", file.name); // Add a custom attribute with the file name
          thumbnail.setAttribute("data-file-id", file.upload.uuid); // Add a custom attribute with the file ID
          thumbnail.innerHTML =
            '<img src="' +
            e.target.result +
            '" style="max-width: 100px;" />' +
            '<button type = "button" class="remove-btn">Remove</button>';
          previewElement.appendChild(thumbnail);
        };
        reader.readAsDataURL(file);
      });

      this.on("success", function (file, response) {
        console.log("File uploaded successfully: " + file.name);
        console.log("Server response: " + response);
        var imagePath = "public/images/" + file.name;
        uploadedImagePaths.push(imagePath);
        console.log(uploadedImagePaths[0]);
        // Update the preview element based on the server's response
      });

      this.on("error", function (file, errorMessage) {
        console.log("Error uploading file: " + file.name);
        console.log("Error message: " + errorMessage);
        // Update the preview element to indicate the error
        var errorText = document.createElement("p");
        errorText.innerHTML = "Upload Error: " + errorMessage;
        errorText.style.color = "red"; // Adjust the style as needed
        previewElement.appendChild(errorText);
      });

      // Attach event listener to the remove button
      previewElement.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-btn")) {
          e.stopPropagation(); // Stop event propagation to prevent triggering the parent click event
          var thumbnail = e.target.parentNode;
          var filename = thumbnail.getAttribute("data-dz-name");
          var fileId = thumbnail.getAttribute("data-file-id");

          // Make an AJAX request to delete the file from the server
          $.ajax({
            url: "/adminproduct/delete",
            type: "POST",
            data: { filename: filename },
            success: function (response) {
              console.log("File deleted successfully: " + filename);
              console.log("Server response: " + response);
              // Find the file object by file ID
              uploadedImagePaths.splice(
                uploadedImagePaths.indexOf("public/images/" + filename),
                1
              );
              var fileObject = myDropzone.files.find(function (file) {
                return file.upload.uuid === fileId;
              });
              if (fileObject) {
                myDropzone.removeFile(fileObject); // Remove the file from Dropzone
              }
              thumbnail.remove(); // Remove the thumbnail from the preview element
            },
            error: function (xhr, status, error) {
              console.log("Error deleting file: " + filename);
              console.log("Error message: " + error);
            },
          });
        }
      });
      // Function to validate the uploaded images
      function validateImages() {
        if (uploadedImagePaths.length === 0) {
          return false;
        }
        return true;
      }

      // Rest of the code...

      // Submit the form with AJAX
      $("#product-form").submit(function (event) {
        event.preventDefault();
        var isProductNameValid = validateProductName();
        var isColorValid = validateColor();
        var isPriceValid = validatePrice();
        var isQuantityValid = validateQuantity();
        var isImagesValid = validateImages();
        var isMeasurementsValid = validateMeasurements();
        if (
          !isProductNameValid ||
          !isColorValid ||
          !isPriceValid ||
          !isQuantityValid ||
          !isImagesValid ||
          !isMeasurementsValid
        ) {
          return false;
        }

        var form = $(this);
        var url = form.attr("action");
        var formData = new FormData(form[0]);
        // Append the uploadedImagePaths to the form data
        formData.append(
          "uploadedImagePaths",
          JSON.stringify(uploadedImagePaths)
        );

        $.ajax({
          type: "POST",
          url: "/adminproduct/furniture",
          data: formData,
          processData: false,
          contentType: false,
          success: function (response) {
            console.log("Form submitted successfully");
            console.log("Server response: " + response);
            // Handle success response
            // Replace the current page's content with the response
            document.documentElement.innerHTML = response;

            // Optionally, you can update the browser's history so the user can use the back button
            history.pushState({}, "", "/product");
          },
          error: function (xhr, status, error) {
            console.log("Error submitting form");
            console.log("Error message: " + error);
            // Handle error response
          },
        });

        return false;
      });
    },
  });
});
$(document).ready(function () {
  var myDropzone = new Dropzone("#my-dropzoneedit", {
    // Configuration options for Dropzone
    paramName: "file", // The name that will be used to transfer the file
    url: "/adminproduct/upload", // The URL where the file should be uploaded
    maxFilesize: 5, // Maximum file size in megabytes
    acceptedFiles: ".jpg,.png,.gif,.webp,jpeg", // Allowed file types
    autoProcessQueue: true,
    init: function () {
      var previewElement = document.getElementById("preview");
      // Get the img elements and extract the src attribute
      var productImages = document.querySelectorAll("#previous-images img");
      for (var i = 0; i < productImages.length; i++) {
        var imageSrc = productImages[i].getAttribute("src");
        var imagePath = imageSrc.replace(/\//g, "/");
        var imagePathWithPublic = "public" + imagePath;
        console.log(imagePathWithPublic + " added to uploadedImagePaths");
        uploadedImagePaths.push(imagePathWithPublic);
      }
      this.on("addedfile", function (file) {
        // Action to be performed when a file is added
        console.log("File added: " + file.name);
        // Display the file thumbnail
        // You can replace this with your own desired action
        var reader = new FileReader();
        reader.onload = function (e) {
          var thumbnail = document.createElement("div");
          thumbnail.classList.add("thumbnail");
          thumbnail.setAttribute("data-dz-name", file.name); // Add a custom attribute with the file name
          thumbnail.setAttribute("data-file-id", file.upload.uuid); // Add a custom attribute with the file ID
          thumbnail.innerHTML =
            '<img src="' +
            e.target.result +
            '" style="max-width: 100px;" />' +
            '<button type = "button" class="remove-button">Remove</button>';
          previewElement.appendChild(thumbnail);
        };
        reader.readAsDataURL(file);
      });

      this.on("success", function (file, response) {
        console.log("File uploaded successfully: " + file.name);
        console.log("Server response: " + response);
        var imagePath = "public/images/" + file.name;
        uploadedImagePaths.push(imagePath);
        console.log(uploadedImagePaths[0]);
        // Update the preview element based on the server's response
      });

      this.on("error", function (file, errorMessage) {
        console.log("Error uploading file: " + file.name);
        console.log("Error message: " + errorMessage);
        // Update the preview element to indicate the error
        var errorText = document.createElement("p");
        errorText.innerHTML = "Upload Error: " + errorMessage;
        errorText.style.color = "red"; // Adjust the style as needed
        previewElement.appendChild(errorText);
      });

      // Attach event listener to the remove button
      previewElement.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-button")) {
          e.stopPropagation(); // Stop event propagation to prevent triggering the parent click event
          var thumbnail = e.target.parentNode;
          var filename = thumbnail.getAttribute("data-dz-name");
          var fileId = thumbnail.getAttribute("data-file-id");

          // Make an AJAX request to delete the file from the server
          $.ajax({
            url: "/adminproduct/delete",
            type: "POST",
            data: { filename: filename },
            success: function (response) {
              console.log("File deleted successfully: " + filename);
              console.log("Server response: " + response);
              // Find the file object by file ID
              uploadedImagePaths.splice(
                uploadedImagePaths.indexOf("public/images/" + filename),
                1
              );
              var fileObject = myDropzone.files.find(function (file) {
                return file.upload.uuid === fileId;
              });
              if (fileObject) {
                myDropzone.removeFile(fileObject); // Remove the file from Dropzone
              }
              thumbnail.remove(); // Remove the thumbnail from the preview element
            },
            error: function (xhr, status, error) {
              console.log("Error deleting file: " + filename);
              console.log("Error message: " + error);
            },
          });
        }
      });
      // Attach event listener to the remove button for previous images
      $("#previous-images").on("click", ".remove-btn", function () {
        var listItem = $(this).closest("li");
        var imagePath = listItem.find("img").attr("src");
        var imageName = imagePath.substring(imagePath.lastIndexOf("/") + 1);
        // Make an AJAX request to delete the image from the server
        $.ajax({
          url: "/adminproduct/delete",
          type: "POST",
          data: { filename: imageName },
          success: function (response) {
            console.log("Image deleted successfully: " + imageName);
            console.log("Server response: " + response);
            listItem.remove(); // Remove the image from the list

            // Remove the image path from the uploadedImagePaths array
            var index = uploadedImagePaths.indexOf(
              "public/images/" + imageName
            );
            if (index !== -1) {
              console.log(
                "Removing image path: " +
                  "public/images/" +
                  imageName +
                  " from uploadedImagePaths"
              );
              uploadedImagePaths.splice(index, 1);
            }
          },
          error: function (xhr, status, error) {
            console.log("Error deleting image: " + imageName);
            console.log("Error message: " + error);
          },
        });
      });
      // Submit the form with AJAX
      $("#formedit").submit(function (event) {
        event.preventDefault();
        var isProductNameValid = validateProductName();
        var isColorValid = validateColor();
        var isPriceValid = validatePrice();
        var isQuantityValid = validateQuantity();
        var isMeasurementsValid = validateMeasurements();
        if (
          !isProductNameValid ||
          !isColorValid ||
          !isPriceValid ||
          !isQuantityValid ||
          !isMeasurementsValid
        ) {
          return false;
        }

        var form = $(this);
        var url = form.attr("action");
        var formData1 = new FormData(form[0]);
        for (var i = 0; i < uploadedImagePaths.length; i++) {
          console.log(uploadedImagePaths[i]);
        }
        var productID = $("#my-dropzoneedit").data("product-id");
        // Append the uploadedImagePaths to the form data
        formData1.append(
          "uploadedImagePaths",
          JSON.stringify(uploadedImagePaths)
        );
        formData1.append("id", productID);
        $.ajax({
          type: "POST",
          url: "/adminproduct/edit",
          data: formData1,
          processData: false,
          contentType: false,
          success: function (response) {
            console.log("Form submitted successfully");
            console.log("Server response: " + response);
            // Replace the current page's content with the response
            document.documentElement.innerHTML = response;

            // Optionally, you can update the browser's history so the user can use the back button
            history.pushState({}, "", "/product");
          },
          error: function (xhr, status, error) {
            console.log("Error submitting form");
            console.log("Error message: " + error);
            // Handle error response
          },
        });
        return false;
      });
    },
  });
});
function validateMeasurements() {
  console.log(document.getElementById("measurements").innerText);
  const field = document.getElementById("measurements").value.trim();
  const measurementsError = document.getElementById("measurementsid");
  const measurementsInput = document.getElementById("measurements");
  if (field === "") {
    measurementsError.innerHTML = "Please enter the measurements";
    measurementsInput.style.borderColor = "red";
    return false;
  }
  measurementsError.innerHTML = "";
  measurementsInput.style.borderColor = "black";
  return true;
}
function validateProductName() {
  console.log(document.getElementById("productname").innerText);
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
function validateImages() {
  if (uploadedImagePaths.length === 0) {
    var imagesError = document.getElementById("images-error");
    imagesError.innerHTML = "Please upload at least one image";
    return false;
  }
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

function showEditUserModal(userDetails, callback) {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("edit-user-modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("edit-user-modal-content");

  const labelsAndInputs = [
    { label: "First Name:", input: userDetails.firstName },
    { label: "Last Name:", input: userDetails.lastName },
    { label: "Email:", input: userDetails.email },
    { label: "Address 1:", input: userDetails.address },
    { label: "Address 2:", input: userDetails.address2 },
  ];

  labelsAndInputs.forEach((item) => {
    const label = document.createElement("label");
    label.textContent = item.label;

    const input = document.createElement("input");
    input.type = "text";
    input.value = item.input || ""; // Set input value to empty string if it's undefined

    modalContent.appendChild(label);
    modalContent.appendChild(input);
  });

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.classList.add("btn", "btn-save-user");

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.classList.add("btn", "btn-cancel-user");

  modalContent.appendChild(saveButton);
  modalContent.appendChild(cancelButton);

  modalContainer.appendChild(modalContent);
  document.body.appendChild(modalContainer);

  saveButton.addEventListener("click", () => {
    const updatedUserDetails = {};

    const userDetailsKeys = [
      "firstName",
      "lastName",
      "email",
      "address",
      "address2",
    ];
    let i = 0;

    labelsAndInputs.forEach((item, index) => {
      // ... existing code ...

      const input = modalContent.children[index * 2 + 1].value;
      updatedUserDetails[userDetailsKeys[i]] = input;
      i++;
    });
    console.log("Updated User Details:", updatedUserDetails); // Check the updated user details

    callback(updatedUserDetails);
    closeModal();
  });

  cancelButton.addEventListener("click", () => {
    callback(null); // Pass null to indicate cancellation
    closeModal();
  });

  function closeModal() {
    document.body.removeChild(modalContainer);
  }
}

function confirmEditUser(
  userId,
  email,
  firstName,
  lastName,
  address,
  address2
) {
  const userDetails = {
    id: userId,
    firstName: firstName,
    lastName: lastName,
    email: email,
    address: address,
    address2: address2,
  };

  showEditUserModal(userDetails, (updatedUserDetails) => {
    if (updatedUserDetails) {
      console.log("Updated Details to Send:", updatedUserDetails);

      const formData = new FormData();
      formData.append("id", userId);
      const userDetails = { firstName, lastName, email, address, address2 };
      for (const [key, value] of Object.entries(updatedUserDetails)) {
        console.log(`${key}: ${value}`);
        formData.append(key, value);
      } // Check the details to sendc
      console.log("FormData Content:");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      $.ajax({
        url: "/admin/editUser",
        method: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: (data) => {
          // Replace the current page's content with the response
          document.documentElement.innerHTML = data;

          // Optionally, you can update the browser's history so the user can use the back button
          history.pushState({}, "", "/product");
        },
        error: (error) => {
          console.error("Error:", error);
        },
      });
    } else {
      console.log("Edit canceled");
    }
  });

  return false;
}

function showConfirmationModal(message, callback) {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("confirmation-modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("confirmation-modal-content");

  const messageParagraph = document.createElement("p");
  messageParagraph.textContent = message;

  const yesButton = document.createElement("button");
  yesButton.textContent = "Yes";
  yesButton.classList.add("btn", "btn-confirmation-yes");

  const noButton = document.createElement("button");
  noButton.textContent = "No";
  noButton.classList.add("btn", "btn-confirmation-no");

  modalContent.appendChild(messageParagraph);
  modalContent.appendChild(yesButton);
  modalContent.appendChild(noButton);

  modalContainer.appendChild(modalContent);
  document.body.appendChild(modalContainer);

  yesButton.addEventListener("click", () => {
    callback(true);
    closeModal();
  });

  noButton.addEventListener("click", () => {
    callback(false);
    closeModal();
  });

  function closeModal() {
    document.body.removeChild(modalContainer);
  }
}

function confirmChangeUserToAdmin(userId) {
  showConfirmationModal(
    "Are you sure you want to change this user to an admin?",
    (confirmed) => {
      if (confirmed) {
        // Proceed with the link action
        window.location.href = `/admin/beAdmin/${userId}`;
      }
    }
  );

  return false; // Prevent the default link action
}

function confirmChangeUserToClient(userId) {
  showConfirmationModal(
    "Are you sure you want to change this user to a client?",
    (confirmed) => {
      if (confirmed) {
        // Proceed with the link action
        window.location.href = `/admin/beClient/${userId}`;
      }
    }
  );

  return false; // Prevent the default link action
}
function confirmDeleteRev(userId,index) {
  showConfirmationModal(
    "Are you sure you want to delete this review?",
    (confirmed) => {
      if (confirmed) {
        // Proceed with the link action
        window.location.href = `/admin/deleteReview/${userId}/${index}`;
      }
    }
  );

  return false; // Prevent the default link action
}
function confirmDeleteUser(userId, userEmail) {
  showConfirmationModal(
    `Are you sure you want to delete the user with the email: ${userEmail}`,
    (confirmed) => {
      if (confirmed) {
        // Proceed with the link action
        window.location.href = `/admin/deleteuser/${userId}`;
      }
    }
  );

  return false; // Prevent the default link action
}
// function printReview()
// {

// }
// function deleteReview()
// {
  
// }
function validateProductDeletion(productID, productName) {
  showConfirmationModal(
    "Are you sure you want to delete the product with the name: " +
      productName +
      "?",
    (confirmed) => {
      if (confirmed) {
        // Proceed with the link action
        window.location.href = `/adminproduct/deleteproduct/${productID}`;
      }
    }
  );
  return false; // Prevent the default link action
}
function validateEditQuantity() {
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

  if (
    !isProductNameValid ||
    !isColorValid ||
    !isPriceValid ||
    !isQuantityValid ||
    !isIDValid
  ) {
    return false;
  }

  event.target.submit();
}
function upvalidateProductID(field) {
  const idError = document.getElementById("productID");
  const idInput = document.getElementById("upproductID");
  if (field === "") {
    idError.innerHTML = "Product ID is required!";
    idInput.style.borderColor = "red";
    return false;
  }
  idError.innerHTML = "";
  idInput.style.borderColor = "black";
  return true;
}
function checkID(form) {
  document.addEventListener("submit", (event) => {
    event.preventDefault();

    let fail = true;
    fail &= upvalidateProductID(form.upproductID.value.trim());

    if (fail) {
      event.target.submit();
    } else {
      return false;
    }
  });
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
