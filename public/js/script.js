$(document).ready(function(){
  $("div#page2").hide();
})
// Display login
$(document).ready(function() {
  $("a.login").click(function() {
    $("div#signup").hide();
    $("div#HomePage").hide();
    $("div#login").show();

  });
});
// Display signup
$(document).ready(function() {
  $("a.signup").click(function() {
    $("div#login").hide();
    $("div#HomePage").hide();
    $("div#signup").show();
  });
});
// Display home
$(document).ready(function() {
  $(".logo").click(function() {
    $("div#login").hide();
    $("div#signup").hide();
  });
});
// Switching from signup to login or vice versa
$(document).ready(function() {
  $("a.Is_exist").click(function() {
    $("div#signup").hide();
    $("div#login").show();
  });
});
// Switching from login to signup or vice versa
$(document).ready(function() {
  $("a.Not_exist").click(function() {
    $("div#login").hide();
    $("div#signup").show();
  });
});
//Articles 
$(document).ready(function(){
  $("a.contact").click(function(){
    $("div#page1").hide();
    $("div#page2").show();
  })
})
//Log out
$(document).ready(function(){
  $("i.logout").click(function(){
    $("div#page2").hide();
    $("div#page1").show();
  })
})
//sign up
$(document).ready(function() {
  $("#signup_form").submit(function(event) {
    event.preventDefault(); 
    var nom = $("#nom_signup").val();
    var email = $("#email_signup").val();
    var password = $("#password_signup").val();
    // Création de l'objet de données JSON à envoyer
    var utilisateur = {
      nom: nom,
      email: email,
      password: password,
      role: "AUTHOR"
    };
    // Envoi de la requête POST avec les données JSON
    $.ajax({
      url: "http://localhost:3000/users",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(utilisateur),
      success: function(response) {
        console.log("Utilisateur ajouté avec succès :", response);
      },
      error: function(xhr, status, error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
      }
    });
  });
});
//Login
document.getElementById("login_form").addEventListener("submit", function(event) {
  event.preventDefault(); // Empêche la soumission du formulaire

  // Récupération des valeurs des champs du formulaire
  const email_lf = document.querySelector("input[name='email']").value;
  const password_lf = document.querySelector("input[name='password']").value;

  // Envoi de la requête GET pour vérifier l'existence de l'e-mail dans la base de données
  fetch("http://localhost:3000/login/" + email_lf)
    .then(response => response.json())
    .then(data => {
      if (data) {
        // L'e-mail existe dans la base de données, vérifier le mot de passe
        if (data.password === password_lf) {
          // Les informations d'identification sont correctes, redirection vers la page "author.html"
            if(data.role ==="AUTHOR"){
              window.location.href = "autheur.html";
            }
            else if(data.role ==="ADMIN")
              window.location.href="admin.html"
        } else {
          // Mot de passe incorrect, afficher un message d'erreur
          alert("Mot de passe incorrect");
        }
      } else {
        // L'e-mail n'existe pas dans la base de données, afficher un message d'erreur
        alert("E-mail invalide");
      }
    })
    .catch(error => {
      console.error("Erreur lors de la vérification des informations d'identification :", error);
    });
});
// Changing the mode from light to dark or vice versa
const button = document.getElementById('changecolor');
const body = document.body;
button.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    body.classList.add('light');
  } else {
    body.classList.remove('light');
    body.classList.add('dark');
  }
});

// Switch icon with the mode
const moonIcon = document.querySelector(".bi-moon");
const lightIcon = document.querySelector(".bi-brightness-high");

changecolor.addEventListener("click", () => {
  if (moonIcon.style.display !== "none") {
    moonIcon.style.display = "none";
    lightIcon.style.display = "inline-block";
  } else {
    moonIcon.style.display = "inline-block";
    lightIcon.style.display = "none";
  }
});


// ADMIN SIDE 
// Utilisez l'URL appropriée pour récupérer les statistiques depuis votre backend
var statisticsURL = "http://localhost:3000/countAll/";
    
$(document).ready(function() {
    // Effectuer une requête AJAX pour récupérer les statistiques
    $.ajax({
        url: statisticsURL,
        method: "GET",
        success: function(data) {
            // Mettre à jour les valeurs affichées avec les données reçues
            $("#articleCount").html('<h3>Articles</h3><h4 class="display-4"><i class="bi bi-newspaper stat_icon"></i> ' + data.AllArticles + '</h4>');
            $("#userCount").html('<h3>Users</h3><h4 class="display-4"><i class="bi bi-people stat_icon"></i> ' + data.AllUsers + '</h4>');
            $("#commentCount").html('<h3>Comments</h3><h4 class="display-4"><i class="bi bi-chat-dots stat_icon"></i> ' + data.AllComments + '</h4>');
            $("#categoryCount").html('<h3>Categories</h3><h4 class="display-4"><i class="bi bi-grid stat_icon"></i> ' + data.AllCategories + '</h4>');
        },
        error: function() {
            // Gérer les erreurs de récupération des statistiques
            $("#statistics").text("Erreur lors du chargement des statistiques");
        }
    });
});