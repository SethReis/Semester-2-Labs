'use strict'

// wait for the window to load and than call back setup()
window.addEventListener('load', setup, false);

var game;   // the global game object
const FRAME_RATE=30;

function setup() {
  game = new Game();
  window.setTimeout(draw, 100);    // wait 100ms for resources to load then start draw loop
}

function draw() {   // the animation loop
    game.run();
    window.setTimeout(draw, 1000/FRAME_RATE);  // come back here every interval
}

// Game is the top level object and it contains the levels
class Game {

  constructor() {   // from setup()
    //  Game elements
    this.towers = [];
    this.bullets = [];
    this.enemies = [];
    this.menuTileDivs = [];
    this.infoTileDivs = [];

    this.isRunning = true;
    this.creatingTower = false;
    this.placingTower = false;
    this.currentTower = -1;

    //  Added
    this.canvas =  document.getElementById('gameCanvas');
    this.canvas.addEventListener("mouseover", handleCanvasMouseOver, false);
  	if (!this.canvas || !this.canvas.getContext)
        throw "No valid canvas found!";
    this.context = this.canvas.getContext("2d");
    if(!this.context)
        throw "No valid context found!";
    this.levels = [];
    this.numLevels = 1;     // for now
    this.currentLevel = 1;
    //for(let i = 0; i < this.numLevels; i++)
       // this.levels.push(new Level(this, i+1));

    // set call backs
    this.menuTileDivs = this.createMenuTileDivs();

  }


  run() {       // called from draw()
    //if(this.isRunning) {
    //    this.render();
    //    this.levels[this.currentLevel-1].run();  // run the //current level
    //}
  }

  render() {    // draw whatever
  }
  //++++++++++++++++++++++++++++++++++++++++  constructor calls
  createMenuTileDivs(){
    var tiles = [];
    for(var i = 0; i < 5; i++){
      var mtd = document.createElement("div");

      var tileImagePathB = "images/bullets/b" + i + ".png";
      var tileImageB = document.createElement("img");
      tileImageB.addEventListener('load', this.hideImgElement, false);
      tileImageB.addEventListener('error', function(){throw ""+ tileImageB + " failed to load"});
      tileImageB.src = tileImagePathB;

      var tileImagePathD = "images/towers/d" + i + ".png";
      var tileImageD = new Image();
      tileImageD.addEventListener('load', this.hideImgElement, false);
      tileImageD.addEventListener('error', function(){
        console.log (tileImage + " failed to load"); }, false);
      tileImageD.src = tileImagePathD;

      document.getElementById("menuDiv").appendChild(mtd);

      tiles.push(mtd);

      var tileImagePathT = "images/towers/tow" + i + ".png";
      var butn = document.createElement("img");
      butn.addEventListener('error', function() { console.log(imgName + " failed to load"); }, false);
      butn.src = tileImagePathT;
      console.log(butn.src);
      mtd.addEventListener("mouseover", handleTileMouseOver, false);
      mtd.addEventListener("mouseout", handleTileMouseOut, false);
      mtd.appendChild(butn);

      mtd.style.float = 'left';
      mtd.style.marginLeft = "100px";
      mtd.style.margintop = "25px";
      mtd.style.width = "90px";
      mtd.style.height = "90px";
      mtd.style.background = "yellow";

    }
    return tiles;
  }


}//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  End Game Class


//  +++++++++++++++++++++++++++++++++  MenuTile events

function handleTileMouseOver(){
  this.style.background = "red";
}

function handleTileMouseOut(){
  this.style.background = "pink";
}

//  +++++++++++++++++++++++++++++++++++  Canvas Events
function handleCanvasMouseOver(){
   console.log("game.towers.length = " + game.towers.length);
   if(game.placingTower && !game.towers.length < 1) return;

 }
