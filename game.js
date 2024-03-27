var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//start game function
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    newSequence();
    started = true;
  }
});

//query to detect mouse click on a button
$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

//the game function
function newSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeIn(100);

  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}

//check answer function
function checkAnswer(currentLevel) {
  // Check if the LAST button clicked is right
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("correct");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        newSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    var wrong = document.querySelector("body");
    wrong.classList.add("game-over");

    setTimeout(function () {
      wrong.classList.remove("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//function to animate button press
function animatePress(currentColor) {
  var activeButton = document.querySelector("." + currentColor);

  activeButton.classList.add("pressed");

  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}

/*Hi the problem is that there is a difference in the logic flow between the two options. So for option 1, the first if statement checks the whether the current level's click is the same as the gamepattern's current level button and this will carry on for every click the user does until eventually he has clicked the correct number of buttons, at which time the second if statement will become true.

Option 1:

Step 1:     Level 1:     gamePattern = ["green"]     userClickedPattern = []   

User clicks green then,

Step 2:     Level 1:     gamePattern = ["green"]     userClickedPattern = ["green"]

So the first if statement is true, the second if statement is true and so nextSequence() will be called.

Step 3:     Level 2:     gamePattern = ["green", "yellow"]     userClickedPattern = []

User's 1st click is green then,

Step 4:     Level 2:     gamePattern = ["green", "yellow"]     userClickedPattern = ["green"]

At this stage, user has passed the first if statement, however, the second if statement is not yet true

User's 2nd click is yellow then,

Step 5:     Level 2:     gamePattern = ["green", "yellow"]     userClickedPattern = ["green", "yellow"]

At this stage, the first if statement is true and the second if statement is true. We have checked that he has matched the colors every step of his clicks using the first conditional and we have finally checked that he is done using the second if statement (the length property).

This pattern continues on and hence the code works just like the game is intended.



Option 2:

For option 2, it does not work because the second if statement checks the exact same thing as the first if statement so let's say in level 2, once the user carries out his first click like in Step 4,

Step 4:     Level 2:     gamePattern = ["green", "yellow"]     userClickedPattern = ["green"]

This is enough to pass both if statements and your nextSequence() gets called before the user even performs his second click. You can verify this by trying to play the game with option 2. All you need to do is perform the first click correctly and you will advance along the levels. 

*/
