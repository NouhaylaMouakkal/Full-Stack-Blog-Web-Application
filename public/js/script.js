$(document).ready(function(){
  $("a#signup_btn").show();
    $('a#login_btn').show();
  $("div#login").hide();
  $("div#signup").hide();
})
// Display login
$(document).ready(function() {
  $("a.login").click(function() {
    $("div#signup").hide();
    $("div#login").show();

  });
});
$(document).ready(function(){
  $('a#login_btn').click(function(){
    $("a#signup_btn").hide();
    $('a#login_btn').hide();
    $("div#signup").hide();
    $("div#login").show();
  })
})
// Display signup
$(document).ready(function() {
  $("a.signup").click(function() {
    $("div#login").hide();
    $("div#signup").show();
  });
});
$(document).ready(function(){
  $("a#signup_btn").click(function(){
    $("a#signup_btn").hide();
    $('a#login_btn').hide();
    $("div#login").hide();
    $("div#signup").show();
  })
})

// Display home
$(document).ready(function() {
  $(".HomePage").click(function() {
    $("div#login").hide();
    $("div#signup").hide();
  });
});
// Switching from signup to login 
$(document).ready(function() {
  $("a.Is_exist").click(function() {
    $("div#signup").hide();
    $("div#login").show();
  });
});
// Switching from login to signup 
$(document).ready(function() {
  $("a.Not_exist").click(function() {
    $("div#login").hide();
    $("div#signup").show();
  });
});



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
        alert("Utilisateur ajouté avec succès :", response);
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
              window.location.href = "author.html";
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

//------------------------------------------------------

// ===================================================================================================================================
// Changing the mode from light to dark or vice versa
const button = document.getElementById('changecolor');
const body = document.body;
button.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    document.querySelector(".changecolor").classList.remove("dark");
    body.classList.add('light');
    document.querySelector(".changecolor").classList.add("light");
  } else {
    body.classList.remove('light');
    document.querySelector(".changecolor").classList.remove("light");
    body.classList.add('dark');
    document.querySelector(".changecolor").classList.add("dark");

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





////////////////////////////////////////////////////









// Fonction pour effectuer et mettre à jour le contenu de la page
function loadArticles(take, skip) {
  $.ajax({
    url: 'http://localhost:3000/articles/', 
    data: { take: take, skip: skip },
    dataType: 'json',
    success: function (articles) {
      if (skip === 0)     $('#articles-list').empty();
      
      // Ajouter les nouveaux articles
      articles.forEach(function (article) {
        var listItem = $('<li>').text(article.title);
        $('#articles-list').append(listItem);
      });

      // Ajouter un bouton "Charger plus" si le nombre d'articles chargés est inférieur à take
      if (articles.length < take)   $('#load-more-button').hide();
      else     $('#load-more-button').show();
    },
    error: function (xhr, status, error) {
      console.error(error);
    }});}
// Gérer le clic sur le bouton "Charger plus"
$('#load-more-button').on('click', function () {
  //récupérer les valuers actuelles de take et skip
  var currentTake = parseInt($(this).data('take')); 
  var skip = parseInt($(this).data('skip')); 

  var newTake = currentTake + 10; 
  $(this).data('take', newTake); // Mettre à jour la valeur de take dans les attributs de données du bouton
  loadArticles(newTake, skip); 
});


///////////////////////////// FONCTION & PROMISES ////////////////////////////////////
//Articles
function getArticles(take = 10, skip = 0) {
  return fetch(`/articles?take=${take}&skip=${skip}`)
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
}

function getArticle(id) {
  return fetch(`/articles/${id}`)
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
}

function postArticle(article) {
  return fetch('/articles', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error));
}

function updateArticle(id, article) {
  return fetch(`/articles/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error));
}

function deleteArticle(id) {
  return fetch(`/articles/${id}`, {
      method: 'DELETE',
  })
  .then(response => response.status)
  .catch(error => console.error('Error:', error));
}
// Commentaires
function getCommentaires(take = 10, skip = 0) {
  return fetch(`/commentaires?take=${take}&skip=${skip}`)
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
}

function getCommentaire(id) {
  return fetch(`/commentaires/${id}`)
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
}

function postCommentaire(commentaire) {
  return fetch('/commentaires', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentaire),
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error));
}

function updateCommentaire(id, commentaire) {
  return fetch(`/commentaires/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentaire),
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error));
}

function deleteCommentaire(id) {
  return fetch(`/commentaires/${id}`, {
      method: 'DELETE',
  })
  .then(response => response.status)
  .catch(error => console.error('Error:', error));
}

// Categories
function getCategories(take = 10, skip = 0) {
  return fetch(`/categories?take=${take}&skip=${skip}`)
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
}
function getCategorie(id) {
  return fetch(`/categories/${id}`)
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
}

function postCategorie(categorie) {
  return fetch('/categories', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(categorie),
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error));
}

function updateCategorie(id, categorie) {
  return fetch(`/categories/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(categorie),
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error));
}

function deleteCategorie(id) {
  return fetch(`/categories/${id}`, {
      method: 'DELETE',
  })
  .then(response => response.status)
  .catch(error => console.error('Error:', error));
}

// Users
function getUsers(take = 10, skip = 0) {
  return fetch(`/users?take=${take}&skip=${skip}`)
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
}

function getUser(id) {
  return fetch(`/users/${id}`)
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
}

function postUser(user) {
  return fetch('/users', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error));
}

function updateUser(id, user) {
  return fetch(`/users/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error));
}

function deleteUser(id) {
  return fetch(`/users/${id}`, {
      method: 'DELETE',
  })
  .then(response => response.status)
  .catch(error => console.error('Error:', error));
}