// Declare variables and list
var minInput = -1;
var maxInput = -1;
var studyMethodList = [
[0.5, 3, "Using the Feynman technique"], 
[0.1, 1, "Rereading notes"], 
[1, 4, "Creating + reviewing Anki flashcards"], 
[0.5, 1.5, "Primming/pre-studying"],
[1, 2.5, "Blurting"],
[2, 8, "Using the Pomodoro technique"],
[0.25, 2, "Solving online practice problems"],
[0.5, 2, "Mindmapping"],
[4, 8, "Cramming"],
[2, 6, "Group studying"]
];

// On-event handler
onEvent("suggestButton", "click", function( ) {
  minInput = getNumber("minimumInput");
  maxInput = getNumber("maximumInput");
  if (maxInput < minInput) {
    setText("output", "Invalid input");
  } else {
    setText("output", "Some study methods you should look into are:"
    + getFilteredStudyMethods(minInput, maxInput));
  }
});

// Core function
function getFilteredStudyMethods(minHours, maxHours) {
  var filteredStudyMethods = [];
  for (var i = 0; i < studyMethodList.length; i++) {
    if (minHours <= studyMethodList[i][1] && studyMethodList[i][0] <= maxHours){
      appendItem(filteredStudyMethods, "\n" + studyMethodList[i][2]);
    }
  }
  if (filteredStudyMethods.length == 0) {
    return "\n" + "None (try adjusting your inputs)";
  } else {
    return filteredStudyMethods;
  }
}
