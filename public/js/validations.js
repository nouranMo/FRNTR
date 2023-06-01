//sidebars
function signOpen(user) {
  if(user){
    document.getElementById("sidebar-1").style.display = "block";
  }else{
    window.location.href = `auth/account`
  }
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

  function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("chat-button").style.display="none";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("chat-button").style.display="block";
  }

  //
  function filterOn() {
    document.getElementById("filter-button1").style.display = "block";
  }
  
  function filterClose() {
    document.getElementById("filter-button1").style.display = "none";
  }
  

  function validateFirstName(field) {
    if (field == "") {
      document.getElementById("first").innerHTML =
        "You must enter your first name !";
      document.getElementById("fir").style.borderColor = "red";
      return false;
    } else {
      document.getElementById("first").innerHTML = "";
      document.getElementById("fir").style.borderColor = "black";
      return true;
    }
  }
  
  function validateLastName(field) {
    if (field == "") {
      document.getElementById("last").innerHTML =
        "You must enter your Last name !";
      document.getElementById("las").style.borderColor = "red";
      return false;
    } else {
      document.getElementById("last").innerHTML = "";
      document.getElementById("las").style.borderColor = "black";
      return true;
    }
  }
  
  function validatePassword(field1, field2) {
    let valid = true;
    if (field1 == "") {
      document.getElementById("pas").innerHTML = "You must enter a password !";
      document.getElementById("pa").style.borderColor = "red";
      document.getElementById("pac").style.borderColor = "red";
  
      valid = false;
    } else if (field1.length < 8) {
      document.getElementById("pas").innerHTML =
        "Password must be at least 8 characters !";
      document.getElementById("pa").style.borderColor = "red";
    } else {
      document.getElementById("pas").innerHTML = "";
      document.getElementById("pa").style.borderColor = "black";
    }
    if (field1 != field2) {
      document.getElementById("con").innerHTML = "Password does not match !";
      document.getElementById("pac").style.borderColor = "red";
      valid = false;
    } else {
      document.getElementById("con").innerHTML = "";
      document.getElementById("pac").style.borderColor = "black";
    }
    return valid;
  }
  
  function validateEmail(email) {
    if (email == "") {
      document.getElementById("em").innerHTML = "You must enter your email !";
      document.getElementById("ema").style.borderColor = "red";
      valid = false;
    } else {
      document.getElementById("em").innerHTML = "";
      document.getElementById("ema").style.borderColor = "black";
    }
    let regular_expressions =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regular_expressions.test(String(email).toLocaleLowerCase());
  }
  
  function validatePassword1(field1, field2) {
    let valid = true;
    if (field1 == "") {
      document.getElementById("passwor").innerHTML =
        "You must enter a password !";
      document.getElementById("pas1").style.borderColor = "red";
      valid = false;
    } else if (field1.length < 8) {
      document.getElementById("passwor").innerHTML =
        "Password must be at least 8 characters !";
      document.getElementById("pas1").style.borderColor = "red";
    }else {
      document.getElementById("passwor").innerHTML = "";
      document.getElementById("pas1").style.borderColor = "black";
    }
    return valid;
  }
  
  function validate(form) {
    document.addEventListener('submit', event => {
      event.preventDefault();
    
    let fail = true;
    fail &= validateFirstName(form.Firstname.value.trim());
    fail &= validateLastName(form.last.value.trim());
    fail &= validateEmail(form.email.value.trim());
    fail &= validatePassword(form.pas.value, form.pasconfirm.value);
    if (fail) {
      event.target.submit();
    }
    else {
      return false;

    }
  })
  }
  
  function validateEmail1(email) {
    console.log(email);
    if (email == "") {
      document.getElementById("em1").innerHTML = "You must enter your email !";
      document.getElementById("ema1").style.borderColor = "red";
      valid = false;
    } else {
      document.getElementById("em1").innerHTML = "";
      document.getElementById("ema1").style.borderColor = "black";
    }
    let regular_expressions =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regular_expressions.test(String(email).toLocaleLowerCase());
  }
  
  function openforgotsidebar() {
    document.getElementById("forgotsidebar").style.display = "block";
    document.getElementById("sidebar-1").style.display = "none";
  }
  
  function forgotclose() {
    document.getElementById("forgotsidebar").style.display = "none";
  }
  
  function backtosidebar() {
    document.getElementById("forgotsidebar").style.display = "none";
    document.getElementById("sidebar-1").style.display = "block";
  }
  
  function validate1(form) {
    let fail = true;
    fail &= validateEmail1(form.email.value.trim());
    fail &= validatePassword1(form.pas.value, form.email.value.trim());
    if (fail) return true;
    else {
      return false;
    }
  }