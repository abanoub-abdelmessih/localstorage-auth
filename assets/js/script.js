// REGISTRATION FUNCTION
var registerForm = document.getElementById("registerForm");
var localStorageUsers = JSON.parse(localStorage.getItem("users")) || [];

if (registerForm) {
  registerForm.addEventListener("submit", registration);
}
function registration(e) {
  e.preventDefault();

  // get registration inputs
  var nameInput = document.getElementById("registerUsername");
  var emailInput = document.getElementById("registerEmail");
  var passwordInput = document.getElementById("registerPassword");

  // to rest inputs after registration
  var name = nameInput.value.trim();
  var email = emailInput.value.trim();
  var password = passwordInput.value.trim();

  if (!name || !email | password) {
    alert("enter valid data");
    return;
  }

  //  to check if the email is already existed
  var existingEmail = false;
  for (var i = 0; i < localStorageUsers.length; i++) {
    if (localStorageUsers[i].email === email) {
      existingEmail = true;
      break;
    }
  }

  if (existingEmail) {
    alert("this email is already registered please login");
    window.location.href = "index.html";
    return;
  }

  //   add the new user to the array then save it in localstorage
  var user = { name, email, password };
  localStorageUsers.push(user);
  localStorage.setItem("users", JSON.stringify(localStorageUsers));
  alert("Registration successful you will be redirected to the login page");

  //   reset inputs
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";

  window.location.href = "index.html";
}

// LOGIN FUNCTION
var loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", login);
}
function login(e) {
  e.preventDefault();

  // get login inputs
  var emailInput = document.getElementById("loginEmail");
  var passwordInput = document.getElementById("loginPassword");

  // to rest inputs after login
  var email = emailInput.value.trim();
  var password = passwordInput.value.trim();

  if (!email | password) {
    alert("enter valid data");
    return;
  }
  var foundUser = null;

  for (var i = 0; i < localStorageUsers.length; i++) {
    if (
      localStorageUsers[i].email === email &&
      localStorageUsers[i].password === password
    ) {
      foundUser = localStorageUsers[i];
      break;
    }
  }

  if (foundUser) {
    alert("Login successful");
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    window.location.href = "home.html";
  } else {
    alert("Incorrect email or password");
  }
}
