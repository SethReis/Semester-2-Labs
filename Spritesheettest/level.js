'use strict'

// The Level class contains most of the assets.
class Level {
    constructor(game, number) {
        this.game = game;
        this.number = number;
        this.init();
    }

    init() {    // needs to be called each time a level is re-started
                // different level numbers should have different behavior
        this.predator = new Predator(this);
        this.player = new Player(this);
        this.safeArea = new SafeArea(this);

        this.numBoids = 100;
        this.boids = [];
        for(let i = 0; i < this.numBoids; i++)
          this.boids.push(new Boid(this));
    }

    run() {
        this.render();
        this.player.run();
        this.predator.run();
        this.safeArea.run();
        this.runBoids();
    }

    runBoids() {    // give every boid some time
        for(let i = 0; i < this.numBoids; i++)
            this.boids[i].run();
    }

    render() {
        // draw whatever
        // here is some place holder
      var context = this.game.context;
        // draw the level text

      context.restore();
    }

}
