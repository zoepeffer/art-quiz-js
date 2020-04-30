"use strict";

// select all elements
const login = document.getElementById("login");
const hallo = document.getElementById("hallo");
const newuser = document.getElementById("newuser");

const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Who has the longest name?",
        imgSrc : "img/question-asset-1.png",
        choiceA : "Pablo Picasso",
        choiceB : "Andy Warhol",
        choiceC : "Salvador Dalí",
        correct : "A"
    },{
        question : "Who was a party animal?",
        imgSrc : "img/question-asset-2.png",
        choiceA : "Pablo Picasso",
        choiceB : "Andy Warhol",
        choiceC : "Salvador Dalí",
        correct : "B"
    },{
        question : "Who invented the Chupa Chups logo?",
        imgSrc : "img/question-asset-3.png",
        choiceA : "Pablo Picasso",
        choiceB : "Andy Warhol",
        choiceC : "Salvador Dalí",
        correct : "B"
    },{
        question : "The first word is Pencil.",
        imgSrc : "img/question-asset-4.png",
        choiceA : "Pablo Picasso",
        choiceB : "Andy Warhol",
        choiceC : "Salvador Dalí",
        correct : "A"
    },{
        question : "He added urine to oxidize the paint.",
        imgSrc : "img/question-asset-5.png",
        choiceA : "Pablo Picasso",
        choiceB : "Andy Warhol",
        choiceC : "Salvador Dalí",
        correct : "B"
    },{
        question : "Who had orgies with Cher?",
        imgSrc : "img/question-asset-6.png",
        choiceA : "Pablo Picasso",
        choiceB : "Andy Warhol",
        choiceC : "Salvador Dalí",
        correct : "C"
    },{
        question : "Who created over 50,000 works of art?",
        imgSrc : "img/question-asset-7.png",
        choiceA : "Pablo Picasso",
        choiceB : "Andy Warhol",
        choiceC : "Salvador Dalí",
        correct : "A"
    },{
        question : "Who created cover art for the Velvet Underground?",
        imgSrc : "img/question-asset-8.png",
        choiceA : "Pablo Picasso",
        choiceB : "Andy Warhol",
        choiceC : "Salvador Dalí",
        correct : "B"
    },{
        question : "I don't do drugs, I am drugs.",
        imgSrc : "img/question-asset-9.png",
        choiceA : "Pablo Picasso",
        choiceB : "Andy Warhol",
        choiceC : "Salvador Dalí",
        correct : "C"
    },{
        question : "Le Femme D’Alger (Algas No?) was sold for the sum of $179.4m",
        imgSrc : "img/question-asset-10.png",
        choiceA : "Pablo Picasso",
        choiceB : "Andy Warhol",
        choiceC : "Salvador Dalí",
        correct : "A"
    },
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// render login hide login
login.addEventListener("click",hideLogin);

function hideLogin(){
  login.style.display = "none";
  newuser.style.display = "none"; 
  document.getElementById("thanks").innerHTML = "Thank you!";
}

// start quiz
function startQuiz(){
    document.getElementById("thanks").innerHTML = "";
    newuser.style.display = "none";
    hallo.style.display = "none";
    login.style.display = "none"; 
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "lightseagreen";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#DF6C5C";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}



// Parallax
  var mouse = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5
    };
    
    var input = {
      mouseX: {
        start: 0,
        end: window.innerWidth,
        current: mouse.x
      },
      mouseY: {
        start: 0,
        end: window.innerWidth,
        current: mouse.y
      }
    };
    
    input.mouseX.range = input.mouseX.end - input.mouseX.start;
    input.mouseY.range = input.mouseY.end - input.mouseY.start;
    
    var output = {
      blur: {
        start: 0.2,
        range: 10
      },
      x: {
        start: -300,
        end: 300,
        current: 0
      },
      y: {
        start: -300,
        end: 300,
        current: 0
      },
      z: {
        range: 10000
      }
    };
    
    output.x.range = output.x.end - output.x.start;
    output.y.range = output.y.end - output.y.start;
    
    var parallaxContainer = document.getElementById("parallaxContainer");
    var itemsArray = [];
    
    for (let i = 0; i < 130; i++) {
      var item = document.createElement("div");
      item.className = "parallax-item";
      itemsArray.push(item);
    
      var art = document.createElement("div");
      art.className = "art";
      item.appendChild(art);
    
      parallaxContainer.appendChild(item);
    
      var bgImgNum = Math.round(Math.random() * 16);
      var rotateNum = 360 * Math.random();
      var depth = Math.random();
      var blur = (depth - output.blur.start) * output.blur.range;
      var zIndex = output.z.range - depth * output.z.range;
    
      item.style.zIndex = zIndex;
      item.style.width = 500 * Math.random() + 50;
      item.style.height = 500 * Math.random() + 50;
      item.dataset.depth = depth;
      art.style.transform = "rotate(" + rotateNum + "deg)";
      art.style.backgroundImage = "url(img/parallax-assets/parallax-asset-" + bgImgNum + ".png)";  
      // item.style.filter = "blur(" + blur + "px)";
      item.style.top = Math.round(Math.random() * 100 - 20) + "%";
      item.style.left = Math.round(Math.random() * 100 - 20) + "%";
    }
    
    var updateInputs = function() {
      input.mouseX.current = mouse.x;
      input.mouseY.current = mouse.y;
      input.mouseX.fraction =
        (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
      input.mouseY.fraction =
        (input.mouseY.current - input.mouseY.start) / input.mouseY.range;
    };
    
    var updateOutputs = function() {
      output.x.current = output.x.end - input.mouseX.fraction * output.x.range;
      output.y.current = output.y.end - input.mouseY.fraction * output.y.range;
    };
    
    var updateParallaxItems = function() {
      itemsArray.forEach(function(item, i) {
        var depth = parseFloat(item.dataset.depth, 10);
        var itemOutput = {
          x: output.x.current * depth,
          y: output.y.current * depth
        };
        item.style.transform =
          "translate(" + itemOutput.x + "px, " + itemOutput.y + "px)";
      });
    };
    
    var handleMouseMove = function(event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    
      updateInputs();
      updateOutputs();
      updateParallaxItems();
    };
    
    var handleResize = function() {
      input.mouseX.end = window.innerWidth;
      input.mouseY.end = window.innerHeight;
    
      input.mouseX.range = input.mouseX.end - input.mouseX.start;
      input.mouseY.range = input.mouseY.end - input.mouseY.start;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

// LocalStorage
// Check browser support
if (typeof(Storage) !== "undefined") {
  // Store
  localStorage.setItem("newuser");
  // Retrieve
  document.getElementById("result").innerHTML = localStorage.getItem("newuser");
} else {
  document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}


// Cookie
function cookiesEnabled() {
  let canUserCookies = (navigator.cookieEnabled) ? true : false;
  console.log(canUserCookies);

  if(typeof navigator.cookieEnabled == "undefined" && !canUserCookies) {
      document.cookie = newuser;
      canUserCookies = (document.cookie.indexOf("testcookie") != -1) ? true : false;
  }
  return canUserCookies;
}























