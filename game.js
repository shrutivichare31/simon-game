
var buttonColours = ["red", "yellow", "blue", "green"];
var gamePattern = [];
var userClickedPattern = [];
var level = -1;
var stated = false;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

}
/*check user answer*/
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence()
            }
                , 1000);
        }
    }
    else {
        startOver();
    }

}
/*restart the game*/
function startOver() {
    var audio = new Audio("wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over");
    gamePattern=[];
    setTimeout(function () {
        $("body").removeClass("game-over")
    }, 200)

    setTimeout(function () {
        $("#level-title").text("Press Any Key to Restart");
        stated = false;
        level = -1
    }, 1000);
}

/*animation*/
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);

}

/*sound play */
function playSound(name) {
    var audio = new Audio(name + ".mp3");
    audio.play();
}

/* which button presses*/
$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

/*start*/
$(document).keydown(function () {
    if (!stated) {
        nextSequence();
        $("#level-title").text("level " + level);
        stated = true;
    }

});







