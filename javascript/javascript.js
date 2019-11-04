$(document).ready(function(){

    console.log("document is ready");

    $("#submitButton").on("click", function() {
        
        $("#displayBox").empty();

        callSearch();
    
        //function to initiate search based on query parameters/input
        function callSearch() {

        //on click, submit query
            var searchInput = $("#searchInput").val().trim();
        
        //setting for running the query in the API
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&r=json&s=" + searchInput,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
                    "x-rapidapi-key": "ea8d56c7demsh58a2de9c820070ap1858acjsnec3bd46c160d"
                }
        }
        

        $.ajax(settings).done(function (response) {
            console.log(response);
            var results = response.Search;

            //iterate through all available titles and get path to title image
            for (var i = 0; i < results.length; i++){
                var picURL = results[i].Poster;
                console.log("picURL = " + picURL);
                var moviePic = $("<img>");

                moviePic.attr("src", picURL);
                moviePic.attr("alt", "title image");
                
                //display the title image
                $("#displayBox").append(moviePic);
                console.log("displaying" + moviePic)
            }
            
        });

        
    }
    })
    
})
