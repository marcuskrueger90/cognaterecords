

$(document).ready(function () {

    // $('#artistPost').hide();

   $("#submit").on('click', function (event) {

       event.preventDefault();
    // //    $('#artistPost').show();
    //    var tr = $('<tr class="text-center">');
    //    var th = $('<th class="text-center h4">')
    //    var th2 = $('<th class="text-center h4">');
    //    th2.attr('scope', 'col');
    // //    th2.addClass('text-center');
    // //    th2.addClass('h4');
    //    th2.text('Tracks') 

    //    th.attr('scope', 'col');
    // //    th.addClass('text-center');
    // //    th.addClass('h4');
    //    th.text('Artists')
       
    //    tr.append(th);
    //    tr.append(th2);
    //    var thread = $('<thread>');
    //    thread.append(tr);
    //    $('#artistPost').append(thread);
       
    //    var tbody = $('<tbody id="similarResultsText">');
    //    $('#artistPost').append(tbody);
       
       
       $('#similarResultsText').empty();
       $('#musicVideos').empty();
       
       var artistSearch = $("#artistName").val().trim();
       var track = $("#trackName").val().trim();
       
       queryURL1 = "http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" + artistSearch + "&track=" + track + "&autocorrect[0|1]&api_key=fa3e05c8a7ec0d30b325339fa17b2c3d&limit=8&format=json";
       
       
       
       if ($("#artistName").val() === "") {
        swal("Hold up..", "Enter an artist", "error",{
            buttons: false,
            timer: 3000,
        });
        event.preventDefault();
        } else if ($('#trackName').val() === "") {
            swal("Hold up again..", "Enter a track", "error", {
                button: false,
                timer: 3000,
            });
           event.preventDefault();
       }
       

       $.ajax({

           url: queryURL1,
           method: "GET"

       }).then(function (response) {

           var result = response.similartracks.track;
            
           // console.log(result);
           
           for (var i = 0; i < result.length; i++) {
               var parentContainer = $("<tr class='align-content-center'>");
               var trackResults = $('<td class="trackResults text-center">').html(result[i].name);
               var artistNames = $('<td class="artistName text-center">').html(result[i].artist.name);
               $('#similarResultsText').append(parentContainer);
               $(parentContainer).append(artistNames);
               $(parentContainer).append(trackResults);

           }

           // taste drive ajax call 
           queryURL2 = "https://tastedive.com/api/similar?limit=5&q=" + artistSearch + "&type=music&info=1&verbose=1&k=346849-Project1-81C8Z2D3";
           console.log(queryURL2);

           $.ajax({

               url: queryURL2,
               method: "GET",
               dataType: 'jsonp'

           }).then(function (response) {
           
               var result = response.Similar.Results;
               // console.log('similar results', result);

               for (var i = 0; i < result.length; i++) {
                   // console.log(result[i].Name);
                   var embedID = result[i].yID;
                   var videoTags = $('<div class="col-4 mb-4">');
                   var similarArtistsVideos = $('<iframe>').attr('src', 'http://www.youtube.com/embed/' + embedID);


                   $('#musicVideos').append(videoTags);
                   $(videoTags).append(similarArtistsVideos);

               }

           })
       });


   });
})