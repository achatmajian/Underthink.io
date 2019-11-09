$(document).ready(function () {


// $(".dropdown-trigger").dropdown();

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

        // $("#modal1").modal("close");
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

  
	//Functionality in the preliminary genre checkbox screen
	var genreSelections = [];
	var savedMovies = [];

	//read checkboxes and push values into genreSelections array
	$(".checks").on("click", function () {
		console.log("Is this working?")
		var x = $(this).attr("value");
		genreSelections.push(x);
	})

	//PASS THE GENRESELECTIONS ARRAY INTO THE USER OBJECT IN FIREBASE
	$("#formSubmit").on("click", function () {
		var userCookie = Cookies.get("username");
		console.log(userCookie)
		database.ref("/user-data/" + userCookie + "/genreSelections").set({
			genreSelections
		})
      window.location.href = "swipe-page.html";
	})

	
	callSearch();



	//function to initiate search based on query parameters/input
	function callSearch() {
		$("#posterDisplay").empty();
		$("#moviePlot").empty();
    $("#card-title").empty();
    
    var userCookie = Cookies.get("username");
    var firebaseGenres = database.ref("/user-data/" + userCookie + "/genreSelections/").once("value").then(function(snapshot){
      rocks = snapshot.child("genreSelections").val();
      console.log(rocks)
    
		var apiKey = "da2a72f5163ff2c54a74dab6f5cc5bd3";
    var randoms = Math.floor(Math.random() * rocks.length)
    var randomizer = Math.floor(Math.random() * 20);

    //setting for running the query in the API
    
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.themoviedb.org/3/discover/movie?with_genres=" + rocks[randoms] + "&api_key=" + apiKey,
      "method": "GET",
      "headers": {},
      "data": "{}"
    }

		$.ajax(settings).done(function (response) {
      console.log(response)
			var results = response.results;
			
      var picURL = "https://image.tmdb.org/t/p/w500" + results[randomizer].poster_path
      console.log(picURL)
      var moviePlot = results[randomizer].overview
      console.log(moviePlot)
			var moviePic = $("<img>");
      var movieTitle = results[randomizer].original_title
      var movieID =results[randomizer].id
    
			moviePic.attr("src", picURL);
			moviePic.attr("alt", "title image");

			setResults(results[randomizer]);

			$("#posterDisplay").append(moviePic);
			$("#moviePlot").append(moviePlot);
			$("#card-title").append(movieTitle);

			var getIMDBsettings = {
				"async": true,
				"crossDomain": true,
				"url": "https://api.themoviedb.org/3/movie/" + movieID + "/external_ids?api_key=" + apiKey,
				"method": "GET",
				"headers": {},
				"data": "{}"
			}

			$.ajax(getIMDBsettings).done(function (imdbResponse) {

				var imdbID = imdbResponse.imdb_id;

				var metacriticSettings = {

          "async": true,
          "crossDomain": true,
          "url": "https://api.themoviedb.org/3/movie/" + movieID + "/external_ids?api_key=" + apiKey,
          "method": "GET",
          "headers": {},
          "data": "{}"
        }

        $.ajax(getIMDBsettings).done(function (imdbResponse) {

          var imdbID = imdbResponse.imdb_id;

          var metacriticSettings = {
            "async": true,
            "crossDomain": true,
            "url": "https://imdb8.p.rapidapi.com/title/get-metacritic?tconst=" + imdbID,
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "imdb8.p.rapidapi.com",
              "x-rapidapi-key": "52f358512fmsha5f4fbfea4f16fep1e0befjsn055925cf49c2"
            }
          }

          $.ajax(metacriticSettings).done(function (metacriticResponse) {
            console.log(metacriticResponse);
            var metascore = metacriticResponse.metaScore;
            var reviewCount = metacriticResponse.reviewCount;
            var userScore = metacriticResponse.userScore;
            var userRatingCount = metacriticResponse.userRatingCount
          });



        });

      });
    })
  
})
	}
		//Like a movie and save it for later
			$("#likeButton").on("click", function () {
        var userCookie = Cookies.get("username");

        saveMovie(getResult());
        console.log(savedMovies);
        
        database.ref("/user-data/" + userCookie + "/savedmovies").set({
          savedMovies
        })
        callSearch();
        
        })

        generateSaved();

        function generateSaved(){
          var userCookie = Cookies.get("username")
          var firebaseSaved = database.ref("/user-data/" + userCookie + "/savedmovies/").once("value").then(function(snapshot){
            var saveMovieDetails = snapshot.child("savedMovies").val();
            console.log(saveMovieDetails[0].poster_path)
          

          for (i = 0; i < saveMovieDetails.length; i++){
          var moviePic = $("<img>");
          var moviePlot = saveMovieDetails[i].overview
          var picURL = "https://image.tmdb.org/t/p/w500" + saveMovieDetails[i].poster_path;
          console.log(picURL)
          moviePic.attr("src", picURL);
          moviePic.attr("alt", "title image");
          $("#saved-row").append(moviePic)
//          $("#saved-row").append(moviePlot)
        }
      })
        }

	function saveMovie(movie){
		savedMovies.push(movie);
	}
	function setResults(results) {
		globalResult = results;
	}


  function getResult() {
    return globalResult;
  }


})
