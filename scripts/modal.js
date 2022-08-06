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

//Verification form
function checkEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

function validate() {
  var firstName = document.forms["reserve"]["first"];
  var lastName = document.forms["reserve"]["last"];
  var email = document.forms["reserve"]["email"];
  //vérification de la date
  var date_regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  //Invers format yyyy-mm-dd to dd-mm-yyyy
  var birthdate = document.forms["reserve"]["birthdate"].value.split("-").reverse().join("-");
  var quantity = document.forms["reserve"]["quantity"];
  var location = document.forms["reserve"]["location"];

  console.log("Le prénom:")
  console.log(firstName.value);
  console.log("Le nom:")
  console.log(lastName.value);
  console.log("L'email':")
  console.log(email.value);
  console.log("La date d'anniversaire:")
  console.log(birthdate);
  console.log("Le nombre de concours participé:")
  console.log(quantity.value);
  console.log("Le lieu:")
  console.log(location.value);

  if (firstName.value == "" && firstName.value.length < 3) {
    alert("Le champ Prénom a un minimum de 2 caractères / n'est pas vide.");
    firstName.focus();
    return false;
  }

  if (lastName.value == "" && lastName.value.length < 3) {
    alert("Le champ Nom a un minimum de 2 caractères / n'est pas vide.");
    lastName.focus();
    return false;
  }

  if (checkEmail(email.value)) {
  } else {
    alert('Adresse e-mail non valide');
    email.focus();
    return false;
  }

  if (date_regex.test(birthdate)) {
  } else {
    alert("Date non valide");
    return false;
  }

  if (quantity.value == "" || isNaN(quantity.value) || quantity.value <= 0 || quantity.value > 100) {
    alert("Veuillez rentrer un nombre valide et de préférence entre 0 et 99");
    quantity.focus();
    return false;
  }

  if (location.value == ""){
    alert("Veuillez sélectionner unn lieu !");
    return false;
  }
  
  if (document.getElementById("checkbox1").checked == false)
	{
		alert('Veuillez coché la case svp !');
    return false;
	}

  alert("Tout est ok !");

  return true;
}
