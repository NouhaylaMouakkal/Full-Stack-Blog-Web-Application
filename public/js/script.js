$(document).ready(function(){
  $("#author").hide();
  $("#admin").hide();
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
        const getUserId = data.id;
        alert(getUserId);
        // L'e-mail existe dans la base de données, vérifier le mot de passe
        if (data.password === password_lf) {
          // Les informations d'identification sont correctes, redirection vers la page "author.html"
            if(data.role ==="AUTHOR"){
                $(document).ready(function(){
                    $("#mainPage").hide();
                    $("#admin").hide();
                    $("#author").show();
                })
// =========================AUTHOR ==================================
      document.body.classList.add("body_author")                   
              // Affichage  du profile
                    $(document).ready(function () {
                      $("#my-articles-content").hide()
                      $("#articles").show()
                    })
                      $(document).ready(function () {
                    $("a.myarticles").click(function () {
                      $("#articles").hide();
                      $("#my-articles-content").show(); // Updated the target element ID
                    });
                  });

                  $(document).ready(function () {
                    $("a.articles").click(function () {
                      $("#my-articles-content").hide()
                      $("#articles").show()
                    })
                  })
                  // var getArticleId=data.id;

                  // Get all articles
                  $(document).ready(function () {
                    var articleURL = "http://localhost:3000/articles/";
                    $.ajax({
                      url: articleURL,
                      method: 'GET',
                      success: function (data) {
                        data.forEach(function (article) {
                          // Create the article HTML
                          var articleHTML = '<article>' +
                            '<code style="display: none;">' + article.id + '</code>' +
                            '<div class="fond_">' +
                            '<span class="s1"></span>' +
                            '</div>' +
                            '<div class="card_">' +
                            '<div class="thumbnail_">' +
                            '<img class="left" src="' + article.image + '" alt="Thumbnail">' +
                            '</div>' +
                            '<div class="right">' +
                            '<h1 class="title">' + article.title + '</h1>' +
                            '<div class="author_">' +
                            '<h2 class="userId">' + article.userId + '</h2>' +
                            '</div>' +
                            '<div class="separator_"></div>' +
                            '<p class="paragraph">' + article.contenu + '</p>' +
                            '<h6 class="dateC">' + article.createdAt + '</h6>' +
                            '</div>' +
                            '<div class="fab_ btn btn-primary comment-button" data-article-id="' + article.id + '" data-bs-toggle="modal" data-bs-target="#exampleModal">' +
                            '<i class="fa fa-comments" aria-hidden="true"></i>' +
                            '</div>' +
                            '</div>';
              
                          // Append the article HTML to the #articles element
                          $("#articles").append(articleHTML);
                        });
                      },
                      error: function () {
                        $('#articles').text("Erreur lors du chargement des articles");
                      }
                    });
                  });
              
                  // Article Comments 
                  $(document).on('click', '.comment-button', function () {
                    // Get the article ID associated with the clicked button
                    var articleId = $(this).data('article-id');
              
                    // Construct the comments URL using the article ID
                    var commentsURL = "http://localhost:3000/articleComments/" + articleId;
              
                    // Clear the previous comments
                    $("#articleComments").empty();
              
                    // Retrieve and display the comments for the selected article
                    $.ajax({
                      url: commentsURL,
                      method: "GET",
                      success: function (data) {
                        data.forEach(function (comment) {
                          var commentaire = '<li class="elemnts"><i class="fas fa-user-circle"></i>' +
                            '<h5 class="email_cmt">' + comment.email + '</h5>' +
                            '<p class="cmt_contenu paragraph">' + comment.contenu + '</p>' +
                            '</li><br>';
                          $("#articleComments").append(commentaire);
                        });
                      },
                      error: function () {
                        $("#articleComments").text("Erreur lors du chargement des commentaires");
                      }
                    });
                  });
              
              //My articles
                  $(document).ready(function () {
                $("a.myarticles").click(function () {
                  var articleURL = "http://localhost:3000/myarticles/"+getUserId; 
                  $.ajax({
                    url: articleURL,
                    method: 'GET',
                    success: function (data) {
                      data.forEach(function (article) {
              // $("#my-articles-content").empty();
                        var articleHTML = '<article>' +
                          '<code style="display: none;">' + article.id + '</code>' +
                          '<div class="fond_">' +
                          '<span class="s1"></span>' +
                          '</div>' +
                          '<div class="card_">' +
                          '<div class="thumbnail_">' +
                          '<img class="left" src="' + article.image + '" alt="Thumbnail">' +
                          '</div>' +
                          '<div class="right">' +
                          '<h1 class="title">' + article.title + '</h1>' +
                          '<div class="author_">' +
                          '<h2 class="userId">' + article.userId + '</h2>' +
                          '</div>' +
                          '<div class="separator_"></div>' +
                          '<p class="paragraph">' + article.contenu + '</p>' +
                          '<h6 class="dateC">' + article.createdAt + '</h6>' +
                          '</div>' +
                          '<div class="fab_ btn btn-primary comment-button" data-article-id="' + article.id + '" data-bs-toggle="modal" data-bs-target="#exampleModal">' +
                          '<i class="fa fa-comments" aria-hidden="true"></i>' +
                          '</div>' +
                          '</div></article>'; // Added closing </article> tag
              
                        $("#my-articles-content").append(articleHTML); // Appended to the correct element
                      });
                    },
                    error: function () {
                      $('#my-articles-content').text("Erreur lors du chargement des articles");
                    }
                  });
                });
              });
              //myarticles comments
              $(document).on('click', '.comment-button', function () {
                var articleId = $(this).data('article-id');
                var commentsURL = "http://localhost:3000/articleComments/" + articleId;
              
                $("#articleComments").empty();
              
                $.ajax({
                  url: commentsURL,
                  method: "GET",
                  success: function (data) {
                    data.forEach(function (comment) {
                      var commentaire = '<li class="elemnts"><i class="fas fa-user-circle"></i>' +
                        '<h5 class="email_cmt">' + comment.email + '</h5>' +
                        '<p class="cmt_contenu paragraph">' + comment.contenu + '</p>' +
                        '</li><br>';
                      $("#articleComments").append(commentaire);
                    });
                  },
                  error: function () {
                    $("#articleComments").text("Erreur lors du chargement des commentaires");
                  }
                });
              });
              // window.location.href = "author.html";
            }
            else if(data.role ==="ADMIN")
              // window.location.href="admin.html"
              $(document).ready(function(){
                $("#mainPage").hide();
                $("#author").hide();
                $("#admin").show();
            })
//================================ ADMIN ==================================
              var nbr_articles;
              var nbr_users ;
              var nbr_comments ;
              var nbr_categories;
              //Default dispaly of icons
              $(document).ready(function(){
              $("#ApplyModification1").hide();
              $("#ApplyModification2").hide();
              $("#ApplyModification3").hide();
              $("#ApplyModification4").hide();
              })
              // statistics
              $(document).ready(function() {
                  var statisticsURL = "http://localhost:3000/countAll/";
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
                      nbr_articles= data.AllArticles;
                      nbr_users = data.AllUsers;
                      nbr_comments = data.AllComments;
                      nbr_categories = data.AllCategories;
                      },
                      error: function() {
                          // Gérer les erreurs de récupération des statistiques
                          $("#statistics").text("Erreur lors du chargement des statistiques");
                      }
                  });
              });
              // ========== Articles ==========
              //Suppression
              $(document).ready(function(){
              $("#removeArticle").click(function(){
              var inputA = $("<input>", {
              type: 'number',
              id: 'idA',
              placeholder: 'Id of article'
              });

              var btn = $("<button>", {
              type: 'submit',
              id: 'data',
              text: 'apply'
              });

              $("#ApplyModification1").append(inputA);
              $("#ApplyModification1").append(btn);

              $("#data").click(function(){
              var delURL = "http://localhost:3000/articles/" + $("#idA").val();
              $.ajax({
              url: delURL,
              method: "DELETE",
              success: function(){
                console.log('done');
                location.reload();
              },
              error: function(){
                alert('error');
              }
              });
              });
              });
              });

              //Recherche 
              $("#searcharticle").click(function(){
              var inputA = $("<input>", {
              type: 'number',
              id: 'idA',
              placeholder: 'Id of article'
              });

              var btn = $("<button>", {
              type: 'submit',
              id: 'data1',
              text: 'search'
              });

              $("#ApplyModification1").append(inputA);
              $("#ApplyModification1").append(btn);

              $("#data1").click(function(){
              var searchURL ="http://localhost:3000/articles/"+$("#idA").val();
              ;
              $.ajax({
              url: searchURL,
              method: "GET",
              success: function(response){
              $("#articles").empty();
              var articleHTML = '<article class="art">' +
                '<div class="articleId">' + response.id + '</div>' +
                '<div class="articleTitle">' + response.title + '</div>' +
                '<div class="articleContent">' + response.contenu + '</div>' +
                '<img src="' + response.image + '" alt="Image de l\'article" class="articleImage">' +
                '<div class="articleCreatedAt"><strong>Date de création: </strong>' + response.createdAt + '</div>' +
                '<div class="articleUpdatedAt"><strong>Date de modification: </strong>' + response.updatedAt + '</div>' +
                '<div class="userID"><strong>ID de l\'utilisateur: </strong>' + response.userId + '</div>' +
                '</article>';

              $("#articles").append(articleHTML);
              },
              error: function(){
              alert('error !');
              }
              });
              });
              });
              //Affichage
              $(document).ready(function() {
              $("#articleCount").click(function() {

              $("#users").hide();
              $("#comments").hide();
              $("#categories").hide();
              $("#articles").show();
              $("#ApplyModification1").show();

              var articleURL = "http://localhost:3000/articles/?take=" + nbr_articles + "&skip=0";
              $.ajax({
              url: articleURL,
              method: 'GET',
              success: function(data) {
              //   $("#articles").empty(); // Clear existing articles

              data.forEach(function(article) {
              var articleHTML = '<article class="art">' +
              '<div class="articleTitle">' + article.id + '</div>' +
                '<div class="articleTitle">' + article.title + '</div>' +
                '<div class="articleContent">' + article.contenu + '</div>' +
                '<img src="' + article.image + '" alt="Image de l\'article" class="articleImage">' +
                '<div class="articleCreatedAt"><strong>Date de création: </strong>' + article.createdAt + '</div>' +
                '<div class="articleUpdatedAt"><strong>Date de modification: </strong>' + article.updatedAt + '</div>' +
                '<div class="userID"><strong>ID de l\'utilisateur: </strong>' + article.userId + '</div>' +
                '</article>';

              $("#articles").append(articleHTML);
              });
              },
              error: function() {
              $('#articles').text("Erreur lors du chargement des articles");
              }
              });
              });
              });
              //========= Users ==========
              //Suppression 
              $("#removeuser").click(function(){
              var inputA = $("<input>", {
              type: 'number',
              id: 'idU',
              placeholder: 'Id of user'
              });

              var btn = $("<button>", {
              type: 'submit',
              id: 'data2',
              text: 'delete'
              });

              $("#ApplyModification2").append(inputA);
              $("#ApplyModification2").append(btn);

              $("#data2").click(function(){
              var delURL = "http://localhost:3000/users/" + $("#idU").val();
              $.ajax({
              url: delURL,
              method: "DELETE",
              success: function(){
                console.log('done');
                location.reload();
              },
              error: function(){
                alert('error !');
              }
              });
              });
              });

              //Insertion 
              $("#adduser").click(function() {
              var nom_u = $("<input>", {
              type: 'text',
              id: 'nameU',
              placeholder: 'Username',
              });
              var email_u = $("<input>", {
              type: 'email',
              id: 'emailU',
              placeholder: 'user email',
              });
              var password_u = $("<input>", {
              type: 'password',
              id: 'passwsU',
              placeholder: 'password',
              });
              var role_u = $("<select>", {
              name: "role",
              id: "role"
              }).append(
              $("<option>", {
              value: "AUTHOR",
              text: "AUTHOR"
              }),
              $("<option>", {
              value: "ADMIN",
              text: "ADMIN"
              })
              );
              var btn_u = $("<button>", {
              type: 'submit',
              id: 'dataU',
              text: 'add'
              });
              var user = {
              nom: nom_u.val(),
              email: email_u.val(),
              password: password_u.val(),
              role: role_u.val()
              };
              $("#ApplyModification2").append(nom_u);
              $("#ApplyModification2").append(email_u);
              $("#ApplyModification2").append(password_u);
              $("#ApplyModification2").append(role_u);
              $("#ApplyModification2").append(btn_u);

              $("#dataU").click(function() {
              user = {
              nom: nom_u.val(),
              email: email_u.val(),
              password: password_u.val(),
              role: role_u.val()
              };

              $.ajax({
              url: "http://localhost:3000/users",
              type: 'POST',
              contentType: "application/json",
              data: JSON.stringify(user),
              success: function(response) {
              console.log("User added successfully:", response);
              location.reload();
              },
              error: function(xhr, status, error) {
              console.error("Error while adding the user:", error);
              }
              });
              });
              });

              //Modification 
              $("#edituser").click(function() {
              var id_u = $("<input>", {
              type: 'number',
              id: 'idU',
              placeholder: 'id of user',
              });
              var nom_u = $("<input>", {
              type: 'text',
              id: 'nameU',
              placeholder: 'Username',
              });
              var email_u = $("<input>", {
              type: 'email',
              id: 'emailU',
              placeholder: 'user email',
              });
              var password_u = $("<input>", {
              type: 'password',
              id: 'passwsU',
              placeholder: 'password',
              });
              var role_u = $("<select>", {
              name: "role",
              id: "role"
              }).append(
              $("<option>", {
              value: "AUTHOR",
              text: "AUTHOR"
              }),
              $("<option>", {
              value: "ADMIN",
              text: "ADMIN"
              })
              );
              var btn_u = $("<button>", {
              type: 'submit',
              id: 'dataU',
              text: 'add'
              });
              var user = {
              nom: nom_u.val(),
              email: email_u.val(),
              password: password_u.val(),
              role: role_u.val()
              };
              $("#ApplyModification2").append(id_u);
              $("#ApplyModification2").append(nom_u);
              $("#ApplyModification2").append(email_u);
              $("#ApplyModification2").append(password_u);
              $("#ApplyModification2").append(role_u);
              $("#ApplyModification2").append(btn_u);

              $("#dataU").click(function() {
              user = {
              nom: nom_u.val(),
              email: email_u.val(),
              password: password_u.val(),
              role: role_u.val()
              };

              $.ajax({
              url: "http://localhost:3000/users/"+id_u.val(),
              type: 'PATCH',
              contentType: "application/json",
              data: JSON.stringify(user),
              success: function(response) {
              console.log("User added successfully:", response);
              location.reload();
              },
              error: function(xhr, status, error) {
              console.error("Error while adding the user:", error);
              }
              });
              });
              });
              //Recherche
              $("#searchuser").click(function(){
              var inputA = $("<input>", {
              type: 'number',
              id: 'idU',
              placeholder: 'Id of user'
              });

              var btn = $("<button>", {
              type: 'submit',
              id: 'data2',
              text: 'search'
              });

              $("#ApplyModification2").append(inputA);
              $("#ApplyModification2").append(btn);

              $("#data2").click(function(){
              var searchURL = "http://localhost:3000/users/" + $("#idU").val();
              $.ajax({
              url: searchURL,
              method: "GET",
              success: function(response){
              $("#users").empty();
              var userHTML = '<article class="art">' +
                '<div class="userId"><strong> L\'id de l\'utilisateur : </strong>' + response.id + '</div>' +
                '<div class="userName"><strong> Nom :</strong>' + response.nom + '</div>' +
                '<div class="userEmail"><strong> Email : </strong>' + response.email + '</div>' +
                '<div class="userPassword"><strong> Password </strong>' + response.password + '</div>' +
                '<div class="userRole"><strong> Role :</strong>' + response.role + '</div>' +
                '</article>';

              $("#users").append(userHTML);
              },
              error: function(){
              alert('error !');
              }
              });
              });
              });

              //Affichage
              $(document).ready(function() {
              $("#userCount").click(function() {
              $("#articles").hide();
              $("#comments").hide();
              $("#categories").hide();
              $("#users").show();
              $("#ApplyModification2").show();

              var userURL = "http://localhost:3000/users/?take=" + nbr_users + "&skip=0";
              $.ajax({
              url: userURL,
              method: 'GET',
              success: function(data) {
              // $("#users").empty(); // Efface les utilisateurs existants

              data.forEach(function(user) {
                var userHTML = '<article class="art">' +
                  '<div class="userId"><strong> L\'id de l\'utilisateur : </strong>' + user.id + '</div>' +
                  '<div class="userName"><strong> Nom :</strong>' + user.nom + '</div>' +
                  '<div class="userEmail"><strong> Email : </strong>' + user.email + '</div>' +
                  '<div class="userPassword"><strong> Password </strong>' + user.password + '</div>' +
                  '<div class="userRole"><strong> Role :</strong>' + user.role + '</div>' +
                  '</article>';

                $("#users").append(userHTML);
              });
              },
              error: function() {
              $('#users').text("Erreur lors du chargement des utilisateurs");
              }
              });
              });
              });
              //========= Comments ==========
              //Suppression 
              $("#removecomment").click(function(){
              var inputA = $("<input>", {
              type: 'number',
              id: 'idC',
              placeholder: 'Id of comment'
              });

              var btn = $("<button>", {
              type: 'submit',
              id: 'data3',
              text: 'delete'
              });

              $("#ApplyModification3").append(inputA);
              $("#ApplyModification3").append(btn);

              $("#data3").click(function(){
              var delURL = "http://localhost:3000/commentaires/" + $("#idC").val();
              $.ajax({
              url: delURL,
              method: "DELETE",
              success: function(){
                console.log('done');
                location.reload();
              },
              error: function(){
                alert('error !');
              }
              });
              });
              });
              //Insertion
              $("#addcomment").click(function() {
              var email_c = $("<input>", {
              type: 'email',
              id: 'emailC',
              placeholder: 'user email',
              });
              var content_u = $("<input>", {
              type: 'text',
              id: 'contentC',
              placeholder: 'Votre Commentaire',
              });
              var a_id = $("<input>", {
              type: 'number',
              id: 'aIdC',
              placeholder: 'Article Id',
              });
              var u_id = $("<input>", {
              type: 'number',
              id: 'uIdC',
              placeholder: 'Author Id',
              });

              var btn_u = $("<button>", {
              type: 'submit',
              id: 'dataU',
              text: 'add'
              });

              var comment = {
              email: '',
              contenu: '',
              articleId: 0,
              userId: 0
              };

              $("#ApplyModification3").append(email_c);
              $("#ApplyModification3").append(content_u);
              $("#ApplyModification3").append(a_id);
              $("#ApplyModification3").append(u_id);
              $("#ApplyModification3").append(btn_u);

              $("#dataU").click(function() {
              comment = {
              email: email_c.val(),
              contenu: content_u.val(),
              articleId: parseInt(a_id.val()),
              userId: parseInt(u_id.val())
              };

              $.ajax({
              url: "http://localhost:3000/commentaires/",
              type: 'POST',
              contentType: "application/json",
              data: JSON.stringify(comment),
              success: function(response) {
              console.log("Comment added successfully:", response);
              location.reload();
              },
              error: function(xhr, status, error) {
              console.error("Error while adding the comment:", error);
              }
              });
              });
              });

              //Modification
              $("#editcomment").click(function() {
              var id_c = $("<input>", {
              type: 'number',
              id: 'idC',
              placeholder: 'id of comment',
              });
              var email_c = $("<input>", {
              type: 'email',
              id: 'emailC',
              placeholder: 'user email',
              });
              var content_u = $("<input>", {
              type: 'text',
              id: 'contentC',
              placeholder: 'Votre Commentaire',
              });
              var a_id = $("<input>", {
              type: 'number',
              id: 'aIdC',
              placeholder: 'Article Id',
              });
              var u_id = $("<input>", {
              type: 'number',
              id: 'uIdC',
              placeholder: 'Author Id',
              });

              var btn_u = $("<button>", {
              type: 'submit',
              id: 'dataU',
              text: 'Edit'
              });
              var comment = {
              id : 0,
              email: '',
              contenu: '',
              articleId: 0,
              userId: 0
              };
              $("#ApplyModification3").append(id_c);
              $("#ApplyModification3").append(email_c);
              $("#ApplyModification3").append(content_u);
              $("#ApplyModification3").append(a_id);
              $("#ApplyModification3").append(u_id);
              $("#ApplyModification3").append(btn_u);

              $("#dataU").click(function() {
              comment = {
              email: email_c.val(),
              contenu: content_u.val(),
              articleId: parseInt(a_id.val()),
              userId: parseInt(u_id.val())
              };

              $.ajax({
              url: "http://localhost:3000/commentaires/"+id_c.val(),
              type: 'PATCH',
              contentType: "application/json",
              data: JSON.stringify(comment),
              success: function(response) {
              console.log("Comment added successfully:", response);
              location.reload();
              },
              error: function(xhr, status, error) {
              console.error("Error while adding the comment:", error);
              }
              });
              });
              });

              //Recherche
              $("#searchcomment").click(function(){
              var inputA = $("<input>", {
              type: 'number',
              id: 'idC',
              placeholder: 'Id of comment'
              });

              var btn = $("<button>", {
              type: 'submit',
              id: 'data3',
              text: 'search'
              });

              $("#ApplyModification3").append(inputA);
              $("#ApplyModification3").append(btn);

              $("#data3").click(function(){
              var searchURL = "http://localhost:3000/commentaires/" + $("#idC").val();
              $.ajax({
              url: searchURL,
              method: "GET",
              success: function(response){
              $("#comments").empty();
              var commentHTML = '<article class="art">' +
                                '<div class="commentId"> L\'id du commentaire :</strong>' + response.id + '</div>' +
                                '<div class="commentEmail"><strong>Email :</strong>' + response.email + '</div>' +
                                '<div class="commentContent"><strong> Commentaire :</strong>' + response.contenu + '</div>' +
                                '<div class="commentArticleId"><strong> Id de l\'article : </strong>' + response.articleId + '</div>' +
                                '<div class="commentUserId"> <strong>L\'utilisateur Id :</strong>' + response.userId + '</div>' +
                                '</article>';

              $("#comments").append(commentHTML);
              },
              error: function(){
              alert('error !');
              }
              });
              });
              });

              //affichage
              $(document).ready(function() {
              $("#commentCount").click(function() {
              $("#articles").hide();
              $("#users").hide();
              $("#categories").hide();
              $("#comments").show();
              $("#ApplyModification3").show();


              var commentURL = "http://localhost:3000/commentaires/?take=" + nbr_comments + "&skip=0";
              $.ajax({
              url: commentURL,
              method: 'GET',
              success: function(data) {
              //   $("#comments").empty(); // Efface les utilisateurs existants

              data.forEach(function(comment) {
              var userHTML = '<article class="art">' +
              '<div class="commentId"> L\'id de l\'utilisateur :</strong>' + comment.id + '</div>' +
              '<div class="commentEmail"><strong>Email :</strong>' + comment.email + '</div>' +
              '<div class="commentContent"><strong> Commentaire :</strong>' + comment.contenu + '</div>' +
              '<div class="commentArticleId"><strong> Id de l\'articles : </strong>' + comment.articleId + '</div>' +
              '<div class="commentUserId"> <strong>L\'utilisateur Id :</strong>' + comment.userId + '</div>' +
              '</article>';

              $("#comments").append(userHTML);
              });
              },

              error: function() {
              $('#comments').text("Erreur lors du chargement des utilisateurs");
              }
              });
              });
              });
              //========== categories ==========
              //Affichage
              $(document).ready(function() {
              $("#categoryCount").click(function() {
              $("#articles").hide();
              $("#users").hide();
              $("#comments").hide();
              $("#categories").show();
              $("#ApplyModification4").show();

              var categoryURL = "http://localhost:3000/categories/?take=" + nbr_categories + "&skip=0";

              $.ajax({
              url: categoryURL,
              method: 'GET',
              success: function(data) {
              // $("#categories").empty(); // Efface les catégories existantes

              data.forEach(function(category) {
                var categoryHTML = '<article class="art">' +
                                    '<div class="categoryId"><strong>L\'id du catégorie :</strong>' + category.id + '</div>' +
                                    '<div class="categoryName"><strong>Nom :</strong>' + category.nom + '</div>' +
                                    '</article>';

                $("#categories").append(categoryHTML);
              });
              },
              error: function() {
              $('#categories').text("Erreur lors du chargement des catégories");
              }
              });
              });
              });

              //Suppression
              $("#removecategory").click(function(){
              var inputA = $("<input>", {
              type: 'number',
              id: 'idCtg',
              placeholder: 'Id of category'
              });

              var btn = $("<button>", {
              type: 'submit',
              id: 'data4',
              text: 'delete'
              });

              $("#ApplyModification4").append(inputA);
              $("#ApplyModification4").append(btn);

              $("#data4").click(function(){
              var delURL = "http://localhost:3000/categories/" + $("#idCtg").val();
              $.ajax({
              url: delURL,
              method: "DELETE",
              success: function(){
                console.log('done');
                location.reload();
              },
              error: function(){
                alert('error !');
              }
              });
              });
              });

              //Insertion 
              $("#addcategory").click(function() {
              var nom_c = $("<input>", {
              type: 'text',
              id: 'nomCtg',
              placeholder: 'Nom de categorie',
              });
              var btn_u = $("<button>", {
              type: 'submit',
              id: 'data4',
              text: 'add'
              });

              var category = {
              nom_c: ''
              };

              $("#ApplyModification4").append(nom_c); // Utilisez l'ID correct "#ApplyModification4" au lieu de la classe ".ApplyModification4"
              $("#ApplyModification4").append(btn_u); // Utilisez l'ID correct "#ApplyModification4" au lieu de la classe ".ApplyModification4"

              $("#data4").click(function() {
              category = {
              nom : nom_c.val()
              };

              $.ajax({
              url: "http://localhost:3000/categories/",
              type: 'POST',
              contentType: "application/json",
              data: JSON.stringify(category),
              success: function(response) {
              console.log("Category added successfully:", response);
              location.reload();
              },
              error: function(xhr, status, error) {
              console.error("Error while adding the category:", error);
              }
              });
              });
              });

              //Modification
              $("#editcategory").click(function() {
              var id_ctg = $("<input>", {
              type: 'number',
              id: 'idCtg',
              placeholder: 'id of category',
              });
              var nom_c = $("<input>", {
              type: 'text',
              id: 'nomCtg',
              placeholder: 'Nom de categorie',
              });
              var btn_u = $("<button>", {
              type: 'submit',
              id: 'data4',
              text: 'Edit'
              });
              var category = {
              id : 0,
              nom: ''
              };
              $("#ApplyModification4").append(id_ctg);
              $("#ApplyModification4").append(nom_c);
              $("#ApplyModification4").append(btn_u);

              $("#data4").click(function() {
              category = {
              id : id_ctg,
              nom: nom_c.val()
              };

              $.ajax({
              url: "http://localhost:3000/categories/"+id_ctg.val(),
              type: 'PATCH',
              contentType: "application/json",
              data: JSON.stringify(category),
              success: function(response) {
              console.log("Category added successfully:", response);
              location.reload();
              },
              error: function(xhr, status, error) {
              console.error("Error while adding the category:", error);
              }
              });
              });
              });

              //Recherche
              $("#searchcategory").click(function(){
              var inputA = $("<input>", {
              type: 'number',
              id: 'idCtg',
              placeholder: 'Id of category'
              });

              var btn = $("<button>", {
              type: 'submit',
              id: 'data4',
              text: 'search'
              });

              $("#ApplyModification4").append(inputA);
              $("#ApplyModification4").append(btn);

              $("#data4").click(function(){
              var searchURL = "http://localhost:3000/categories/" + $("#idCtg").val();
              $.ajax({
              url: searchURL,
              method: "GET",
              success: function(response){
              $("#categories").empty();
              var categoryHTML = '<article class="art">' +
                                '<div class="categoryId"><strong>L\'id du catégorie :</strong>' + response.id + '</div>' +
                                '<div class="categoryName"><strong>Nom :</strong>' + response.nom + '</div>' +
                                '</article>';

              $("#categories").append(categoryHTML);
              },
              error: function(){
              alert('error !');
              }
              });
              });
              });
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
