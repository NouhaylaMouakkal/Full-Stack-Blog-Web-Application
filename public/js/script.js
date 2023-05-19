$(document).ready(function(){
  $("div#page2").hide();
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






//******************************** NEW ARTICLES ************************************ */
const add_article = document.querySelector(".containerA");
const createButton = document.querySelector(".create");

add_article.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  let content = document.getElementById("body").value;
  const image = document.getElementById("image").value;
  const createdAt = new Date();
// Vérifier si le contenu contient plus de 10 mots
// Limiter le contenu à deux lignes
let truncatedContent = content;
const lines = content.split("\n");
if (lines.length > 2) {
  truncatedContent = lines.slice(0, 2).join("\n");
}
// Afficher le nouvel article sur le profil
document.getElementById("div_parent").innerHTML += `
<article>
<h2>${title}</h2>
<p>
  ${content}
  <br>
</p>
</article>`;
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

// Getting data of login
const lf = document.querySelector("#login_form");

lf.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email_lf = document.querySelector("input[name='email']").value;
  const password_lf = document.querySelector("input[name='password']").value;

  // try {
  //   const response = await fetch("/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: email_lf,
  //       password: password_lf,
  //     }),
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log(data.message); // Login successful
  //     // Continue with your logic after successful login
  //   } else {
  //     const errorData = await response.json();
  //     console.log(errorData.error); // Invalid credentials
  //     // Handle the error, show an error message, etc.
  //   }
  // } catch (error) {
  //   console.error("Error:", error);
  //   // Handle network errors, server down, etc.
  // }

  console.log("Email: " + email_lf);
  console.log("Password: " + password_lf);
});

// Getting data of signup
const sf = document.querySelector("#signup_form");
sf.addEventListener("submit", (event) => {
  event.preventDefault();
  const name_sf = document.querySelector("input[name='name']").value;
  const email_sf = document.querySelector("input[name='email_s']").value;
  const password_sf = document.querySelector("input[name='password_s']").value;

  console.log("Name: " + name_sf);
  console.log("Email: " + email_sf);
  console.log("Password: " + password_sf);
});

//___________________ PROMISES______________________________
//========== Articles ==========
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
//========== Commentaires ==========
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

//==========Categories==========
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

//==========Users==========
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