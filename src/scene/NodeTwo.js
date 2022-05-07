
class NodeTwo extends Phaser.Scene {
    constructor() {
        super("NodeTwo");
    }

    preload() {
        this.load.image("astro", "assets/astronaut.png");

    }

    create() {
        controls.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        controls.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); 
        this.add.sprite(game.config.width / 2, game.config.height / 2, "astro");

    }

    update() {

    }
}