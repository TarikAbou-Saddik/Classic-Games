var canvas;
var context;

// Width of Stats screen & starting x pos of main screen
const WIN2_START = 220;
// Size of a block item
const BLOCK_SIZE = 20;

// X and Y coords of each block making up the "I" item
var IX1 = WIN2_START + 10, IX2 = WIN2_START + 10 + BLOCK_SIZE,  IX3 = (WIN2_START + 10) + 2 * BLOCK_SIZE;
var IY1 = IY2 = IY3 = 100;

var JX1

window.onload = function() {
 canvas = document.getElementById("tetrisCanvas");
 var FPS = 60;
 setInterval(function()
 	{
 		renderAll();
 	}, 1000/FPS);
}

function renderAll()
{
	drawWindows();
}

function drawRect(x,y,width, height, color)
{
	context.fillStyle = color;
	context.fillRect(x,y,width,height);
}


function drawShape(shape)
{

	switch(shape)
	{
		case "I":
			drawRect(IX1, IY1, BLOCK_SIZE, BLOCK_SIZE,"cyan");
			drawOutline(IX1, IY1, BLOCK_SIZE, BLOCK_SIZE);

			drawRect(IX2, IY2, BLOCK_SIZE, BLOCK_SIZE,"cyan");
			drawOutline(IX2, IY2, BLOCK_SIZE, BLOCK_SIZE);

			drawRect(IX3, IY3, BLOCK_SIZE, BLOCK_SIZE,"cyan");
			drawOutline(IX3, IY3, BLOCK_SIZE, BLOCK_SIZE);
			break;

		case "J":
			drawRect(WIN2_START + 10, 200, BLOCK_SIZE, BLOCK_SIZE,"blue");
			drawOutline(WIN2_START + 10, 200, BLOCK_SIZE, BLOCK_SIZE);

			drawRect(WIN2_START + 10 + BLOCK_SIZE, 200, BLOCK_SIZE, BLOCK_SIZE,"blue");
			drawOutline(WIN2_START + 10 + BLOCK_SIZE, 200, BLOCK_SIZE, BLOCK_SIZE);

			drawRect((WIN2_START + 10) + 2 * BLOCK_SIZE, 200, BLOCK_SIZE, BLOCK_SIZE,"blue");
			drawOutline((WIN2_START + 10) + 2 * BLOCK_SIZE, 200, BLOCK_SIZE, BLOCK_SIZE);

			drawRect((WIN2_START + 10) + 2 * BLOCK_SIZE, 200 + BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE,"blue");
			drawOutline((WIN2_START + 10) + 2 * BLOCK_SIZE, 200 + BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			break;

		default:
			break;
	}
}

function drawOutline(x,y,width,height)
{	
	context.beginPath();
	context.lineWidth = "2";
	context.strokeRect(x,y,width,height);
	context.fill();
}

function drawWindows()
{
	context = canvas.getContext("2d");

	// Drawing statistics rectangle
	drawRect(0,0,WIN2_START, canvas.height, "#F5F5DC");

	// Drawing border for statistics rectangle
	context.beginPath();
	context.lineWidth = "2";
	context.moveTo(0,0);
	context.lineTo(0,canvas.height);
	context.lineTo(WIN2_START,canvas.height);
	context.lineTo(WIN2_START, 0);
	context.lineTo(0,0);
	context.strokeStyle = "black";
	context.stroke();


	drawRect(WIN2_START,0, 600, canvas.height, "white");

	context.beginPath();
	context.lineWidth = "2";
	context.moveTo(WIN2_START,canvas.height);
	context.lineTo(canvas.width, canvas.height);
	context.lineTo(canvas.width,0);
	context.lineTo(0,0);
	context.strokeStyle = "black";
	context.stroke();

	drawShape("I");
	drawShape("J");

}