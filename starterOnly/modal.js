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
const modalBody = document.querySelector(".modal-body");
const modalClose = document.querySelector(".close");
let validation = document.getElementById("validation");
let first = document.getElementById("first");
let last = document.getElementById("last");
let mail = document.getElementById("email");
let birthDate = document.getElementById("birthdate");
let quantity = document.getElementById("quantity");
let checkBox1 = document.getElementById("checkbox1");
let formSubmit = document.getElementById("btn-submit");
let closeSubmit = document.getElementById("btn-close-modal");
// erreurs
let firstMissing = document.getElementById("first_missing");
let lastMissing = document.getElementById("last_missing");
let mailMissing = document.getElementById("mail_missing");
let dateMissing = document.getElementById("birthdate_missing");
let where = document.getElementById("where");
let radioLocation = document.getElementById("radio_location");
// encadrements
let textNeeded = /^[a-zA-Zéèç-]{2,20}$/;
let mailNeeded = /\S+@\S+\.\S+/;
let dateNeeded = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
// villes
var locations = document.getElementsByName("location");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  validation.style.display = "none";
}

// added
// close modal event
modalClose.addEventListener("click", closeModal);
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

//Etat textes en live
//prénom
first.addEventListener('input',function validateFirst(){
  if (textNeeded.test(first.value) === false){ 
    first.className += " border-error";
    firstMissing.textContent = "Veuillez entrer 2 lettres ou plus pour votre prénom.";
    firstMissing.className = "data-error";
  }else{
    first.className = "text-control";
    firstMissing.textContent = "";
    return true;
  }
});
//nom
last.addEventListener('input',function validateLast(){
  if (textNeeded.test(last.value) === false){ 
    last.className += " border-error";
    firstMissing.className = "data-error";
    lastMissing.textContent = "Veuillez entrer 2 lettres ou plus pour votre nom.";
    lastMissing.className = "data-error";
  }else{
    last.className = "text-control";
    lastMissing.textContent = "";
    return true;
  }
});
//mail
mail.addEventListener('input',function validateMail(){
  if (mailNeeded.test(mail.value) === false){ 
    mail.className += " border-error";
    mailMissing.textContent = "Veuillez entrer une adresse valide.";
    mailMissing.className = "data-error";
  }else{
    mail.className = "text-control";
    mailMissing.textContent = "";
    return true;
  }
});


// // villes checked
// document.querySelector("#radio_location").addEventListener('change',function townLoc(){
//   for (var i = 0; i < locations.length; i++){
//     if (locations[i].checked) 
//     break;
//   }
//   var town = locations[i];
//   console.log(town);
//   console.dir(town);
//   return town;
// });
// // town();
// console.log(townLoc());
// console.dir(townLoc());

var radioChecked = false;

// clic du bouton submit
formSubmit.addEventListener('click', f_submit);

function f_submit(e){
  if (textNeeded.test(first.value) === false){ 
    e.preventDefault();
    first.className += " border-error";
    firstMissing.textContent = "Veuillez entrer 2 lettres ou plus pour votre prénom.";
    firstMissing.className = "data-error";
  }else{
    if (textNeeded.test(last.value) === false){
      e.preventDefault(); 
      last.className += " border-error";
      firstMissing.className = "data-error";
      lastMissing.textContent = "Veuillez entrer 2 lettres ou plus pour votre nom.";
      lastMissing.className = "data-error";
    }else{
      if (mailNeeded.test(mail.value) === false){
        e.preventDefault(); // bloque submit
        mail.className += " border-error";
        mailMissing.textContent = "Veuillez entrer une adresse valide.";
        mailMissing.className = "data-error";
      }else{
        if (dateNeeded.test(birthDate.value) === false){ //birthdate
          e.preventDefault();
          birthDate.className += " border-error";
          dateMissing.textContent = "Veuillez entrer une date valide.";
          dateMissing.className = "data-error";
        }else{
          birthDate.className = "text-control";
          dateMissing.textContent = "";
          if (checkBox1.checked !== true){ //conditions
            e.preventDefault();
            alert("Merci d'accepter les termes et conditions");
          }else{
            if (quantity.value >= 1){ //tournois
              e.preventDefault();
              checkTownLocation();
              // if (radioChecked === true){
              //   where.textContent = "";
              //   e.preventDefault();
              //   // close modal form
              //   validation.style.display = "block";
              //   modalBody.style.display = "none";
              // }else{
              //   e.preventDefault();
              //   radioLocation.className += " border-error";
              //   where.textContent = "Veuillez selectionner une ville.";
              //   where.className = "data-error";
              // }
            }else{
              where.textContent = "";
              e.preventDefault();
              // close modal form
              validation.style.display = "block";
              modalBody.style.display = "none";
            }
          }
        }
      }
    }
  }
}

// close submit event
closeSubmit.addEventListener("click",function () {
  modalBody.style.display = "block";
  modalbg.style.display = "none";
});

// villes checked
function checkTownLocation() {
  var checkboxes = document.getElementsByClassName('checkbox-input');
  console.log(checkboxes);
  for(var i = 0; i < checkboxes.length; i++) {
    if(checkboxes[i].type == 'radio') {
      var checkbox = checkboxes[i];
      if(checkbox.checked) {
        console.log(checkbox.value + " is checked");
        where.textContent = "";
        validation.style.display = "block";
        modalBody.style.display = "none";
      } else {
        console.log(checkbox.value + " not checked");
        radioLocation.className += " border-error";
        where.textContent = "Veuillez selectionner une ville.";
        where.className = "data-error";
      }
    }
  }
};