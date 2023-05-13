//_________________________________ JQUERY __________________________________
//display login
$(document).ready(function(){
    $("a.login").click(function(){
      $("div#signup").hide();
      $("div#login").show();
         });
        });
        //display signup
        $(document).ready(function(){
    $("a.signup").click(function(){
      $("div#login").hide();
      $("div#signup").show();
         });
        });
        //display home
        $(document).ready(function(){
    $(".logo").click(function(){
      $("div#login").hide();
      $("div#signup").hide();
         });
        });
        // switching from signup to login or vice versa
        $(document).ready(function(){
              $("a.Is_exist").click(function(){
                  $("div#signup").hide();
                  $("div#login").show();
              })
        })
         // switching from login to signup or vice versa
         $(document).ready(function(){
              $("a.Not_exist").click(function(){
                  $("div#login").hide();
                  $("div#signup").show();
              })
        })
//_________________________________________ JAVASCRIPT _______________________________________________
        const button = document.getElementById('changecolor');
        const body = document.body;
        // Changing the mode from light to dark or vice versa
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
  
        lf.addEventListener("submit", (event) => {
          event.preventDefault();
          const email_lf = document.querySelector("input[name='email']").value;
          const password_lf = document.querySelector("input[name='password']").value;

          console.log("Email: " + email_lf);
          console.log("Password: " + password_lf);

        });
        // Getting data of signup
        const sf = document.querySelector("#signup_form");
        sf.addEventListener("submit", (event) => {
            event.preventDefault();
            const name_sf = document.querySelector("input[name='name']").value;
            const email_sf = document.querySelector("input[name='email_s']").value;
            const password_sf= document.querySelector("input[name='password_s']").value;

            console.log("Name: " + name_sf);
            console.log("Email: " + email_sf);
            console.log("Password: " + password_sf);
  });