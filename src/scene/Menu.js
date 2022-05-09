class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image("menu", "assets/menu.png")
    }

    create() {
        // title screen graphic
        this.add.sprite(256/2, 240/2, 'menu');
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Impact, fantasy',
            fontWeight: '900',
            fontSize: '96px',
            color: '#013220',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        }

        // show menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - 200, 'ENDLESS ZONE', menuConfig).setOrigin(0.5);
        menuConfig.fontFamily = 'Gill Sans, sans-serif';
        menuConfig.fontSize = '36px';
        menuConfig.color = '#FFFFFF';
        menuConfig.stroke = '#000'
        menuConfig.strokeThickness = 5;
        this.add.text(game.config.width / 2, game.config.height / 2 + 100, 'Use arrow keys or WASD to move', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '48px';
        this.add.text(game.config.width / 2, game.config.height / 2 + 150, 'Press W or UP to start', menuConfig).setOrigin(0.5);

        //Space key
        controls.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(controls.space)) {
            this.scene.start("NodeTwo");
        }
    }
}