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
    this.enemies = [];
    this.menuTileDivs = this.createMenuTileDivs();
    this.infoTileDivs = this.loadInfoTileArray();
    this.cols = 36;
    this.rows = 32;
    this.colWidth = 25;
    this.grid = [];
    this.loadGrid();
    //  create the canvas
    this.canvas =  document.getElementById('gameCanvas');
    this.canvas.addEventListener("mouseover", handleCanvasMouseOver, false);
    this.canvas.addEventListener("click", handleCNVClickCell, false);
    if (!this.canvas || !this.canvas.getContext)
    throw "No valid canvas found!";
    //  create the context
    this.context = this.canvas.getContext("2d");
    if(!this.context)
    throw "No valid context found!";

    //  add levels to levels array
    this.levels = [];
    this.numLevels = 1;     // for now
    this.currentLevel = 1;
    for(let i = 0; i < this.numLevels; i++)
    this.levels.push(new Level(this, i+1));
    this.loadGrid();
    this.fillCells();

    // set call backs
    //this.menuTileDivs = this.createMenuTileDivs();

  }
  run() {       // called from draw()

    this.render();
    //this.levels[this.currentLevel-1].run();  // run the current level

  }
  render() {    // draw whatever
    this.drawGrid();
  }
  //++++++++++++++++++++++++++++++++++++++++  constructor calls
  createMenuTileDivs(){
    var tiles = [];
    for(var i = 0; i < 5; i++){
      var mtd = document.createElement("div");
      // getimage for tiles and bullets
      var cnvTurImgPath = "images/towers/d" + i + ".png";  // small tower image for canvas
      var cnvBulImgPath = "images/bullets/b" + i + ".png";     // bullet image for canvas
      var imgName = 'images/towers/tow' + i + '.png'; // large image for menu tile


      mtd.cnvTurImg = new Image();
      mtd.cnvTurImg.addEventListener('load',this.hideImgElement,false);
      mtd.cnvTurImg.addEventListener('error', function() { console.log(cnvTurImgPath + " failed to load"); }, false);
      mtd.cnvTurImg.src = cnvTurImgPath;    // start loading image

      mtd.cnvBulImg = new Image();
      mtd.cnvBulImg.addEventListener('load',this.hideImgElement,false);
      mtd.cnvBulImg.addEventListener('error', function() { console.log(cnvBulImgPath + " failed to load"); }, false);
      mtd.cnvBulImg.src = cnvBulImgPath;    // start loading image

      document.getElementById("menuDiv").appendChild(mtd);

      mtd.cost = 100*i +50;
      mtd.id = 'towDiv ' + i;
      //  Adding menu tile styles
      mtd.style.float = 'left';
      mtd.style.marginLeft = "90px";
      mtd.style.margintop = "12px";
      mtd.style.border = "solid";
      //mtd.style.border = "3px";
      mtd.style.borderRadius = "50%";
      mtd.style.width = "90px";
      mtd.style.height = "90px";
      //mtd.setClass = "menuTile";
      mtd.style.background = "pink";

      tiles.push(mtd);

      var tImg = new Image();
      tImg.addEventListener('error', function() { console.log(imgName + " failed to load"); }, false);
      tImg.src = imgName;
      mtd.addEventListener("mouseover", handleTileMouseOver, false);
      mtd.addEventListener("mouseout", handleTileMouseOut, false);
      mtd.addEventListener("mousedown", handleTileMouseDown, false);
      mtd.appendChild(tImg);

    }
    return tiles;
  }
  // load nfo tiles into array and style info tiles
  loadInfoTileArray(){
    var infoTiles = document.getElementsByClassName("infoTileDiv");
    //style infoTiles
    for(let i = 0; i < infoTiles.length; i++){
      infoTiles[i].style.width = "90px";
      infoTiles[i].style.height = "90px";
      infoTiles[i].style.backgroundColor = "white";
      infoTiles[i].style.border = "solid black 2px";
      infoTiles[i].style.borderRadius = "50%";
      infoTiles[i].style.marginTop = "50px";
      infoTiles[i].style.marginLeft = "3px";
    }
    return infoTiles;
  }


  loadGrid(){
    for(var i = 0; i < this.cols; i++){     // columns of rows
      this.grid[i] = [];
      for(var j = 0; j < this.rows; j++){
        this.grid[i][j] = new Cell(this, new JSVector((i*this.colWidth), (j*this.colWidth)), -1);
        //make 10% of the cells occupied
        if(this.grid[i][j] != this.root && Math.floor(Math.random()*100) < 10){
          this.grid[i][j].occupied = true;
        } else {
            this.grid[i][j].occupied = false;
        }

      }
    }


  }  // ++++++++++++++++++++++++++++++++++++++++++++++  End LoadGrid
  drawGrid(){

    for(var i = 0; i < this.cols; i++){     // columns of rows
      for(var j = 0; j < this.rows; j++){
        this.grid[i][j].render();
      }
    }

  }

  fillCells(){
    var closed = [];
    var colEnd = this.grid.length - 1;
    var rowEnd = this.grid[colEnd].length - 1;
    var open = [this.grid[colEnd][rowEnd]];
    this.grid[colEnd][rowEnd].dir = -2;
    while (open.length > 0){
      for (var i = open.length-1; i >= 0; i--){
        try{
          var up = this.grid[open[i].col][open[i].row - 1];
          if(up.dir === -1 && up.occupied === false && up.numSet === false){
            up.dir = 3;
            up.numSet = true;
            open.push(up);
          }
        } catch(e){console.log("Error Loading Up")}
        try{
          var right = this.grid[open[i].col + 1][open[i].row];
          if(right.dir === -1 && right.occupied === false && right.numSet === false){
            right.dir = 4;
            right.numSet = true;
            open.push(right);
          }
        } catch(e){console.log("Error Loading Right")}
        try{
          var down = this.grid[open[i].col][open[i].row + 1];
          if(down.dir === -1 && down.occupied === false && down.numSet === false){
            down.dir = 1;
            down.numSet = true;
            open.push(down);
          }
        } catch(e){console.log("Error Loading Down")}
        try{
          var left = this.grid[open[i].col - 1][open[i].row];
          if(left.dir === -1 && left.occupied === false && left.numSet === false){
            left.dir = 2;
            left.numSet = true;
            open.push(left);
          }
        } catch(e){console.log("Error Loading Left")}
        closed.push(this.grid[open[i].col][open[i].row]);
        open.splice(i, 1);
      }
    }
  }

  createTower(tower){
    this.towers.push(tower);
    game.currentTower = tower.id;
    console.log("CurrentTower:  " + tower.id);
  }
}//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  End Game Class


//  +++++++++++++++++++++++++++++++++  MenuTile events
function handleTileMouseDown(){

  if(game.placingTurret) return;
  game.placingTower = true;
  game.createTower(this);
}
function handleTileMouseOver(){
  this.style.background = "red";
}
function handleTileMouseOut(){
  this.style.background = "pink";
}
//  +++++++++++++++++++++++++++++++++++  Canvas Events
function handleCanvasMouseOver(){
  if(game.placingTower && !game.towers.length < 1) return;
  //game.canvas.appendChild(game.towers[game.towers.length-1].cnvTurImg);
}

function handleCNVClickCell(){
  var row = Math.floor(event.offsetY/game.colWidth);
  var col = Math.floor(event.offsetx/game.colWidth);
  var cell = game.grid[col][row];
  cell.occupied = !cell.occupied;
}
