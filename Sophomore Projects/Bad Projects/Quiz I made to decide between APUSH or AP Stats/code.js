onEvent("homeButton", "click", function( ) {
  setScreen("question1");
});
// home screen





// question 1

onEvent("q1Yes", "click", function( ) {
  setScreen("Stats");
});
onEvent("q1No", "click", function( ) {
  setScreen("question2");
});
onEvent("q1IDK", "click", function( ) {
  setScreen("question2");
});






// question 2

onEvent("q2yes", "click", function( ) {
  setScreen("Stats");
});
onEvent("q2no", "click", function( ) {
  setScreen("APUSH");
});
onEvent("q2idk", "click", function( ) {
  setScreen("question3");
});






// question 3
onEvent("q3yes", "click", function( ) {
  setScreen("Stats");
});
onEvent("q3no", "click", function( ) {
  setScreen("APUSH");
});
