var canvas;
var canvasContext;

var ballX = 50;
var ballY = 100;
var ballSpeedX = 8;
var ballSpeedY = 4; 

var leftPaddleX = 0, leftPaddleY = 200;
var rightPaddleY = 200;

var player1Score = 0;
var player2Score = 0;

var winScreenShown = false;
var startScreenShown = true;
var startScreenX = 300;
var startScreenY = 350;
var startSpeedX = 8;
var startSpeedY = 4;

const WINNING_SCORE = 3;
const PADDLE_HEIGHT = 150;
const PADDLE_WIDTH = 20;
const BALL_WIDTH = 20, BALL_HEIGHT = 20;

function calcMousePos(evt)
{
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;

	return {
		x:mouseX,
		y:mouseY
	};
}

function handleMouseClick(evt)
{
	if(winScreenShown)
	{
		player1Score = 0;
		player2Score = 0;
		winScreenShown = false;
	}

	if(startScreenShown)
	{
		startScreenShown = false;
	}

}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	var framesPerSecond = 60;
	setInterval(function() {
		draw();
		if(!startScreenShown)
			movement();
		else
			startScreenMovement();
	}, 1000/framesPerSecond);

	canvas.addEventListener('mousedown', handleMouseClick);
	canvas.addEventListener('mousemove', 
		function(evt) {
			var mousePos = calcMousePos(evt);
			leftPaddleY = mousePos.y - (PADDLE_HEIGHT/2);
		})
}

function computerMovement()
{
	if((rightPaddleY + PADDLE_HEIGHT/2) < (ballY - 35))
		rightPaddleY += 6;
	else if((rightPaddleY + PADDLE_HEIGHT/2) > (ballY - 35))
		rightPaddleY -= 6;
}

function startScreenMovement()
{
	startScreenX += startSpeedX;

	if(startScreenX < 0 || startScreenX > canvas.width-200)
		startSpeedX = -startSpeedX;

	if(startScreenY < 0 || startScreenY > canvas.height)
		startSpeedY = -startSpeedY;

	startScreenY += startSpeedY;
}

function movement()
{
	if(winScreenShown)
		return;

	computerMovement();

	ballX = ballX + ballSpeedX;
	
	if(ballX < 0)
	{
		if(ballY > leftPaddleY && ballY < (leftPaddleY + PADDLE_HEIGHT))
		{
			ballSpeedX = -ballSpeedX;
			var deltaBallY = ballY - (leftPaddleY + PADDLE_HEIGHT/2);
			ballSpeedY = deltaBallY * 0.2;
		}
		else
		{
			player2Score++;
			ballReset();
		}
	}

	if(ballX > canvas.width - BALL_WIDTH)
	{	
		if(ballY > rightPaddleY && ballY < (rightPaddleY + PADDLE_HEIGHT))
			ballSpeedX = -ballSpeedX;
		else
		{
			player1Score++;
			ballReset();
		}
	}
		
	ballY = ballY + ballSpeedY;

	if(ballY < 0 || ballY > (canvas.height-BALL_HEIGHT))
		ballSpeedY = -ballSpeedY;

}

function ballReset()
{
	if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE)
	{
		winScreenShown = true;
	}

		ballSpeedX = -ballSpeedX;
		ballX = canvas.width/2;
		ballY = canvas.height/2;	
}

function draw()
{	
	canvasContext = canvas.getContext('2d');
	
	// Main window
	colorRect(0,0,canvas.width,canvas.height,'black');

	if(winScreenShown)
	{	
		canvasContext.beginPath();
		canvasContext.fillStyle = "white";	
		canvasContext.font = "30px Oswald"
		if(player1Score >= WINNING_SCORE)
			canvasContext.fillText("Left Player Won!", 300, 200);
		else
			canvasContext.fillText("Right Player Won!", 300, 200);

		canvasContext.fillText("Click to Continue!", 300, 500);
		canvasContext.fill();
		return;
	}

	if(startScreenShown)
	{
		canvasContext.fillStyle = "white";	

		canvasContext.beginPath();	
		canvasContext.font = "100px Oswald"
		canvasContext.fillText("PONG", startScreenX, startScreenY);
		canvasContext.fill();

		canvasContext.beginPath();
		canvasContext.font = "20px Oswald"
		canvasContext.fillText("Code Modified By: Tarik Abou-Saddik", 250, 550);
		canvasContext.fill();

		return;
	}

	var lineYPos = 0;

	while(lineYPos <= canvas.height)
	{	
		canvasContext.beginPath();
		canvasContext.fillStyle = 'white';
		canvasContext.font = "20px Oswald"
		canvasContext.fillText("|", 400, lineYPos);
		canvasContext.fill();
		lineYPos += 30;
	}
	
	// Ball
	canvasContext.fillStyle = 'white';
	
	// Let's us define a path for a shape. 
	canvasContext.beginPath();
	canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true);
	canvasContext.fill();

	// Left paddle
	colorRect(leftPaddleX, leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

	// Right paddle
	colorRect(canvas.width-20, rightPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

	canvasContext.beginPath();
	canvasContext.font = "40px Oswald";
	canvasContext.fillText(player1Score, 200, 75);
	canvasContext.fillText(player2Score, 600, 75);
	canvasContext.fill();
}

function colorRect(x, y, width, height, color)
{
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x,y,width,height);
}