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
      var savedMovies = [];

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
        $("#posterDisplay").empty();
        $("#moviePlot").empty();
        $("#card-title").empty();
        console.log("clicked");

        callSearch();
    
        //function to initiate search based on query parameters/input
        
    })
    function callSearch() {
      console.log("Function called")
         
        var apiKey = "da2a72f5163ff2c54a74dab6f5cc5bd3";
        var randoms = Math.floor(Math.random() * genreSelections.length)
        var randomizer  = Math.floor(Math.random() * 20);
        
        //setting for running the query in the API
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=" + apiKey,
          "method": "GET",
          "headers": {},
          "data": "{}"
        }

          
          $.ajax(settings).done(function (response) {
            console.log (response);
            console.log("Working")
         
          var results = response.results;
                var picURL = "https://image.tmdb.org/t/p/w500" + results[randomizer].poster_path;
                var moviePlot = results[randomizer].overview;
                var moviePic = $("<img>");
                var movieTitle = results[randomizer].original_title;
                var movieID = results[randomizer].id;
                console.log ("Movie ID = " + movieID)

                moviePic.attr("src", picURL);
                moviePic.attr("alt", "title image");

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
                  console.log(imdbResponse);

                  var imdbID = imdbResponse.imdb_id;
                  console.log (imdbID);

                  var metacriticSettings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://imdb8.p.rapidapi.com/title/get-metacritic?tconst=" + imdbID,
                    "method": "GET",
                    "headers": {
                      "x-rapidapi-host": "imdb8.p.rapidapi.com",
                      "x-rapidapi-key": "ea8d56c7demsh58a2de9c820070ap1858acjsnec3bd46c160d"
                    }
                  }
                  
                  $.ajax(metacriticSettings).done(function (metacriticResponse) {
                    var metascore = metacriticResponse.metaScore;
                    var reviewCount = metacriticResponse.reviewCount;
                    var userScore = metacriticResponse.userScore;
                    var userRatingCount = metacriticResponse.userRatingCount
                    
                    console.log(metacriticResponse);
                    console.log("Metascore: " + metascore + " out of " + reviewCount + " total reviews.");
                    console.log("User score: " + userScore + " out of " + userRatingCount + " total user reviews.")
                  });
                });
            
          });
    }
   

  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.view').click(function () {
    $('#modal1').modal('open');
  });

  $('#modal1').modal();


  var firstName = "";
  var lastName = "";
  var userName = "";
  var email = "";
  var password = "";

  $("#sign_up").click(function () {

    event.preventDefault();

    // Grabbed values from text-boxes
    firstName = $("#first_name-input").val().trim();
    lastName = $("#last_name-input").val().trim();
    userName = $("#username-input").val().trim();
    email = $("#email-input").val().trim();
    password = $("#password-input").val().trim();

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


