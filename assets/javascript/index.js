 $(document).ready(function(){


 
 // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered

 $('.view').click(function () {
    $('#modal1').modal('open');
    $('#modal2').modal('open');
  });

//   $('#modal1').modal();
//   $('#modal2').modal();


  var firstName = "";
  var lastName = "";
  var userName = "";
  var email = "";
  var password = "";


  // On click log in button, checks to make sure user in the in the system
  // Checks credentials
  $("#log_in").click(function () {
    userNameLogin = $("#username-login-input").val().trim();
    passwordLogin = $("#password-login-input").val().trim();

    console.log(userNameLogin)
    // console.log(passwordLogin)

    var ref = database.ref("/user-data");
    ref.once("value").then(function (snapshot) {
      console.log(userNameLogin)
      var a = snapshot.child(userNameLogin).exists();
      console.log(a)
      if (a) {
        firebase.database().ref("/user-data/" + userNameLogin).once("value").then(function (snapshot) {
          var b = snapshot.child("userName").val();
          var c = snapshot.child("password").val();
          console.log(b);
          console.log(c);
          if (b === userNameLogin && c === passwordLogin) {
            window.location.href = "swipe-page.html";
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

            // Store the username as a cookie using "document.cookie"
            document.cookie = "username=" + userNameLogin + ";";

            // Print all the cookies
            console.log(userNameLogin);
            console.log(document.cookie);

            // Recover the name by passing the cookie list through a function that breaks it down
            var cookieName = readCookie("username");
            console.log(cookieName);
          }
          else {
            $("#username-login-input").css("color", "red")
            $("#username-login-label").css("color", "red")
            $("#password-login-input").css("color", "red")
            $("#password-login-label").css("color", "red")
            $("#error").text("Your username or password is incorrect")
            $("#error").css("color", "red")
          }
        })
      }
      else if (!a) {
        $("#username-login-input").css("color", "red")
        $("#username-login-label").css("color", "red")
        $("#username-login-label").text("username does not exist")
      }
    })
  })


  // On click sign up button, pushes user info to Firebase DB
  $("#sign_up").click(function () {

    event.preventDefault();

    // Grabbed values from text-boxes
    firstName = $("#first_name-input").val().trim();
    lastName = $("#last_name-input").val().trim();
    userName = $("#username-input").val().trim();
    email = $("#email-input").val().trim();
    password = $("#password-input").val().trim();

    // Does not allow for sign up if the username is alredy in use
    database.ref("/user-data/").once("value", snapshot => {
      if (snapshot.child(userName).exists()) {
        console.log("exists!");
        console.log(userName)
        $("#username-input").css("color", "red")
        $("#username-label").css("color", "red")
        $("#username-label").text("username already in use")
      }
      else {
        // Code for "Setting values in the database"
        database.ref("/user-data/" + userName).set({
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          email: email,
          password: password,
		});
		
		$("#modal1").modal("close");
		window.location.href = "checkbox.html"
		
		document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

            // Store the username as a cookie using "document.cookie"
            document.cookie = "username=" + userName + ";";

            // Print all the cookies
            console.log(userName);
            console.log(document.cookie);

            // Recover the name by passing the cookie list through a function that breaks it down
            var cookieName = readCookie("username");
            console.log(cookieName); 

      }

    });

  });

   //Signout
  $("#signOut").click(function () {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  })
})