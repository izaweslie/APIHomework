// Initial array of animals
var animals = ["Elephant", "Fennec Fox", "Humpback Whale", "Red Panda", "Sea Turtle", "Welsh Corgi"];

// displayAnimalGif function re-renders the HTML to display the appropriate content
function displayAnimalGif() {

	$("#animals-view").empty();
	var animal = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	animal + "&api_key=dc6zaTOxFJmzC&limit=10";

	// Creating an AJAX call for the specific animal button being clicked
	$.ajax({
	url: queryURL,
	method: "GET"
	})
		
		// After data comes back from the request
		.done(function(response) {
			console.log(queryURL);

			console.log(response);

			// storing the data from the AJAX request in the results variable
			var results = response.data;

			// Looping through each result item
			for (var i = 0; i < results.length; i++) {

				// Creating and storing a div tag
				var animalDiv = $("<div>");

				// Creating a paragraph tag with the result item's rating
				var p = $("<p>").text("Rating: " + results[i].rating);

				// Creating and storing an image tag
				var animalImage = $("<img>");
				//adding class to images
				animalImage.addClass("gif");
				// Setting the src attribute of the image to a property pulled off the result item
				animalImage.attr("src", results[i].images.fixed_height.url);

				// Appending the paragraph and image tag to the animalDiv
				animalDiv.append(p);
				animalDiv.append(animalImage);

				// Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
				$("#animals-view").prepend(animalDiv);
		}
	})
};

// Function for displaying animal data
function renderButtons() {

	// Deleting the animals prior to adding new animals
	// (this is necessary otherwise you will have repeat buttons)
	$("#buttons-view").empty();

		// Looping through the array of animals
		for (var i = 0; i < animals.length; i++) {

			// Then dynamicaly generating buttons for each animal in the array
			// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
			var a = $("<button>" + "	");
			// Adding a class of animal to our button
			a.addClass("animal");
			// Adding a data-attribute
			a.attr("data-name", animals[i]);
			// Providing the initial button text
			a.text(animals[i]);
			// Adding the button to the buttons-view div
			$("#buttons-view").append(a);
	}
}

// This function handles events where a animal button is clicked
$("#add-animal").on("click", function(event) {
	event.preventDefault();
	// This line grabs the input from the textbox
	var animal = $("#animal-input").val().trim();

	// Adding animal from the textbox to our array
	animals.push(animal);

	// Calling renderButtons which handles the processing of our animal array
	renderButtons();
});

// Adding a click event listener to all elements with a class of "animal"
$(document).on("click", ".animal", displayAnimalGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();


//create a variable or function set to still === response.data.images.fixed_height_still.url
//create a variable or function set to nullify still

// Adding a click event listener to all elements with a class of "gif"
$(".gif").on("click", function() {

// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
var state = $(this).attr("data-state");

// If the clicked image's state is still, update its src attribute to what its data-animate value is.
// Then, set the image's data-state to animate
// Else set src to the data-still value
if (state === "still") {
$(this).attr("src", $(this).attr("data-animate"));
$(this).attr("data-state", "animate");
} else {
$(this).attr("src", $(this).attr("data-still"));
$(this).attr("data-state", "still");
}
});