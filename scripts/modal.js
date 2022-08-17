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
const modalClose = document.querySelectorAll(".close"); //Select all crosses in the modal
const formElement = document.querySelector('form'); //Select the form (name=reserve)
const modalConfirm = document.querySelector('.modal-confirm'); //Select the modal after confirmation
const modalConfirmClose = document.querySelector('.modal-confirm-btn'); //Select the "Close" button

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

// displays confimation message on valid form submit
function confirmationOpen() {
  modalConfirm.style.display = "flex";
  modalbg.style.display = "none";
}

//closes confirmation window
modalConfirmClose.addEventListener('click', () => {
  modalConfirm.style.display = "none";
})

// form data elements (field)
var firstName = document.forms["reserve"]["first"];
var lastName = document.forms["reserve"]["last"];
var email = document.forms["reserve"]["email"];
var birthdate = document.forms["reserve"]["birthdate"];
var quantity = document.forms["reserve"]["quantity"];
var userLocation = { name: 'location', data: document.forms["reserve"]["location"] }
var conditions = document.forms["reserve"]["checkbox1"];

let form = [firstName, lastName, email, birthdate, quantity, userLocation, conditions]

//object
const fieldsValidators = {
  first: {
    constraints: ['required', 'letter', 'min:2', 'max:50'],
  },
  last: {
    constraints: ['required', 'letter', 'min:2', 'max:50'],
  },
  email: {
    constraints: ['required', 'mailRegex', 'max:50'],
  },
  birthdate: {
    constraints: ['required', 'birthdateRegex'],
  },
  quantity: {
    constraints: ['required', 'number'],
  },
  location: {
    constraints: ['radioRequired']
  },
  checkbox1: {
    constraints: ['check'],
  },
}

console.log(fieldsValidators);

formElement.addEventListener('submit', function (e) {
  e.preventDefault();
  validateFields(form); //[firstName, lastName, email, birthdate, quantity, conditions]
});

let isValidate = true;

// This function will check each field
function validateFields(fields) { //[firstName, lastName, email, birthdate, quantity, conditions]
  isValidate = true
  fields.forEach(field => { //For each Field
    validateFieldConstraints(field, fieldsValidators[field.name].constraints);
  });
  if (isValidate) {
    confirmationOpen();
    resetForm();
  }

}

// Checks the constraints of each field
function validateFieldConstraints(field, validators) { //{firstName, .constraints['required', 'letter', 'min:2', 'max:50']}
  for (const validator of validators) {
    let error = ""
    let minMax = 0
    let newValidator = validator

    if (validator.indexOf(":") > -1) {
      newValidator = validator.split(":")[0]
      minMax = validator.split(":")[1]
    }

    switch (newValidator) {
      case 'required':
        error = checkRequired(field)
        break
      case 'number':
        error = checkNumber(field)
        break
      case 'letter':
        error = checkLetter(field)
        break
      case 'min':
        error = checkMin(field, minMax)
        break
      case 'mailRegex':
        error = checkMailRegex(field)
        break
      case 'birthdateRegex':
        error = checkBirthdateRegex(field)
        break
      case 'max':
        error = checkMax(field, minMax)
        break
      case 'check':
        error = checkConditions(field)
        break
      case 'radioRequired':
        error = checkRadio(field)
        break
    }
    if (error) {
      isValidate = false;
      if (field.data) {
        field.data[0].parentElement.setAttribute("data-error-visible", "true");
        field.data[0].parentElement.setAttribute("data-error", error);
        break
      }
      field.parentElement.setAttribute("data-error-visible", "true");
      field.parentElement.setAttribute("data-error", error);
      break
    }
    else {
      if (field.data) {
        field.data[0].parentElement.setAttribute("data-error-visible", "false");
        field.data[0].parentElement.setAttribute("data-error", "");
      } else {
        field.parentElement.setAttribute("data-error-visible", "false");
        field.parentElement.setAttribute("data-error", "");
      }
    }
  }

}

//REGEX Verification
let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let regexLetter = /^[a-zA-Z]+$/i;
let regexBirthdate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

//Each function check each field
function checkRequired(field) {
  if (field.value == "")
    return "Le champ ne doit pas être vide !"
}

//Check the minimum number of characters in a string
function checkMin(field, min) {
  if (field.value.match(regexLetter) && field.value.length <= min) {
    return "Vous devez entrer " + min + " caractères ou plus !"
  }
}

//Check the minimum number of characters in a string
function checkMax(field, max) {
  if (field.value.match(regexLetter) && field.value.length >= max) {
    return "Vous devez entrer " + max + " caractères ou moins !"
  }
}

// Check mail verification by Regex
function checkMailRegex(field) {
  let emailInput = field.value;
  if (!emailInput.match(regexEmail)) {
    return "Ceci n'est pas un mail valide !";
  }
}

// Check birthdate verification by Regex
function checkBirthdateRegex(field) {
  let birthdateInput = field.value;
  if (!birthdateInput.match(regexBirthdate)) {
    return "Ce n'est pas une date valide !";
  }
}

// Check if it's a number
function checkNumber(field) {
  if (!isNaN(field)) {
    return "Ceci n'est pas un numéro !"
  }
  let MathSign = Math.sign(field.value) //return -1 if negative, 1 if positive, 0 if null
  if (MathSign == -1) {
    return "Le numéro doit être positif !"
  }
}

// Checks if it is only composed of letters
function checkLetter(field) {
  if (!field.value.match(regexLetter)) {
    return "Veuillez entrer des lettres !"
  }
}

// Checks if he has checked at least one place
function checkRadio(field) {
  let isChecked = false;
  for (const element of field.data) {
    if (element.checked) {
      isChecked = true
    }
  }
  if (isChecked == false) {
    return "Tu dois sélectionner au moins un endroit !"
  }
}

// Checks if he has accepted the terms of use
function checkConditions(field) {
  if (!field.checked) {
    return "Il faut accepter les conditions d'utilisations  !"
  };
}

//reset Form
function resetForm() {
  formElement.reset();
}
