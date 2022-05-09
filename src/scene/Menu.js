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
        menuConfig.fontSize = '20px'; 
        this.add.text(game.config.width / 2, game.config.height - 50, 'Press (SPACE) to start', menuConfig).setOrigin(0.5);

        //Space key
        controls.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(controls.space)) {
            this.scene.start("NodeTwo");
        }
    }
}