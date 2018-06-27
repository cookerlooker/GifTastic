// create an array of  50's, 60's and 70's cartoons
var cartoons = ["Speed Racer", "Yogi Bear", "Alvin and the Chipmunks", "The Funky Phantom", "Deputy Dawg", "The Flintstones", "The Jetsons", "Scooby Doo, Where Are You!", "Josie and the Pussycats", "Casper and the Friendly Ghost", "Underdog", "Tennessee Tuxedo & Chumley", "Inch High Private Eye", "Super Friends"];
// creates buttons for each item of the array
function makeButtons() {
    // deletes the cartoons prior to adding new cartoons so there are no repeat buttons
    $('#selectButtons').empty();
    // loops through the cartoons array
    for (var i = 0; i < cartoons.length; i++) {
        // dynamically makes buttons for every cartoon in the array
        var a = $('<button>')
        a.addClass('cartoon'); // add a class
        a.attr('data-name', cartoons[i]); // add a data-attribute
        a.text(cartoons[i]); // make button text
        $("#selectButtons").append(a); // append the button to the selectButtons div
    }
}

// handles addCartoon button event
$("#addCartoon").on("click", function () {

    // grabs the user cartoon input
    var cartoon = $("#cartoon-input").val().trim();
    // that input is now added to the array
    cartoons.push(cartoon);
    // the makeButtons function is called, which makes buttons for all my cartoons plus the user cartoon
    makeButtons();
    // line for user to hit "enter" instead of clicking the submit button
    return false;
})



// function for animating giphs
$(document).on('click', '.gif', function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    };
});
// function for displaying cartoon gifs
$(document).on("click", ".cartoon", displayGifs);

// initially calls the makeButtons function
makeButtons();




// function to display gifs
function displayGifs() {
    var cartoon = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=vlyzX14ISq2ePK9whWcHiHQirvFu2hWE&limit=10&rating";
    console.log(queryURL)//display the URL construct
    // creates ajax call    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response.data);

        // save results as a variable
        var results = response.data;
        // for loop goes through each gif and adds these variables
        for (var i = 0; i < results.length; i++) {
            // creates a variable of a generic div to hold the results
            var giphDiv = $('<div class=gifs>');
            var cartoonGiph = $('<img>');
            cartoonGiph.attr('src', results[i].images.fixed_height_still.url);
            // cartoons the rating on hover
            cartoonGiph.attr('title', "Rating: " + results[i].rating);
            cartoonGiph.attr('data-still', results[i].images.fixed_height_still.url);
            cartoonGiph.attr('data-state', 'still');
            cartoonGiph.addClass('gifs');
            cartoonGiph.attr('data-animate', results[i].images.fixed_height.url);
            // var rating = results[i].rating;
            // var p = $('<p>').text('Rating: ' + rating);
            
            giphDiv.append(cartoonGiph)
            // giphDiv.append(p)

            $("#gifsView").prepend(giphDiv);
        }

    });
}
