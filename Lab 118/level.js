'use strict'

// The Level class contains most of the assets.
class Level {
    constructor(game, number) {
        this.game = game;
        this.number = number;
        this.context = this.game.context;
        this.init();
    }

    init() {    // needs to be called each time a level is re-started
                // different level numbers should have different behavior
        this.predator = new Predator(this);
        this.player = new Player(this);
        this.safeArea = new SafeArea(this);

        this.numBoids = 100;
        this.boids = [];
        for(let i = 0; i < this.numBoids; i++){
          for(let j = 0; j < this.numBoids; j++){
            this.boids.push(new Boid(this, new JSVector(i*100, j*100)));
          }
        }
    }

    run() {
        this.render();
        this.player.run();
        this.predator.run();
        this.safeArea.run();
        this.runBoids();
    }

    runBoids() {    // give every boid some time
        for(let i = 0; i < this.numBoids*this.numBoids; i++)
            this.boids[i].run();
    }

    render() {
        // draw whatever
        // here is some place holder
      this.context.save();
      // draw a gray background
      this.context.fillStyle = "gray";
      this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        // draw the level text
      var levelText = ["Zero", "One", "Two","Three"];
      this.context.fillStyle = "white";
      this.context.font = "48px sans-serif";
      this.context.fillText("Level " + levelText[this.number], 250,300);
      this.context.restore();
    }

}
