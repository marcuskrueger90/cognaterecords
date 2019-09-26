
$("#submit").on('click', function(){
event.preventDefault();

var artistSearch = $("#artistName").val().trim();
var track = $("#trackName").val().trim();

queryURL = "http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist="+artistSearch+"&track="+track+"&api_key=fa3e05c8a7ec0d30b325339fa17b2c3d&limit=5&format=json";

$.ajax({
    url: queryURL,
    method: "GET"
})
.then(function(response){

    console.log(queryURL);
    console.log(response);




});

});