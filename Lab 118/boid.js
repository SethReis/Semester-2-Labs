'use strict'

class Boid extends Mover {
    constructor(level, loc) {
        super();               // required
        this.level = level;
        this.loc = loc;  // access to all the other objects.  e.g. this.level.boids or this.level.game.canvas
        this.context = this.level.context;
        this.rad = 2;
        this.c = 'white';
        // other Boid properties
    }
    run() {
        // do whatever actions
        this.render();
        }
    render() {
        // draw whatever
        this.context.beginPath();
        this.context.arc(this.loc.x,this.loc.y,this.rad,0,2*Math.PI);
        this.context.fillStyle = this.c;
        this.context.fill();
        this.context.strokeStyle = this.c;
        this.context.stroke();
        }
    // other Boid methods ...
}
