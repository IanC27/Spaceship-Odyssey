class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

    preload() {
        this.load.image("menu", "assets/menu.png")
    }

    create() {
        this.cameras.main.setBackgroundColor('#000');
        // title screen graphic
        this.add.sprite(game.config.width /2, game.config.height /2, 'menu');
        // menu text configuration
        let gameoverConfig = {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '35px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        this.add.text(game.config.width / 2, 50, 'GAME OVER', gameoverConfig)
            .setOrigin(0.5)
            .setDepth(1);
        gameoverConfig.fontSize = '20px';
        this.add.text(game.config.width / 2, game.config.height /2, 'Press (R) to Restart', gameoverConfig)
            .setOrigin(0.5)
            .setDepth(1);
        //Space key
        controls.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(controls.restart)) {
            this.scene.start("NodeTwo");
        }
    }
}