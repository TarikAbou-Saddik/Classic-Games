/**
 * @author Tarik Abou-Saddik <tarik.abousaddik@gmail.com>
 * @file Basic logic for a game of Tetris
 * @version 0.1
 */

// -----  CANVAS-SPEFICIC VARIABLES --------
var canvas, context;
const WIN_START = 404;

// ----- TETRONIMO-SPECIFIC VARIABLES  ----- 
const BLOCK_SIZE = 20;
const START_HEIGHT = 0;

// ------ PROTOTYPES AND CLASSES ----------

function Block(x, y, width, height, color, outlineWidth)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.outlineWidth = outlineWidth;
    this.drawBlock = function()
    {
        context.fillStyle = this.color; 
        context.fillRect(this.x,this.y, this.width, this.height);

        context.beginPath();
        context.lineWidth = this.outlineWidth;
        context.strokeRect(this.x,this.y, this.width, this.height);
    }
}

// Create a basic Tetronimo template.
function Tetronimo(){
    this.x;
    this.y;
    this.blocks = [];
    this.draw = function(){
        for(block in this.blocks){
            this.blocks[block].drawBlock();
         }
    }
     this.descend = function()
    {   
        if(this.y < (canvas.height-20) && this.y >= 0)
            this.y += 3;
        else
            this.y = canvas.height-20;
        
        for(block in this.blocks){
                this.blocks[block].y = this.y;
        }

        console.log(this.blocks);
    }
}

// ---------- PIECE: I ---------------------
function I(x, y, color)
{   
    this.x = x;
    this.y = y;
    // Draw the actual blocks. 
    this.I1 = new Block(this.x,this.y, BLOCK_SIZE, BLOCK_SIZE, color, "0.5");
    this.I2 = new Block(this.I1.x + BLOCK_SIZE, this.y, BLOCK_SIZE, BLOCK_SIZE, color, "0.5");
    this.I3 = new Block(this.I2.x + BLOCK_SIZE, this.y, BLOCK_SIZE, BLOCK_SIZE, color, "0.5");
    this.I4 = new Block(this.I3.x + BLOCK_SIZE, this.y, BLOCK_SIZE, BLOCK_SIZE, color, "0.5");
    this.blocks.push(this.I1, this.I2, this.I3, this.I4);

}
// Arrange for Tetronimo to be prototype.
I.prototype = new Tetronimo();
I.prototype.constructor = I; 

// ---------- PIECE: J ---------------------
function J(x, y, color)
{
    this.color = color;
}
// Arrange for Tetronimo to be prototype.
J.prototype = new Tetronimo();
J.prototype.constructor = J;

function L(x,y,color)
{
    this.color = color; 
}
// Arrange for Tetronimo to be prototype.
L.prototype = new Tetronimo();
L.prototype.constructor = L;

function O(x,y,color)
{
    this.color = color;
}
// Arrange for Tetronimo to be prototype.
O.prototype = new Tetronimo();
O.prototype.constructor = O;


//------- MAIN GAME LOOP -------------------
window.onload = function()
{
    canvas = document.getElementById('tetrisCanvas');
    var FPS = 60;

    var IPiece = new I(canvas.width/2,START_HEIGHT,"red");

    setInterval(function()
    {
        // TODO: insert draw method here.
        drawWindow(); 
        animBlock(IPiece);
    }, 1000/FPS);
}

/** RENDER WINDOW FUNCTION */
function drawWindow()
{
    // Set the canvas context.
    context = canvas.getContext("2d");

    var gameArea = new Block(0,0,canvas.width, canvas.height, "beige", "1");
    gameArea.drawBlock();
}

function animBlock(tetronimo)
{
    tetronimo.draw();
    tetronimo.descend();
}