// Taste Drive API key (quota/limit per hour is 300) - 346849-Project1-81C8Z2D3
// https://tastedive.com/api/similar?q=" + artistSearch + "&info=1&verbose=1
var favoriteArtist = [];
$("#submit").on('click', function (event) {
    event.preventDefault();
    $("#artistPost").empty();
    $("#artist").empty();
    

    var artistSearch = $("#artistName").val().trim();

    $("#artist").append($(`<h2>Similar artist to ${artistSearch}!</h2> <h4>Click on the photo of the artist to check them out on YouTube</h4>`));
    // var track = $("#trackName").val().trim();
    // add the autocorrect feature to the URL
    queryURL1 = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist="+artistSearch+"&limit=20&api_key=fa3e05c8a7ec0d30b325339fa17b2c3d&format=json"
    
    // if ($("#artistName").val() === "") {
    //     alert("Please enter an Artist");
    //     event.preventDefault();
    if ($("#artistName").val() === "") {
        swal("Wait a second...", "Enter an Artist", "error",{
            button: "Got it :)",
        });
        event.preventDefault();
    }
    // if ($('#trackName').val() === "") {
    //     alert("Please enter a Track");
        /// console log errors ///
        // needs work the prevent default doesnt stop it. break does some cool things but prevents the form from submitting
        // event.preventDefault();
        // break;
    // }
    

    
    

    $.ajax({

        url: queryURL1,
        method: "GET"

    }).then(function(response){

        // console.log(queryURL);
        // console.log(response);
        var result = response.similarartists.artist;
        
        // console.log(result);

        for (var i = 0; i < result.length; i++) {

            // var trackResults = $('<p>').text('Track: ' + result[i].name);
            // var artistNames = $('<p>').text('Artist: ' + result[i].name);
            var musician = result[i].name;

            var queryURL3 = "https://rest.bandsintown.com/artists/" + musician + "?app_id=codingbootcamp";
       $.ajax({
           url: queryURL3,
           method:"GET"
       }).then(function(response){
        //    console.log(queryURL3);
        //    console.log(response);
            // var starIndex = favoriteArtist.indexOf(musicianName)
            // var isStar = starIndex!== -1 ? 'fas':'far';
            // var id = $(this).attr('data-id');
           var musicianImage = response.thumb_url;
           var musicianName= response.name;
            if(musicianName===undefined){

            }else{
                if (favoriteArtist.includes(musicianName) === false){
           $("#artistPost").append($(`
           <p>
           <i class="far fa-star favorite" data-id="${musicianName}" data-star="far"></i>
             <a href="http://www.youtube.com/results?search_query=${musicianName} top track music video" target="blank">
             <img src="${musicianImage}" id="artistPhoto">
                 </a>
                 ${musicianName}
            </p>`))}else{ $("#artistPost").append($(`
            <p>
            <i class="fas fa-star favorite" data-id="${musicianName}" data-star="fas"></i>
              <a href="http://www.youtube.com/results?search_query=${musicianName} top track music video" target="blank">
              <img src="${musicianImage}" id="artistPhoto">
                  </a>
                  ${musicianName}
             </p>`))

            }
        
        
        
        }
            // artistNames.attr('value', musician);
            // artistNames.attr('id', "musician");
            // var artistNames = $(`<p id="musician" value="${musician}">`).text('Artist: ' + musician);
            $("#artistName").val("");
        });
        

        // taste drive ajax call 
    //     queryURL2 = "https://tastedive.com/api/similar?limit=5&q" + artistSearch + "&type=music&info=1&verbose=1&k=346849-Project1-81C8Z2D3";
    //     console.log(queryURL2);

    //     $.ajax({

    //         url: queryURL2,
    //         method: "GET",
    //         dataType: 'jsonp'

    //     }).then(function (response) {
        
    //         var result = response.Similar.Results;
    //         console.log('similar results', result);
    //         for (var i = 0; i < result.length; i++) {
    //             // console.log(result[i].Name);

    //             var videoTags = $('<p>')
    //             var similarArtistsVideos = $('<iframe>').text('(According to TasteDive) Similar Video: ' + result[i].yUrl);
    //             similarArtistsVideos.attr('src', result[i].yUrl);


    //             $('#musicVideos').append(videoTags);
    //             $(videoTags).append(similarArtistsVideos);
    //         }

    //     })
    // });

    // var musicianImage = $("#musician").attr("value");
       
        //    for (var i =0; i< response.length; i++){
        //        var artistImage = $("<img>");
        //        artistImage.attr("src", response.thumb_url);
        //        console.log("hi", artistImage);
        //        $("#artistPost").append(artistImage);
            //    console.log("hi", artistImage)
           }
       })


});


function setFavorite(){
    localStorage.setItem('favoriteArtist', JSON.stringify(favoriteArtist));

}

function loadFavorite(){
    var favoriteMusicians =JSON.parse( localStorage.getItem('favoriteArtist'));

    if(Array.isArray(favoriteMusicians)){
        favoriteArtist = favoriteMusicians;
    }
    for(var i=0; i<favoriteArtist.length; i++){
        var queryURL4 = "https://rest.bandsintown.com/artists/" + favoriteArtist[i] + "?app_id=codingbootcamp";
        
        $.ajax({
            url: queryURL4,
            method:"GET"
        }).then(function(response){
            console.log(response);
            console.log(queryURL4);
            
            var musicianImage = response.thumb_url;
            var musicianName= response.name;
            
           $("#favorites").append($(`
           <p>
            <i class="fas fa-times delete" data-id="${musicianName}"></i>
             <a href="http://www.youtube.com/results?search_query=${musicianName} top track music video" target="blank">
             <img src="${musicianImage}" id="artistPhoto">
                 </a>
                 ${musicianName}
            </p>`));


    })
}
}

function favoriteStar(){
           
    var starState =$(this).attr('data-star')
    var id = $(this).attr('data-id');

    if(starState==='far'){
        if (favoriteArtist.includes(id) === false){
        favoriteArtist.push(id);}
        setFavorite();

        $(this).removeClass('far').addClass('fas');
        $(this).attr('data-star', 'fas');
    }else{
        favoriteArtist = favoriteArtist.filter((el) =>el != id);
        setFavorite();

        $(this).removeClass('fas').addClass('far');
        $(this).attr('data-star', 'far');

    }
    $("#favorites").empty();
    loadFavorite();

};
function removeFavorite(event){
    event.preventDefault();
    var id = $(this).attr('data-id')
    favoriteArtist = favoriteArtist.filter((el) =>el != id);
        setFavorite();

        $(this).removeClass('fas').addClass('far');
        $(this).attr('data-star', 'far');

        $("#favorites").empty();
        loadFavorite();
    

}

$(document).on('click', '.delete', removeFavorite)
$(document).on('click', '.favorite', favoriteStar,);
console.log(favoriteArtist);

loadFavorite();
