$(document).ready(function() {
  $("#author").hide();
  $("#admin").hide();
  $("div#login").hide();
  $("div#signup").hide();
});

// Display login
$(document).ready(function() {
  $("a.login").click(function() {
    $("div#signup").hide();
    $("div#login").show();
  });
});

// Display signup
$(document).ready(function() {
  $("a.signup").click(function() {
    $("div#login").hide();
    $("div#signup").show();
  });
});

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

// Sign up
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

// Login
document.getElementById("login_form").addEventListener("submit", function(event) {
  event.preventDefault(); // Empêche la soumission du formulaire
  // Récupération des valeurs des champs du formulaire
  const email_lf = document.querySelector("input[name='email']").value;
  const password_lf = document.querySelector("input[name='password']").value;
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email_lf,
      password: password_lf
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        const token = data.token;
        const role = data.role;
        const getUserId = data.id;
        if (role === "AUTHOR") {
          $(document).ready(function() {
            $("#mainPage").hide();
            $("#admin").hide();
            $("#author").show();
          });
          document.body.classList.add("body_author");
          // Affichage  du profile
          $(document).ready(function() {
            $("#my-articles-content").hide();
            $("#post-box").hide();
            $("#articles").show();
          });
          $(document).ready(function() {
            $("a.myarticles").click(function() {
              $("#articles").hide();
              $("#post-box").hide();
              $("#my-articles-content").show();
            });
          });
          $(document).ready(function() {
            $("a.articles").click(function() {
              $("#my-articles-content").hide();
              $("#post-box").hide();
              $("#articles").show();
            });
          });
          $(document).ready(function() {
            $("a.addarticles").click(function() {
              $("#articles").hide();
              $("#my-articles-content").hide();
              $("post-box").show();
            });
          });
          // Get all articles
          $(document).ready(function() {
            var articleURL = "http://localhost:3000/articles/";
            $.ajax({
              url: articleURL,
              method: "GET",
              headers: {
                Authorization: "Bearer " + token
              },
              success: function(data) {
                data.forEach(function(article) {
                  // Create the article HTML
                  var articleHTML =
                    '<article>' +
                    '<code style="display: none;">' +
                    article.id +
                    "</code>" +
                    '<div class="fond_">' +
                    '<span class="s1"></span>' +
                    "</div>" +
                    '<div class="card_">' +
                    '<div class="thumbnail_">' +
                    '<img class="left" src="' +
                    article.image +
                    '" alt="Thumbnail">' +
                    "</div>" +
                    '<div class="right">' +
                    '<h1 class="title">' +
                    article.title +
                    "</h1>" +
                    '<div class="author_">' +
                    '<h2 class="userId">' +
                    article.userId +
                    "</h2>" +
                    "</div>" +
                    '<div class="separator_"></div>' +
                    '<p class="paragraph">' +
                    article.contenu +
                    "</p>" +
                    '<h6 class="dateC">' +
                    article.createdAt +
                    "</h6>" +
                    "</div>" +
                    '<div class="fab_ btn btn-primary comment-button" data-article-id="' +
                    article.id +
                    '" data-bs-toggle="modal" data-bs-target="#exampleModal">' +
                    '<i class="fa fa-comments" aria-hidden="true"></i>' +
                    "</div>" +
                    "</div>";

                  // Append the article HTML to the #articles element
                  $("#articles").append(articleHTML);
                });
              },
              error: function() {
                $("#articles").text("Erreur lors du chargement des articles");
              }
            });
          });
          // Article Comments
          $(document).on("click", ".comment-button", function() {
            // Get the article ID associated with the clicked button
            var articleId = $(this).data("article-id");

            // Construct the comments URL using the article ID
            var commentsURL =
              "http://localhost:3000/articleComments/" + articleId;

            // Clear the previous comments
            $("#articleComments").empty();

            // Retrieve and display the comments for the selected article
            $.ajax({
              url: commentsURL,
              method: "GET",
              headers: {
                Authorization: "Bearer " + token
              },
              success: function(data) {
                data.forEach(function(comment) {
                  var commentaire =
                    '<li class="elemnts"><i class="fas fa-user-circle"></i>' +
                    '<h5 class="email_cmt">' +
                    comment.email +
                    "</h5>" +
                    '<p class="cmt_contenu paragraph">' +
                    comment.contenu +
                    "</p>" +
                    "</li><br>";
                  $("#articleComments").append(commentaire);
                });
              },
              error: function() {
                $("#articleComments").text(
                  "Erreur lors du chargement des commentaires"
                );
              }
            });
          });
          // My articles
          $(document).ready(function() {
            $("a.myarticles").click(function() {
              var articleURL =
                "http://localhost:3000/myarticles/" + getUserId;
              $.ajax({
                url: articleURL,
                method: "GET",
                headers: {
                  Authorization: "Bearer " + token
                },
                success: function(data) {
                  data.forEach(function(article) {
                    // $("#my-articles-content").empty();
                    var articleHTML =
                      "<article>" +
                      '<code style="display: none;">' +
                      article.id +
                      "</code>" +
                      '<div class="fond_">' +
                      '<span class="s1"></span>' +
                      "</div>" +
                      '<div class="card_">' +
                      '<div class="thumbnail_">' +
                      '<img class="left" src="' +
                      article.image +
                      '" alt="Thumbnail">' +
                      "</div>" +
                      '<div class="right">' +
                      '<h1 class="title">' +
                      article.title +
                      "</h1>" +
                      '<div class="author_">' +
                      '<h2 class="userId">' +
                      article.userId +
                      "</h2>" +
                      "</div>" +
                      '<div class="separator_"></div>' +
                      '<p class="paragraph">' +
                      article.contenu +
                      "</p>" +
                      '<h6 class="dateC">' +
                      article.createdAt +
                      "</h6>" +
                      "</div>" +
                      '<div class="fab_ btn btn-primary comment-button" data-article-id="' +
                      article.id +
                      '" data-bs-toggle="modal" data-bs-target="#exampleModal">' +
                      '<i class="fa fa-comments" aria-hidden="true"></i>' +
                      "</div>" +
                      "</div></article>"; // Added closing </article> tag

                    $("#my-articles-content").append(articleHTML); // Appended to the correct element
                  });
                },
                error: function() {
                  $("#my-articles-content").text(
                    "Erreur lors du chargement des articles"
                  );
                }
              });
            });
          });
          // myarticles comments
          $(document).on("click", ".comment-button", function() {
            var articleId = $(this).data("article-id");
            var commentsURL =
              "http://localhost:3000/articleComments/" + articleId;

            $("#articleComments").empty();

            $.ajax({
              url: commentsURL,
              method: "GET",
              headers: {
                Authorization: "Bearer " + token
              },
              success: function(data) {
                data.forEach(function(comment) {
                  var commentaire =
                    '<li class="elemnts"><i class="fas fa-user-circle"></i>' +
                    '<h5 class="email_cmt">' +
                    comment.email +
                    "</h5>" +
                    '<p class="cmt_contenu paragraph">' +
                    comment.contenu +
                    "</p>" +
                    "</li><br>";
                  $("#articleComments").append(commentaire);
                });
              },
              error: function() {
                $("#articleComments").text(
                  "Erreur lors du chargement des commentaires"
                );
              }
            });
          });
          // Add new post
          $(document).ready(function() {
            
          });
           //logout
           $(document).ready(function(){
            $("i.logout").click(function(){
              location.reload();
            })
          })

        // window.location.href = "author.html";
      } else if (role === "ADMIN") {
        window.location.href = "admin.html";
      }
    } 
    else {
      alert("Email ou mot de passe incorrect");
    }
  })
  .catch(error => {
    console.error("Erreur lors de la connexion :", error);
  });
});

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
//////////////////////////////////////////////////
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
  $(this).data('take', newTake); 
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