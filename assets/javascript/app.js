$(function() {
	    populateButtons(celebrities, 'celebrityButton', '#celebrityButtons');

});


var celebrities = ["will ferrell", "zach galifianakis", "kristen wiig", "zach braff", "paris hilton", "the rock", 
"rainn wilson", "steve carell", "jenna fischer", "john kransinski", "kim kardashian", "kanye west", 
"kevin hart", "jerry seinfeld", "jimmy fallon", "aziz ansari", "chevy chase", "tina fey", 
"tom hanks", "amy poehler", "justin bieber"];


function populateButtons(arrayToUse, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++){
        var a = $('<button>')
        a.addClass(classToAdd);
        a.attr('data-type', arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
    }

}

$(document).on('click', '.celebrityButton', function(){
    $('#addCelebrity').removeClass('active');
    $(this).addClass('active');
    var type = $(this).data('type');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=MX71wGj3vfXPiCjXefRU4eeG3u9861pS&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
         var results = response.data;


         for(var i=0; i < results.length; i++){
             var celebrityDiv = $('<div class="celebrity-item">')
             var rating = results[i].rating;
             var p = $('<p>').text( "Rating: " + rating);

             var animated = results[i].images.fixed_height.url;
             var still = results[i].images.fixed_height_still.url;

             var celebrityImage = $('<img>');
             celebrityImage.attr('src', still);
             celebrityImage.attr('data-still', still);
             celebrityImage.attr('data-animate', animated);
             celebrityImage.attr('data-state', 'still')
             celebrityImage.addClass('celebrityImage');
             celebrityDiv.prepend(p)
             celebrityDiv.prepend(celebrityImage)

             $('#celebrities').prepend(celebrityDiv);
         }
});
});

$(document).on('click', '.celebrityImage', function(){
    var state = $(this).attr('data-state'); 
    
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$('#addCelebrity').on('click', function(){
    var newCelebrity = $('input').eq(0).val();

    if (newCelebrity.length > 2){
        celebrities.push(newCelebrity);
    }

    populateButtons(celebrities, 'celebrityButton', '#celebrityButtons');

    return false;
});