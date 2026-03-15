//The program has FIVE screens, but there's mutliple ways to get to each one
//Program start
console.log("New program started! Screen 1/5");
playSound("assets/-ohio--madeinohio--dance--walk.mp3", false);


//Table of contents intro screen buttons
onEvent("introControlsButton", "click", function( ) {
  stopSound("assets/-ohio--madeinohio--dance--walk.mp3");
  playSound("assets/category_achievements/vibrate_success_1_up.mp3", false);
  setScreen("controlsScreen");
  console.log("Screen 2/5");
});
onEvent("introSignsButton", "click", function( ) {
  stopSound("assets/-ohio--madeinohio--dance--walk.mp3");
  playSound("assets/category_achievements/vibrate_success_1_up.mp3", false);
  setScreen("signsScreen");
  console.log("Screen 3/5");
});
onEvent("introTipsButton", "click", function( ) {
  stopSound("assets/-ohio--madeinohio--dance--walk.mp3");
  playSound("assets/category_achievements/vibrate_success_1_up.mp3", false);
  setScreen("tipsScreen");
  console.log("Screen 4/5");
});
onEvent("introLicenseButton", "click", function( ) {
  stopSound("assets/-ohio--madeinohio--dance--walk.mp3");
  playSound("assets/category_achievements/vibrate_success_1_up.mp3", false);
  setScreen("licenseScreen");
  console.log("Screen 5/5");
});


//Naviagation system next buttons
onEvent("introNextButton", "click", function( ) {
  stopSound("assets/-ohio--madeinohio--dance--walk.mp3");
  playSound("assets/category_achievements/vibrant_game_slot_machine_win_3.mp3", false);
  setScreen("controlsScreen");
  console.log("Screen 2/5");
});
onEvent("controlsNextButton", "click", function( ) {
  playSound("assets/category_achievements/vibrant_game_slot_machine_win_3.mp3", false);
  setScreen("signsScreen");
  console.log("Screen 3/5");
});
onEvent("signsNextButton", "click", function( ) {
  playSound("assets/category_achievements/vibrant_game_slot_machine_win_3.mp3", false);
  setScreen("tipsScreen");
  console.log("Screen 4/5");
});
onEvent("tipsNextButton", "click", function( ) {
  playSound("assets/category_achievements/vibrant_game_slot_machine_win_3.mp3", false);
  setScreen("licenseScreen");
  console.log("Screen 5/5");
});


//Naviagation system back buttons
onEvent("controlsBackButton", "click", function( ) {
  playSound("assets/-ohio--madeinohio--dance--walk.mp3", false);
  setScreen("introScreen");
  console.log("Screen 1/5");
});
onEvent("signsBackButton", "click", function( ) {
  playSound("assets/category_transition/reverse_sucking_stop_1_low.mp3", false);
  setScreen("controlsScreen");
  console.log("Screen 2/5");
});
onEvent("tipsBackButton", "click", function( ) {
  playSound("assets/category_transition/reverse_sucking_stop_1_low.mp3", false);
  setScreen("signsScreen");
  console.log("Screen 3/5");
});
onEvent("licenseBackButton", "click", function( ) {
  playSound("assets/category_transition/reverse_sucking_stop_1_low.mp3", false);
  setScreen("tipsScreen");
  console.log("Screen 4/5");
});


//Home Buttons
onEvent("controlsHomeButton", "click", function( ) {
  playSound("assets/-ohio--madeinohio--dance--walk.mp3", false);
  setScreen("introScreen");
  console.log("Screen 1/5");
});
onEvent("signsHomeButton", "click", function( ) {
  playSound("assets/-ohio--madeinohio--dance--walk.mp3", false);
  setScreen("introScreen");
  console.log("Screen 1/5");
});
onEvent("tipsHomeButton", "click", function( ) {
  playSound("assets/-ohio--madeinohio--dance--walk.mp3", false);
  setScreen("introScreen");
  console.log("Screen 1/5");
});
onEvent("licenseHomeButton", "click", function( ) {
  playSound("assets/-ohio--madeinohio--dance--walk.mp3", false);
  setScreen("introScreen");
  console.log("Screen 1/5");
});

// images all came from image Google slide search and 
// ARE FREE to use copyright free WITHOUT CITATION

// They also don't tell you the name of where the source came from
// so it's impossible to cite them

