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
// Redirection vers la page ADMIN
document.getElementById("login_form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission
  const email_lf = document.querySelector("input[name='email']").value;
  const password_lf = document.querySelector("input[name='password']").value;
  if(email_lf==="nouhayla@gmail.com" && password_lf==="2003")
    window.location.href = "admin.html";
  else
    alert("Vous n'etes pas admin");
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