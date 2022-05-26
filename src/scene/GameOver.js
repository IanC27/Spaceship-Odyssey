class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

    preload() {
      //  this.load.image("menu", "assets/menu.png"); // menu 
        this.load.image('space', 'assets/starfield.png');
    }

    create() {
        this.cameras.main.setBackgroundColor('#000');
        // title screen graphic
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'space').setOrigin(0, 0); //fix resolution
        //this.add.sprite(game.config.width /2, game.config.height /2, 'menu');  // menu
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
        if (playerStatus.knowledge >= 70) {
            this.knowledgeMessage = "Congratulations! All your studyng paid off and you earned your Bachelor's Degree"
        } else if (playerStatus.knowledge >= 50) {
            this.knowledgeMessage = "Great Work! You did enough studying to earn a 2-year Associate's Degree... Could you have gone further?"
        } else if (playerStatus.knowledge > 0) {
            this.knowledgeMessage = "You learned a lot and got plenty of course credit. Only a "
        } else {
            this.knowledgeMessage = "You didn't make great use of the ship library... You heard you can earn college cred"
        }

        this.add.text(game.config.width / 2, game.config.height / 2 + 20, `Fitness: ${playerStatus.fitness}`, gameoverConfig)
            .setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, `Family Relationships: ${playerStatus.family}`, gameoverConfig)
            .setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 20, `Research: ${playerStatus.research}`, gameoverConfig)
            .setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 40, `Knowledge: ${playerStatus.knowledge}`, gameoverConfig)
            .setOrigin(0.5);
        //Space key
        controls.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);


    }

    update(time, delta) {
        this.starfield.tilePositionX -= 0.25;
        if (Phaser.Input.Keyboard.JustDown(controls.restart)) {
            game.clock.minutes = 1440;
            this.scene.start("NodeTwo");
        }
    }
}
