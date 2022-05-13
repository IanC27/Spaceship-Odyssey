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
            .setOrigin(0.5);
        gameoverConfig.fontSize = '20px';
        this.add.text(game.config.width / 2, game.config.height - 30, 'Press (R) to Restart', gameoverConfig)
            .setOrigin(0.5);
        gameoverConfig.fontFamily = 'Gill Sans, sans-serif';
        gameoverConfig.fontSize = '15px';
        gameoverConfig.stroke = '#000';
        this.add.text(game.config.width / 2, game.config.height / 2 + 20, `Fitness: ${playerStatus.fitness}`, gameoverConfig)
            .setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, `Family Relationships: ${playerStatus.family}`, gameoverConfig)
            .setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 20, `Research: ${playerStatus.research}`, gameoverConfig)
            .setOrigin(0.5);
        //Space key
        controls.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);


    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(controls.restart)) {
            game.clock.minutes = 1440;
            this.scene.start("NodeTwo");
        }
    }
}