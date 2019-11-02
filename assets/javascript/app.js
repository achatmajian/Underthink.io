$(document).ready(function(){

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

    // console.log("document is ready");


    $("#likeButton").on("click", function() {
        
        $("#titlesBox").empty();

        callSearch();
    
        //function to initiate search based on query parameters/input
        function callSearch() {
         
        var apiKey = "da2a72f5163ff2c54a74dab6f5cc5bd3";
        var genreChoice = ["18"];
        //setting for running the query in the API
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/discover/movie?with_genres=" + genreChoice[0]+ "&api_key=" + apiKey,
            "method": "GET",
            "headers": {},
            "data": "{}"
          }

          
          $.ajax(settings).done(function (response) {
            console.log(response);
         
          var results = response.results;
            //iterate through all available titles and get path to title image
            for (var i = 0; i < results.length; i++){
                var picURL = "https://image.tmdb.org/t/p/w500" + results[i].poster_path;
                console.log("picURL = " + picURL);
                var moviePic = $("<img>");

                moviePic.attr("src", picURL);
                moviePic.attr("alt", "title image");
                
                //display the title image

                $("#titlesBox").append(moviePic);



                console.log("displaying" + moviePic)
            }
             });

        
    }
    })

  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.view').click(function (){
  	$('#modal1').modal('open');	
  	// alert('edskjcxnm');
  });
//   $('.view').leanModal();
  $('#modal1').modal();

  var firstName = "";
  var lastName = "";
  var userName = "";
  var email = "";
  var password = "";

  $("#sign_up").click(function(){
   
      event.preventDefault();

      // Grabbed values from text-boxes
      firstName = $("#first_name-input").val().trim();
      lastName = $("#last_name-input").val().trim();
      userName = $("#username-input").val().trim();
      email = $("#email-input").val().trim();
      password = $("#password-input").val().trim();

      // Code for "Setting values in the database"
      database.ref("/user-data").set({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: password,
      });

    });
  })
    

