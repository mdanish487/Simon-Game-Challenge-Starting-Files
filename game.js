// -------------------------------------------------------------------------------
var started = false;

var level = 0;
var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
// -------------------------------------------------------------------------------

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// --------------------------------------------------------------------------------

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
  playSound(userChosenColour + ".mp3");
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  
});

// -----------------------------------------------------------------------------------

function nextSequence() {

  userClickedPattern=[];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor + ".mp3");
}

// -------------------------------------------------------------------------------

function playSound(fileName) {
  var audio = new Audio("sounds/" + fileName);
  audio.play();
}

// -------------------------------------------------------------------------------

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
// --------------------------------------------------------------------------------

function checkAnswer(currentLevel) {
  
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
    console.log("success");
if (userClickedPattern.length===gamePattern.length) {
  setTimeout(function () {
    nextSequence();
  }, 1000);
}

  } else {
    console.log("wrong");
    playSound("wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    },200);
    $("h1").text( "Game Over, Press Any Key to Restart");
    startOver();
  }
}

// --------------------------------------------------------------------------

function startOver() {
  level=0;
  gamePattern=[];
  started=false;
}