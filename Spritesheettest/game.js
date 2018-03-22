'use strict'

// wait for the window to load and than call back setup()
window.addEventListener('load', setup, false);
//Global Variables
var game;   // the global game object
const FRAME_RATE=30;

function setup() {
  game = new Game();
  game.init()
  draw();
}

function draw() {   // the animation loop
  game.run();
  window.setTimeout(draw, 1000/FRAME_RATE);  // come back here every interval
  //requestAnimationFrame(animate);
}

// Game is the top level object and it contains the levels
class Game {
  constructor() {   // from setup()
    this.isRunning = true;
    this.imageArray = [];
    this.count = 0;

    //  +++++++++++++++  Create Canvas and Context
    this.canvas =  document.getElementById('canvas');
    if (!this.canvas || !this.canvas.getContext)
    throw "No valid canvas found!";
    this.context = this.canvas.getContext("2d");
    if(!this.context)
    throw "No valid context found!";
    //  +++++++++++++++  Canvas and Context  +++++++++++ End
    this.levels = [];
    this.numLevels = 1;     // for now
    this.currentLevel = 1;
    for(let i = 0; i < this.numLevels; i++)
    this.levels.push(new Level(this, i+1));
    this.shownImage = new Image();
    this.shownImage.src = 'spritesheet/spritesheets/runningbird.png';

  }

  init(){
    for (var i = 0; i < 25; i++){
      if (i<10){
        this.imageArray.push(runBirdJSON.frames["s1000" + i].frame);
      } else if (i>9){
        this.imageArray.push(runBirdJSON.frames["s100" + i].frame);
      }
    }
  }


  run() {       // called from draw()
    if(this.isRunning) {
      this.render();
      this.levels[this.currentLevel-1].run();  // run the current level
    }
  }

  render() {    // draw whatever
    this.context.clearRect(0, 0, 800, 600);
    var pre = this.imageArray[this.count];
    this.context.drawImage(this.shownImage, pre.x, pre.y, pre.w, pre.h, 50, 50, pre.w, pre.h);
    this.count++;
    if (this.count === 25){
      this.count = 0;
    }
  }
}
