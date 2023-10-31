var timeId;
var questionIndex = 0;
var time = questions.length * 15; 

var buttonStart = $("#start"); //start button
var timeEl = $("#time");
var questionEl = $("#questions"); //questions
var userInput = $("#choices"); 
var initialEl = $("#initials"); //user initials
var buttonSubmit = $("#submit");
var feedbackEl = $("#feedback");

var questions = [
    { question: "In HTML, an ordered list is created using which tag?",
      choices: ["<ul>", "<al>", "<ol>", "<nl>"],
      answer: "<ol>"
    }, {
      question: "Commonly used data types DO NOT include:",
      choices: ["numbers", "strings", "booleans", "alerts"],
      answer: "alerts"
    }, {
      question: "The condition in an if/else statement is enclosed with ____.",
      choices: ["quotes", "square brackets", "parentheses", "curly brackets"],
      answer: "quotes"
    }, {
      question: "Arrays in JavaScript can be used to store ____.",
      choices: ["numbers", "booleans", "strings", "all of the above"],
      answer: "all of the above"
    }, {
      question: "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["parenthesis", "quotes", "commas", "curly brackets"],
      answer: "quotes"
    }, {
      question: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["console.log", "bash/terminal", "for loops", "if statements"],
      answer: "console.log"
    }
];

function startQuiz() {
    var startScreen = document.getElementById("start");
    startScreen.setAttribute("class", "start hidden");
    questionEl.setAttribute("class", " ");
    timeId = setInterval(function() {
     clockTick();
    } , 1000);
    timeEl.textContent = time;
    getQuestion();
}

function getQuestion() {
    var activeQuestion = questions[questionIndex];
    questionEl.children[0].textContent = activeQuestion.title;

    while (userInput.hasChildNodes()) {
        userInput.removeChild(userInput.lastChild);
    }
    for(var i = 0; i < activeQuestion.choices.length; i++) {
        var choiceButton = document.createElement("button");
        choiceButton.textContent = activeQuestion.choices[i];
        userInput.appendChild(choiceButton);
    }
    userInput.children[0].addEventListener("click", function(event){
        questionClick(userInput.children[0]);
    });
    userInput.children[1].addEventListener("click", function(event){
        questionClick(userInput.children[1]);
    });
    userInput.children[2].addEventListener("click", function(event){
        questionClick(userInput.children[2]);
    });
    userInput.children[3].addEventListener("click", function(event){
        questionClick(userInput.children[3]);
    });

}

function questionClick(answerChoice) {
    if (answerChoice.textContent != questions[questionIndex].answer) {
        time -= 10;
        feedbackEl.textContent = "Wrong!";
    } else {
        feedbackEl.textContent = "Correct!";
    }
    feedbackEl.setAttribute("class", "feedback");
    setInterval(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 500);

    questionIndex ++;

if(questionIndex === questions.length)
    quizEnd();
else
    getQuestion();
}

function quizEnd() {
    clearInterval(timeId);
    timeEl.textContent = time;

    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.setAttribute("class", " ");

    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    questionEl.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timeEl.textContent = time;
    if (time<=0)
    quizEnd();
}

function saveHighscore() {
    var initials = initialEl.value.toUpperCase();
    if(initials === " ") {
        alert("Input must not be blank.");
        return;
    } else if(initials.length > 3) {
        alert("Input must be no more than 3 letters.");
        return;
    }
}