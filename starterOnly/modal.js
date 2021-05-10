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
// DOM added
const modalClose = document.querySelector(".close");
let first = document.getElementById("first");
let last = document.getElementById("last");
let mail = document.getElementById("email");
let birthDate = document.getElementById("birthdate");
let quantity = document.getElementById("quantity");
let checkBox1 = document.getElementById("checkbox1");
let formSubmit = document.getElementById("btn-submit");
// erreurs
let firstMissing = document.getElementById("first_missing");
let lastMissing = document.getElementById("last_missing");
let mailMissing = document.getElementById("mail_missing");
let dateMissing = document.getElementById("birthdate_missing");
let where = document.getElementById("where");
// encadrements
let textNeeded = /^[a-zA-Zéèç-]{2,20}$/;
let mailNeeded = /\S+@\S+\.\S+/;
let dateNeeded = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
// villes
let location1 = document.getElementById("location1");
let location2 = document.getElementById("location2");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// added
// close modal event
modalClose.addEventListener("click", closeModal);
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// bouton submit
formSubmit.addEventListener('click', f_submit);

function f_submit(e){
  if (textNeeded.test(first.value) == false){ //prénom
    e.preventDefault(); // bloque submit
    first.style.border = "3px red solid";
    firstMissing.textContent = "Veuillez entrer 2 lettres ou plus pour votre prénom.";
    firstMissing.style.color = "red";
    firstMissing.style.fontSize = "10px";
  }else{
    first.style.border = "";
    firstMissing.textContent = "";
    
    if (textNeeded.test(last.value) == false){ //nom
      e.preventDefault();
      last.style.border = "3px red solid";
      lastMissing.textContent = "Veuillez entrer 2 lettres ou plus pour votre nom.";
      lastMissing.style.color = "red";
      lastMissing.style.fontSize = "18px";
    }else{
      last.style.border = "";
      lastMissing.textContent = "";
      
      if (mailNeeded.test(mail.value) == false){ //mail
        e.preventDefault();
        mail.style.border = "3px red solid";
        mailMissing.textContent = "Veuillez entrer une adresse valide.";
        mailMissing.style.color = "red";
        mailMissing.style.fontSize = "18px";
      }else{
        mail.style.border = "";
        mailMissing.textContent = "";
        
        if (dateNeeded.test(birthDate.value) == false){ //birthdate
          e.preventDefault();
          birthDate.style.border = "3px red solid";
          dateMissing.textContent = "Veuillez entrer une date valide.";
          dateMissing.style.color = "red";
          dateMissing.style.fontSize = "18px";
        }else{
          birthDate.style.border = "";
          dateMissing.textContent = "";
          
          if (quantity.value != 0){ //tournois
            e.preventDefault(); 
            alert("ville!!");
            if (location1.checked === true){
              alert("check");
              e.preventDefault(); 
              if (checkBox1.checked == false){
                e.preventDefault(); 
                alert("Merci d'accepter les termes et conditions");
              }else{
                alert("Formulaire envoyé!");
              }
            }else{
              e.preventDefault(); 
              first.style.border = "3px red solid";
              where.textContent = "Veuillez selectionner une ville.";
              where.style.color = "red";
              where.style.fontSize = "18px";
              alert("nocheck");
            }
          }else{
            first.style.border = "";
            where.textContent = "";
            
            if (checkBox1.checked == false){ //conditions
              e.preventDefault(); 
              // alert("Merci d'accepter les termes et conditions");
            }else{
              alert("Formulaire envoyé!");
            }
          }
        }
      }
    }
  }
}
// radio_location
document.querySelector("#radio_location").addEventListener('change',function(){
  let town = document.getElementsByName("location");
  for (var i = 0; i < town.length; i++){
    console.log(town[i]);
    console.dir(town[i]);
    if (town[i].checked) break;
  }
  console.log(town[i].value);
  console.log(town[i].checked);
});

// if (formFirst && formLast && formMail && birthDate && ville && checkBox1){
//   alert('active');
// } else {
//   alert('inactive');
// }

// validation prénom
// if (prenom === /^[a-zA-Zéèç]+([-'\s][a-zA-Zéèç]?{2,}$/) {

//désactiver bouton
// formSubmit.disabled = true;
// formSubmit.style.backgroundColor = 'grey';

/*
"Veuillez entrer 2 caractères ou plus pour le champ du nom."
"Vous devez choisir une option."
"Vous devez vérifier que vous acceptez les termes et conditions."
"Vous devez entrer votre date de naissance."
*/