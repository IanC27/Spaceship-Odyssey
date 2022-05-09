class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image("menu", "assets/menu.png")
    }

    create() {
        // title screen graphic
        this.add.sprite(game.config.width /2, game.config.height /2, 'menu');
        // menu text configuration
        let gameoverConfig = {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '100px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        this.gameoverScreen = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'gg')
            .setOrigin(0, 0)
            .setDepth(1);
        this.add.text(game.config.width / 2, game.config.height / 6, 'GAME OVER', gameoverConfig)
            .setOrigin(0.5)
            .setDepth(1);
        gameoverConfig.fontSize = '70px';
        this.add.text(game.config.width / 2, game.config.height / 2 - 75, 'SCORE: ' + this.p1Score + ' YARDS', gameoverConfig)
            .setOrigin(0.5)
            .setDepth(1);

        gameoverConfig.fontSize = '50px';
        gameoverConfig.color = highScoreColor;
        this.add.text(game.config.width / 2, game.config.height / 2, 'HIGH SCORE: ' + highScore + ' YARDS', gameoverConfig)
            .setOrigin(0.5)
            .setDepth(1);
        
        gameoverConfig.color = '#FFFFFF'
        this.add.text(game.config.width / 2, game.config.height / 2 + 100, 'TOTAL RUNS: ' + tries, gameoverConfig)   
            .setOrigin(0.5)
            .setDepth(1);
        gameoverConfig.fontSize = '45px';
        this.add.text(game.config.width / 2, game.config.height - 75, 'Press (R) to Restart', gameoverConfig)
            .setOrigin(0.5)
            .setDepth(1);

        //Space key
        controls.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(controls.space)) {
            this.scene.start("NodeTwo");
        }
    }
}