var questionIndex = 0;
var time = questions.length * 15; 
var timerId;

var questionEl = document.getElementById("question"); 
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices"); 
var buttonSubmit = document.getElementById("submit");
var buttonStart = document.getElementById("start");
var initialEl = document.getElementById("initials"); 
var feedbackEl = document.getElementById("feedback");

function startQuiz() {
    var startScreen = document.getElementById("start-screen");
    
    startScreen.setAttribute("class", "start hide");
    
    questionEl.setAttribute("class", " ");
    
    timerId = setInterval(function() {
     clockTick();
    } , 1000);
    
    timerEl.textContent = time;
    
    getQuestion();
}

function getQuestion() {
    var activeQuestion = questions[questionIndex];
    console.log(questions, questionIndex)
    questionEl.children[0].textContent = activeQuestion.question;

    while (choicesEl.hasChildNodes()) {
        choicesEl.removeChild(choicesEl.lastChild);
    }
    for(var i = 0; i < activeQuestion.choices.length; i++) {
        var choiceButton = document.createElement("button");
        
        choiceButton.textContent = activeQuestion.choices[i];
        
        choicesEl.appendChild(choiceButton);
    }
    choicesEl.children[0].addEventListener("click", function(event){
        questionClick(choicesEl.children[0]);
    });
    choicesEl.children[1].addEventListener("click", function(event){
        questionClick(choicesEl.children[1]);
    });
    choicesEl.children[2].addEventListener("click", function(event){
        questionClick(choicesEl.children[2]);
    });
    choicesEl.children[3].addEventListener("click", function(event){
        questionClick(choicesEl.children[3]);
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

    questionIndex++;

if(questionIndex === questions.length)
    quizEnd();
else
    getQuestion();
}

function quizEnd() {
    clearInterval(timerId);
    timerEl.textContent = time;

    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.setAttribute("class", "");

    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    questionEl.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0)
    quizEnd();
}

function saveHighscore() {
    var initials = initialEl.value.toUpperCase();
    if(initials === "") {
        alert("Input must not be blank.");
        return;
    } else if(initials.length > 3) {
        alert("Input must be no more than 3 letters.");
        return;
    } else {
        var highscores;
        
        if(JSON.parse(localStorage.getItem("highscores")) != null)
          highscores = JSON.parse(window.localStorage.getItem("highscores"));
      
          else highscores = [];
        
          var newScore = {
            initials: initials,
            score: time 
        };
    highscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    location.href = "highscores.html";
}
}

function checkForEnter(event) {
    if(event.keycode === 13)
    saveHighscore();
}

buttonSubmit.onclick = saveHighscore;

buttonStart.onclick = startQuiz;

initialEl.onkeyUp = checkForEnter;