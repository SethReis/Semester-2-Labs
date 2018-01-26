'use strict'

class Player extends Mover {
    constructor(level) {
        super();               // required
        this.level = level;  // access to all the other objects.  e.g. this.level.boids or this.level.game.canvas
        this.context = this.level.context;
        this.loc = new JSVector(450, 450);
        this.rad = 15;
        this.c = 'rgba(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.random() + ')';
        this.context.translate(0-this.loc.x+450, 0-this.loc.y+450);
        // other Player properties
    }
    run() {
        // do whatever actions
        this.render();
        this.checkForMove();
        }
    render() {
      this.context.beginPath();
      this.context.arc(this.loc.x,this.loc.y,this.rad,0,Math.PI);
      this.context.fillStyle = this.c;
      this.context.fill();
      this.context.strokeStyle = this.c;
      this.context.stroke();
        // draw whatever
        }
      checkForMove(){
        document.addEventListener('keypressed', (event) => {
          const keyName = event.key;
          if (keyName = "a"){
            this.context.translate(1, 0);
            this.loc.x =- 1;
          } else if (keyName = "s"){
            this.context.translate(0, -1);
            this.loc.y =+ 1;
          } else if (keyName = "d"){
            this.context.translate(-1, 0);
            this.loc.x =+ 1;
          } else if (keyName = "w"){
            this.context.translate(0, 1);
            this.loc.y =- 1;
          }
        });
      }
    // other Player methods ...
}
