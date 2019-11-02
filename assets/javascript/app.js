$(document).ready(function(){

    console.log("document is ready");


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
    
})
