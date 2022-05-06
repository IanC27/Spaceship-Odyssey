
class NodeTwo extends Phaser.Scene {
    constructor() {
        super("NodeTwo");
    }

    preload() {
        this.load.image("astro", "assets/astronaut.png");

    }

    create() {
        this.add.sprite(game.config.width / 2, game.config.height / 2, "astro");

    }

    update() {

    }
}