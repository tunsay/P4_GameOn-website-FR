function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".close");
const form = document.querySelector('form');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
modalClose.forEach((btn) => btn.addEventListener("click", close));

//close modal event while press x
function close() {
  modalbg.style.display = "none";
}

// form data elements
var firstName = document.forms["reserve"]["first"];
var lastName = document.forms["reserve"]["last"];
var email = document.forms["reserve"]["email"];
var birthdate = document.forms["reserve"]["birthdate"];
var quantity = document.forms["reserve"]["quantity"];
var conditions = document.forms["reserve"]["checkbox1"];

//error messages
const errorMessages = {
  firstNameError: "Vous devez entrer 2 caractères ou plus.",
  lastNameError: "Vous devez entrer 2 caractères ou plus.",
  emailError: "L'adresse email est invalide.",
  birthdateError: "La date de naissance est invalide.",
  quantityError: "Veuillez entrer un nombre valide entre 0 et 99.",
  locationError: "Vous devez sélectionner une ville.",
  conditionsError: "Vous devez accepter les conditions d'utilisations."
};


// checks first name & returns true if not empty and has 2 or more characters
function firstNameValid() {
  let nameInput = firstName.value;
  return nameInput !== null && nameInput.length >= 2;
}

// checks last name & returns true if not empty and has 2 or more characters
function lastNameValid() {
  let lastNameInput = lastName.value;
  return lastNameInput !== null && lastNameInput.length >= 2;
}

//checks for correct email format
function emailValid() {
  let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let emailInput = email.value;
  if (emailInput.match(regexEmail)) return true;
}

// checks that only numbers between 0 and 99 are entered
function quantityValid() {
  if (quantity.value !== '' && quantity.value >= 0 && quantity.value <= 99)
    return true;
}

//checks for correct birthdate
function birthdateValid() {
  let regexBirthdate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  return regexBirthdate.test(birthdate.value);
}

// checks that a location has been selected
function locationValid() {
  // gets all radio inputs
  let radioButtons = document.forms["reserve"]["location"];
  // loops through all radio inputs, returns true if one is checked
  for (let radio of radioButtons) {
    if (radio.checked === true) return true;
  }
}

// checks that the required box is checked
function conditionsValid() {
  return conditions.checked;
}



// displays error message when field is invalid
function isInvalid(i, message) {
  formData[i].setAttribute("data-error-visible", "true");
  formData[i].setAttribute("data-error", message);
}

// removes error message on valid fields
function isValid() {
  let invalidInput = document.querySelectorAll('.formData[data-error-visible="true"]');
  for (let input of invalidInput) {
    input.setAttribute("data-error-visible", "false");
    input.setAttribute("data-error", "");
  }
}



form.addEventListener('submit', function (e) {
  e.preventDefault();
  // validate();
});

// checks every field, displays error message when invalid
function validate() {
  let formValid = true;
  // clear the ancient message error
  isValid();
  if (!firstNameValid()) {
    isInvalid(0, errorMessages.firstNameError);
    formValid = false;
  }
  if (!lastNameValid()) {
    formValid = false;
    isInvalid(1, errorMessages.lastNameError);
  }
  if (!emailValid()) {
    formValid = false;
    isInvalid(2, errorMessages.emailError);
  }
  if (!birthdateValid()) {
    formValid = false;
    isInvalid(3, errorMessages.birthdateError);
  }
  if (!quantityValid()) {
    formValid = false;
    isInvalid(4, errorMessages.quantityError);
  }
  if (!locationValid()) {
    formValid = false;
    isInvalid(5, errorMessages.locationError);
  }
  if (!conditionsValid()) {
    formValid = false;
    isInvalid(6, errorMessages.conditionsError);
  }
  if (formValid) {
    console.log(firstName.value);
    alert("Tout est ok !");
    close();
  }
}


