function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground"); // formulaire
const modalBtn = document.querySelectorAll(".modal-btn"); // bouton ouverture du formulaire
// const formData = document.querySelectorAll(".formData"); //non utilisé
const modalBody = document.querySelector(".modal-body"); // modal
const modalClose = document.querySelector(".close"); // bouton fermeture formulaire
// Varriables éléments du formulaire
var validation = document.getElementById("validation"); // bouton validation
var first = document.getElementById("first"); // champ prénom
var last = document.getElementById("last"); // champ nom
var mail = document.getElementById("email"); // champ mail
var birthDate = document.getElementById("birthdate"); // champ date de naissance
var quantity = document.getElementById("quantity"); // champ nombre de participations
var checkBox1 = document.getElementById("checkbox1"); // case conditions d'utilisation
var formSubmit = document.getElementById("btn-submit"); // bouton validation formulaire
var closeSubmit = document.getElementById("btn-close-modal"); // bouton fermeture remerciements
var locations = document.getElementsByName("location"); // radios villes
var radioLocation = document.getElementById("radio_location"); // message de selection des villes
// gestion des messages d'erreurs
var firstMissing = document.getElementById("first_missing"); // zone pour message d'erreur prénom
var lastMissing = document.getElementById("last_missing"); // zone pour message d'erreur nom
var mailMissing = document.getElementById("mail_missing"); // zone pour message d'erreur mail
var dateMissing = document.getElementById("birthdate_missing"); // zone pour message d'erreur date de naissance
var where = document.getElementById("where"); // zone pour message d'erreur ville manquante
var cb1Text = document.getElementById("cb1-text"); // couleur texte conditions
// Regex
let textNeeded = /^[a-zA-Zéèç-]{2,20}$/;  // conditions nom/prénom
let mailNeeded = /\S+@\S+\.\S+/; // conditions @mail
let dateNeeded = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/; // conditions date


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  validation.style.display = "none";
}
// close modal event
modalClose.addEventListener("click", closeModal);
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

//Etat textes en live
//prénom
first.addEventListener('input',function validateFirst(){ // écoute du champ
  if (textNeeded.test(first.value) === false){ // si conditions du regex non remplies
    first.className += " border-error"; // ajout classe pour modification du cadre avec CSS
    firstMissing.textContent = "Veuillez entrer 2 lettres ou plus pour votre prénom."; // ajout message d'erreur
    firstMissing.className = "data-error"; // classe pour modification du texte d'erreur avec CSS
  }else{ // si conditions du regex remplies
    first.className = "text-control"; // retour à la classe d'origine
    firstMissing.textContent = ""; // retrait du message
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
  }
});

// clic du bouton submit
formSubmit.addEventListener('click', f_submit);
// vérification du formulaire
function f_submit(e){ 
  e.preventDefault(); // bloque submit
  // vérification prénoms
  if (textNeeded.test(first.value) === false){
    first.className += " border-error";
    firstMissing.textContent = "Veuillez entrer 2 lettres ou plus pour votre prénom.";
    firstMissing.className = "data-error";
  }else{
    // vérification noms
    if (textNeeded.test(last.value) === false){
      last.className += " border-error";
      lastMissing.textContent = "Veuillez entrer 2 lettres ou plus pour votre nom.";
      lastMissing.className = "data-error";
    }else{
      // vérification mail
      if (mailNeeded.test(mail.value) === false){
        mail.className += " border-error";
        mailMissing.textContent = "Veuillez entrer une adresse valide.";
        mailMissing.className = "data-error";
      }else{
        // vérification date de naissance
        if (dateNeeded.test(birthDate.value) === false){
          birthDate.className += " border-error";
          dateMissing.textContent = "Veuillez entrer une date valide.";
          dateMissing.className = "data-error";
        }else{
          birthDate.className = "text-control";
          dateMissing.textContent = "";
          // vérification du check des conditions
          if (checkBox1.checked !== true){
            // message d'alert pour la case non cochée
            cb1Text.style.color = "#fe142f";
            alert("Merci d'accepter les termes et conditions");
          }else{
            // vérification du nombre de participations
            cb1Text.style.color = "#fff";
            if (quantity.value >= 1){ //tournois
              // vérification de la ville si participation
              checkTownLocation();
            // validé si jamais participé
            }else{
              where.textContent = "";
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

// controle si radio activée
function checkTownLocation() {
  //vérifie les boutons radio
  for(var i = 0; i < locations.length; i++) {
    if(locations[i].type == 'radio') {
      var checkbox = locations[i];
      // si radio active, validation
      if(checkbox.checked) {
        // console.log(checkbox.value + " is checked");
        where.textContent = "";
        validation.style.display = "block";
        modalBody.style.display = "none";
      } else {
        // console.log(checkbox.value + " not checked");
        radioLocation.className += " border-error";
        where.textContent = "Veuillez selectionner une ville.";
        where.className = "data-error";
      }
    }
  }
};

// Ferme le message de remerciement (formulaire)
closeSubmit.addEventListener("click",function () {
  modalBody.style.display = "block";
  modalbg.style.display = "none";
});