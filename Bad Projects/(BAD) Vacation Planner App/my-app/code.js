// Declare variables
var locationArea = "Beach";
var budget = 0;
var season = "Summer";

// On events
onEvent("locationInput", "change", function( ) {
  locationArea = getText("locationInput");
  console.log(locationArea);
  updateScreen();
});


onEvent("budgetInput", "keyup", function( ) {
  budget = getNumber("budgetInput");
  console.log(budget);
  updateScreen();
});


onEvent("seasonInput", "change", function( ) {
  season = getText("seasonInput");
  console.log(season);
  updateScreen();
});


// The updateScreen function is called each time an input field (location, budget, season) changes.
// It checks the values of the input fields and displays a recommended vacation package in the output field, or a message
// if no recommendations match the criteria. This allows the recommendations to update live as the user adjusts their search preferences.


function updateScreen() {
if (locationArea == "Beach" && budget < 1000 && season == "Summer") {
  setText("output", "We recommend Panama City Beach, FL. Package includes beachfront hotel for 7 nights and car rental.");
} else if (locationArea == "Mountains" && ((budget > 1000 && season == "Spring") || season == "Summer")) {
  setText("output", "For the mountains in spring or summer, consider Asheville, NC. Package includes lodging at a cabin and hiking tours.");
} else if (locationArea == "City" && budget > 2000 && season != "Winter") {
  setText("output", "For a high budget city trip outside of winter, check out a week in San Francisco. Package includes downtown hotel and activity passes.");
} else {
  setText("output", "Based on your criteria, we don't have recommendations. Please adjust your preferences and try again.");
}
}

