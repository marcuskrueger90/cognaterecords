// Taste Drive API key (quota/limit per hour is 300) - 346849-Project1-81C8Z2D3
// https://tastedive.com/api/similar?q=" + artistSearch + "&info=1&verbose=1

$("#submit").on('click', function (event) {
    event.preventDefault();
    

    var artistSearch = $("#artistName").val().trim();
    var track = $("#trackName").val().trim();
    // add the autocorrect feature to the URL
    queryURL1 = "http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" + artistSearch + "&track=" + track + "&autocorrect[0|1]&api_key=fa3e05c8a7ec0d30b325339fa17b2c3d&limit=5&format=json";
    
    
        if ($("#artistName").val() === "") {
        swal("Wait a second...", "Enter an Artist", "error",{
            button: "Got it :)",
        });
        event.preventDefault();
    } else if ($('#trackName').val() === "") {
            swal("Wait another second...", "Enter a track", "error", {
                button: "For sure got it (:"
            });
            event.preventDefault();
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
            // var musician = result[i].artist.name;
            // artistNames.attr('value', musician);
            // artistNames.attr('id', "musician");
            // var artistNames = $(`<p id="musician" value="${musician}">`).text('Artist: ' + musician);

            $('#artistPost').append(trackResults);
            $('#artistPost').append(artistNames);

        }

        // taste drive ajax call 
        queryURL2 = "https://tastedive.com/api/similar?limit=5&q" + artistSearch + "&type=music&info=1&verbose=1&k=346849-Project1-81C8Z2D3";
        console.log(queryURL2);

        $.ajax({

            url: queryURL2,
            method: "GET",
            dataType: 'jsonp'

        }).then(function (response) {
        
            var result = response.Similar.Results;
            console.log('similar results', result);
            for (var i = 0; i < result.length; i++) {
                // console.log(result[i].Name);

                var videoTags = $('<p>')
                var similarArtistsVideos = $('<iframe>').text('(According to TasteDive) Similar Video: ' + result[i].yUrl);
                similarArtistsVideos.attr('src', result[i].yUrl);


                $('#musicVideos').append(videoTags);
                $(videoTags).append(similarArtistsVideos);
            }

        })
    });

    // var musicianImage = $("#musician").attr("value");
    //    var queryURL3 = "https://rest.bandsintown.com/artists/" + musicianImage + "?app_id=codingbootcamp";
    //    $.ajax({
    //        url: queryURL3,
    //        method:"GET"
    //    }).then(function(response){
    //        console.log(queryURL3);
    //        console.log(response);
    //        for (var i =0; i< response.length; i++){
    //            var artistImage = $("<img>");
    //            artistImage.attr("src", response.thumb_url);
    //            console.log("hi", artistImage);
    //            $("#artistPost").append(artistImage);
    //         //    console.log("hi", artistImage)
    //        }
    //    })


});


// this function is for getting images through last.fm -- not working yet 

// function ajaxImages() {

//     queryURL3 = "http://ws.audioscrobbler.com/2.0/?method=track.getinfo&artist=" + artistSearch + "&track=" + track + "&autocorrect[0|1]&api_key=fa3e05c8a7ec0d30b325339fa17b2c3d&limit=5&format=json"

//     $.ajax({
        
//         url: queryURL3,
//         method: "GET"

//     }).then(function (response) {
        

//     })


// }