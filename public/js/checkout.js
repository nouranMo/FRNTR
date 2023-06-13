function validate(form) {
    document.addEventListener('submit', event => {
event.preventDefault();

let fail = true;
fail = fail && validateFirstName(form.firstname.value.trim());
fail = fail && validateLastName(form.lastname.value.trim());
fail = fail && validateEmail(form.email.value.trim());
fail = fail && validateAddress(form.address.value.trim());
fail = fail && validateAddress2(form.address2.value.trim());
fail = fail && validateCity(form.city.value.trim());
fail = fail && validatePhone(form.phone.value.trim());

if (fail) {
  event.target.submit();
} else {
  return false;
}
});
  }
function validateFirstName(value) {
const errorElement = document.getElementById('fnameError');
if (value === '') {
  errorElement.innerHTML = 'First Name is required';
  return false;
}
errorElement.innerHTML = '';
return true;
}

function validateLastName(value) {
const errorElement = document.getElementById('lnameError');
if (value === '') {
  errorElement.innerHTML = 'Last Name is required';
  return false;
}
errorElement.innerHTML = '';
return true;
}

function validateEmail(value) {
const errorElement = document.getElementById('emailError');
if (value === '') {
  errorElement.innerHTML = 'Email is required';
  return false;
}
// Add additional email validation logic if needed
errorElement.innerHTML = '';
return true;
}

function validateAddress(value) {
const errorElement = document.getElementById('addressError');
if (value === '') {
  errorElement.innerHTML = 'Address is required';
  return false;
}
errorElement.innerHTML = '';
return true;
}

function validateAddress2(value) {
const errorElement = document.getElementById('address2Error');
if (value === '') {
  errorElement.innerHTML = 'Address2 is required';
  return false;
}
errorElement.innerHTML = '';
return true;
}

function validateCity(value) {
const errorElement = document.getElementById('cityError');
if (value === '') {
  errorElement.innerHTML = 'City is required';
  return false;
}
errorElement.innerHTML = '';
return true;
}

function validatePhone(value) {
const errorElement = document.getElementById('phoneError');
if (value === '') {
  errorElement.innerHTML = 'Phone is required';
  return false;
}
// Add additional phone number validation logic if needed
errorElement.innerHTML = '';
return true;
}
