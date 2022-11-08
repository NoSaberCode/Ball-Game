let background = new Image();
background.src = "basketball_court7.jpg";

let basket = new Image();
basket.src = "basket211.png";

let ball = new Image();
ball.src = "ball11.png";

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let basketPoint = {
    x: 0,
    y: 350,
    width: 100
};

let ballPoint = {
    x: 300,
    y: 0,
    width: 50
};

function drawBackground(){
    ctx.beginPath(); 
    ctx.clearRect(0, 0, 600, 400); 
    ctx.beginPath();
    ctx.drawImage(background,0,0,600,400);

}

function drawBasket(){
    ctx.beginPath();
    ctx.drawImage(basket,basketPoint.x,basketPoint.y,100,50);

}

function drawBall(){
    ctx.beginPath();
    ctx.drawImage(ball,ballPoint.x,ballPoint.y,50,50);
}


function redraw(){
    ctx.beginPath(); 
    ctx.clearRect(0, 0, 600, 400); 
    drawBackground();
    drawBasket();
    drawBall();
}

   
function moveLeft(){
    if (basketPoint.x > 0){
        basketPoint.x = basketPoint.x - 25;
    }
    redraw();

}
document.getElementById("leftButton").onclick = moveLeft;


function moveRight(){
    if (basketPoint.x < (600 - basketPoint.width)){
        basketPoint.x = basketPoint.x + 25;
    }
    redraw();

}
document.getElementById("rightButton").onclick = moveRight;

document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {  
        moveLeft();
    }
    else if (e.key === "ArrowRight") { 
        moveRight();
     }
   });


function checkCollision(){
    if (ballPoint.y == (400-ballPoint.width) && ballPoint.x < (basketPoint.x + basketPoint.width) && basketPoint.x < (ballPoint.x + ballPoint.width)){
        return true;
    } else {
        return false;
    }
}

let score = 0;


function executeProgram(){
    document.getElementById("ballCount").innerHTML = "Balls caught: " + score;
    ballPoint.y = ballPoint.y + 10;
    redraw();
    let randomNum = Math.round(Math.random()*(600-ballPoint.width));

    if ( checkCollision() == true){
        ballPoint.y = 0;    
        ballPoint.x = randomNum;
        score++;

    } 
    else if (checkCollision() == false && ballPoint.y == 400 ){
        ballPoint.y = 0;
        ballPoint.x = randomNum;
    }

    else if ( score == 10){
        clearInterval(interval);
        score = 0;
        interval = undefined;
        ctx.beginPath(); 
        ctx.clearRect(0, 0, 600, 400);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 600, 400);
        ctx.font = "100px Arial";
        ctx.strokeStyle = "aqua";
        ctx.textAlign = "center";
        ctx.strokeText("You win!", 300, 230);

    }
}

let interval;

function beginGame() {
    if (interval == undefined ){
    interval = setInterval(executeProgram, 100);
    }
}

document.getElementById("startButton").onclick = beginGame;


function stopGame() {
    clearInterval(interval);
    interval = undefined;
}

let stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", stopGame);

