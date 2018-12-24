$(window).ready(function () {
    var timerRunning = false;
    var intervalId;
    var timeoutId;
    var timeoutInteger;
    var gameClock;
    userScore = 0;
    incorrectGuesses = 0;
    questionArray = ["Which year did the Andy Griffith Show fitst debut?",
        "Where does the show take place?",
        "Which actor played the role of Deputy Fife?",
        "What is the name of Andy Taylor's son in the show?",
        "What is the famous opening theme of the show?",
        "Where was Andy's character of Sheriff first introduced?",
        "What decade is presumed the show was set in?",
        "What hobby do Sheriff Taylor and his son most enjoy?",
        "What was the name of Andy's schoolteacher swearheart who debuted in season 3?",
		"How many seasons of the Show actually was aired?"];
    correctAnswerArray = ["1960", "Mayberry, NC", "Don Knotts", "Opie", "The Fishing Hole", "On the Dnny Thomas Show", "1930s", "Fishing", "Helen Crump", "8"];
    option2Array = ["1961", "Greenville, SC", "Marty Allen", "Ronny", "Gone Fishing", "On the Daily Show", "1940s", "Hunting", "Peggy McMillan", "7"];
    option3Array = ["1956", "Charleston, WV", "Frances Bavier", "Ricky", "Wade the river", "On broadway", "1950s", "Golfing", "Elinor Donahue", "6"];
    option4Array = ["1990", "Overland Park, KS", "Ramsey Noah", "Daniel", "The world's greatest", "On the Ed Sullivan Show", "1960s", "Dancing", "Liz Benzon", "23"];
    var i = 0;

    var triviaGame = {
        timeConverter: function (t) {

            //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            if (minutes === 0) {
                minutes = "00";
            }

            else if (minutes < 10) {
                minutes = "0" + minutes;
            }

            return minutes + ":" + seconds;
        },

        startGame: function () {
            triviaGame.setClickHandler();
        },

        setClickHandler: function () {
            $("#start").on('click', function () {
                $('#start').css("display", "none");
                $('#directions').css("display", "none");
                triviaGame.startInterval();
            });
        },

        startInterval: function () {
            gameClock = 15;
            timerRunning = true;
            var intervalId = setInterval(function () {
                gameClock -= 1;
                $('#timerDisplay').text(triviaGame.timeConverter(gameClock));
                if (gameClock <= 0) {
                    timerRunning = false;
                    incorrectGuesses++;
                    clearInterval(intervalId);
                    gameClock = 90;
                    alert("You ran out of time!");
                    console.log("Incorrect guesses: " + incorrectGuesses);
                    i++;
                    triviaGame.startInterval();
                };
            }, 1000);
            triviaGame.questionArrayLoop();
            triviaGame.answerSelected();
        },

        questionArrayLoop: function () {
            if (i < questionArray.length) {
                $('#question').text(questionArray[i]);
                $('#option1').text(correctAnswerArray[i]);
                $('#option2').text(option2Array[i]);
                $('#option3').text(option3Array[i]);
                $('#option4').text(option4Array[i]);
                console.log("The value of i is: " + i);
            } else {
                timerRunning = false;
                console.log("Game over");
                clearInterval(this.intervalId);
                $('#timer').css("display", "none");
                $('#allOptions').css("display", "none");
                $('#question').css("display", "none");
                $('.option').css("display", "none");
                $('#gameDone').css("display", "initial");
                $('#correctCount').text(userScore);
                $('#incorrectCount').text(incorrectGuesses);
                $('#resetGame').css("display", 'initial');
                triviaGame.restartGame();
            };

        },

        answerSelected: function () {
            $('.correct').on('click', function () {
                timerRunning = false;
                userScore++;
                console.log("User score is: " + userScore);
                $('#allOptions').css("display", "none");
                $('#correctDiv').css("display", "initial")
                function timeoutId() {
                    $('#correctDiv').css("display", "none");
                    $('#allOptions').css("display", "initial");
                };
                var timeoutInteger = setTimeout(timeoutId, 3000);
                i++;
                gameClock = 18;
                triviaGame.questionArrayLoop();
            });

            $('.incorrect').on('click', function () {
                timerRunning = false;
                incorrectGuesses++;
                console.log("Incorrect guesses are: " + incorrectGuesses);
                $('#correctAnswer').text(correctAnswerArray[i]);
                $('#allOptions').css("display", "none");
                $('#incorrectDiv').css("display", "initial");
                function timeoutId() {
                    $('#incorrectDiv').css("display", "none");
                    $('#allOptions').css("display", "initial");
                };
                var timeoutInteger = setTimeout(timeoutId, 3000);
                i++;
                gameClock = 18;
                triviaGame.questionArrayLoop();
            });
        },

        restartGame: function () {
            $('#resetGame').on('click', function () {
                gameClock = 15;
                timerRunning = true;
                userScore = 0;
                incorrectGuesses = 0;
                i = 0;
                $('#resetGame').css("display", "none");
                $('#correctCount').css("display", "none");
                $('#incorrectCount').css("display", "none");
                $('#gameDone').css("display", "none");
                $('#timer').css("display", "initial");
                $('#question').css("display", "initial");
                $('#option1').css("display", "initial");
                $('#option2').css("display", "initial");
                $('#option3').css("display", "initial");
                $('#option4').css("display", "initial");
                // triviaGame.answerSelected();
                // triviaGame.questionArrayLoop();
            })
        }
    };
    triviaGame.startGame();
});