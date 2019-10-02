var favoriteArtist = [];

$("#submit").on('click', function (event) {

    event.preventDefault();

    $("#artistPost").empty();

    var artistSearch = $("#artistName").val().trim();
    
    queryURL1 = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist="+artistSearch+"&limit=10&api_key=fa3e05c8a7ec0d30b325339fa17b2c3d&format=json"
    
    if ($("#artistName").val() === "") {
        swal("Hold up..", "Enter an artist", "error",{
            buttons: false,
            timer: 3000,
        });
        event.preventDefault();
    } 
    

    $.ajax({

        url: queryURL1,
        method: "GET"

    }).then(function(response){

        // console.log(queryURL);
        // console.log(response);
        var result = response.similarartists.artist;
        
        // console.log(result);

        for (var i = 0; i < result.length; i++) {

            var musician = result[i].name;

            var queryURL3 = "https://rest.bandsintown.com/artists/" + musician + "?app_id=codingbootcamp";
            $.ajax({
                url: queryURL3,
                method:"GET"
            }).then(function(response){
        
                var musicianImage = response.thumb_url;
                var musicianName= response.name;
                if(musicianName===undefined){

                }else{
                $("#artistPost").append($(`
                <p>
                <i class="far fa-star favorite" data-id="${musicianName}" data-star="far"></i>
                <a href="http://www.youtube.com/results?search_query=${musicianName}" target="blank">
                <img src="${musicianImage}">
                </a>
                 ${musicianName}
                </p>`))}
            

            });
        
        }

    })


});

function favoriteStar(){
           
    var starState =$(this).attr('data-star')
    var id = $(this).attr('data-id');

    if(starState==='far'){
        favoriteArtist.push(id);
        $(this).removeClass('far').addClass('fas');
        $(this).attr('data-star', 'fas');
    }else{
        favoriteArtist = favoriteArtist.filter((el) =>el != id);
        $(this).removeClass('fas').addClass('far');
        $(this).attr('data-star', 'far');

    }
    

}

$(document).on('click', '.favorite', favoriteStar);