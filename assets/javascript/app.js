$(document).ready(function(){

$(".dropdown-trigger").dropdown();

    var firebaseConfig = {
        apiKey: "AIzaSyAFyPMp9Jx66lewKt-mdsNUJsY1DpFbfCQ",
        authDomain: "underthink-io.firebaseapp.com",
        databaseURL: "https://underthink-io.firebaseio.com",
        projectId: "underthink-io",
        storageBucket: "underthink-io.appspot.com",
        messagingSenderId: "1068499860720",
        appId: "1:1068499860720:web:6bb99b9ce3421a635d9635",
        measurementId: "G-EWEGXJ3FEL"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
    
      var database = firebase.database();

      //Functionality in the preliminary genre checkbox screen
      var genreSelections = [];

    //read checkboxes and push values into genreSelections array
        $(".checks").on("click", function(){
          var x = $(this).attr("value");
          genreSelections.push(x);
          console.log(genreSelections)
        })

        //PASS THE GENRESELECTIONS ARRAY INTO THE USER OBJECT IN FIREBASE
        $("#formSubmit").on("click", function(){
          database.ref("/user-data/rayray/genreselections").set({
            genreSelections: genreSelections
          })
        })
        
        callSearch();
        
      //this is just a click function to check the queries.  Will remove later
    $("#likeButton").on("click", function() {

        callSearch();
    
        //function to initiate search based on query parameters/input
        
    })
    function callSearch() {
         
        var apiKey = "da2a72f5163ff2c54a74dab6f5cc5bd3";
        var randoms = Math.floor(Math.random() * genreSelections.length)
        var randomizer  = Math.floor(Math.random() * 20);
        //setting for running the query in the API
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/discover/movie?with_genres=" + genreSelections[randoms]+ "&api_key=" + apiKey,
            "method": "GET",
            "headers": {},
            "data": "{}"
          }

          
          $.ajax(settings).done(function (response) {
            console.log(response);
         
          var results = response.results;
                var picURL = "https://image.tmdb.org/t/p/w500" + results[randomizer].poster_path;
                var moviePlot = results[randomizer].overview;
                console.log("picURL = " + picURL);
                console.log(moviePlot);
                var moviePic = $("<img>");

                moviePic.attr("src", picURL);
                moviePic.attr("alt", "title image");
                console.log("displaying" + moviePic)

             });

        
    }
   

  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.view').click(function () {
    $('#modal1').modal('open');
    $('#modal2').modal('open');
  });

  $('#modal1').modal();
  $('#modal2').modal();


  var firstName = "";
  var lastName = "";
  var userName = "";
  var email = "";
  var password = "";

  // On click log in button, checks to make sure user in the in the system
  // Checks credentials
  $("#log_in").click(function(){
    userNameLogin = $("#username-input").val().trim();
    passwordLogin = $("#password-input").val().trim();

    // console.log(userNameLogin)
    // console.log(passwordLogin)

    var ref = database.ref("/user-data/");
    ref.once("value").then(function(snapshot){
      var a = snapshot.child(userNameLogin).exists();
      console.log(a)
      // if(a){
      //   firebase.database().ref("/user-data/"+userNameLogin).once("value").then(function(snapshot){
      //     var b = snapshot.child("userName").val();
      //     var c = snapshot.child("password").val();
      //     console.log(b);
      //     console.log(c);
      //     // if(b === userNameLogin && c === passwordLogin){
      //     //   alert("YOUVE SIGNED IN")
      //     // }
      //   })
      // }
      // else if(!a){
      //   $("#username-login-input").css("color","red")
      //   $("#username-login-label").css("color","red")
      //   $("#username-login-label").text("username does not exist")
      // }
    })

    // database.ref("/user-data").child(userName).snapshot

    // if (database.ref("/user-data").child(userName).equalTo(userNameLogin)) {
    //   alert("YOU'VE SIGNED IN!")
    // }
    
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
        $("#username-input").css("color","red")
        $("#username-label").css("color","red")
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

        $("#modal1").modal("close")

      }

    });

  });
})


