// Taste Drive API key (quota/limit per hour is 300) - 346849-Project1-81C8Z2D3
// https://tastedive.com/api/similar?q=" + artistSearch + "&info=1&verbose=1

$("#submit").on('click', function (event) {
    event.preventDefault();
    

    var artistSearch = $("#artistName").val().trim();
    var track = $("#trackName").val().trim();
    // add the autocorrect feature to the URL
    queryURL1 = "http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" + artistSearch + "&track=" + track + "&autocorrect[0|1]&api_key=fa3e05c8a7ec0d30b325339fa17b2c3d&limit=5&format=json";
    
    
    if ($("#artistName").val() === "") {
        alert("Please enter an Artist");
        event.preventDefault();
    }
    if ($('#trackName').val() === "") {
        alert("Please enter a Track");
        /// console log errors ///
        // needs work the prevent default doesnt stop it. break does some cool things but prevents the form from submitting
        event.preventDefault();
        // break;
    } 
    
    

    $.ajax({

        url: queryURL1,
        method: "GET"

    }).then(function(response){

        // console.log(queryURL);
        // console.log(response);
        var result = response.similartracks.track;
        
        console.log(result);

        for (var i = 0; i < result.length; i++) {

            var trackResults = $('<p>').text('Track: ' + result[i].name);
            var artistNames = $('<p>').text('Artist: ' + result[i].artist.name);

            $('#artistPost').append(trackResults);
            $('#artistPost').append(artistNames);

        }

        // taste drive ajax call 
        queryURL2 = "https://tastedive.com/api/similar?limit=3&q" + artistSearch + "&type=music&info=1&verbose=1&k=346849-Project1-81C8Z2D3";
        console.log(queryURL2);

        $.ajax({

            url: queryURL2,
            method: "GET",
            dataType: 'jsonp'

        }).then(function (response) {
        
            var result = response.Similar.Results;
            console.log('similar results', result);
            for (var i = 0; i < result.length; i++) {
                // console.log('hi');
                console.log(result[i].Name);

                // this has to be fixed to a like w a href yet. that should allow the video to appear or at least giv a link
                var similarArtistsVideos = $('<p>').text('(According to TasteDive) Similar Video: ' + result[i].yUrl);

                $('#artistPost').append(similarArtistsVideos);
            }

        })
    });



});

// function checkInputFields() {

//     if ($('trackInput').val === "") {
//         alert("wrong");
//         return false;
//     }

// }