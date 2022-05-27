class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        
        
    }

    create() {
        // title screen graphic
        this.add.sprite(game.config.width /2, game.config.height /2, 'menu');
        //this.add.rectangle(0, 0, game.config.width, game.config.height, 0xffffff).setOrigin(0, 0);
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Impact, fantasy',
            fontSize: '30px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        }

        

        // show menu text
        this.add.text(game.config.width / 2, 50, 'SPACESHIP ODYSSEY', menuConfig).setOrigin(0.5);
        menuConfig.fontFamily = 'Gill Sans, sans-serif';
        menuConfig.fontSize = '15px';
        menuConfig.color = '#FFFFFF';
        menuConfig.stroke = '#000'
        this.add.text(game.config.width / 2, 110, 'Click and drag to set velocity', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, 130, 'Hold SPACE to slow down', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, 150, 'Press E to interact', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '20px'; 
        this.add.text(game.config.width / 2, game.config.height - 50, 'Press (SPACE) to start', menuConfig).setOrigin(0.5);
        
        //this.add.bitmapText(0, 200, "pixel_font", "MOTHER 3");

        //Space key
        controls.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //game clock
        //48 hours
        game.clock = {
            minutes: 2880,
        }
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(controls.space)) {
            this.scene.start("NodeTwo");
        }
    }
}
