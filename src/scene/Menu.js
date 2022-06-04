class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // title screen graphic
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, "starfield").setOrigin(0, 0);
        //this.add.rectangle(0, 0, game.config.width, game.config.height, 0xffffff).setOrigin(0, 0);
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Impact',
            fontSize: '30px',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        }

        

        // show menu text
        this.add.text(game.config.width / 2, 50, 'SPACESHIP ODYSSEY', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '15px';
        this.add.text(game.config.width / 2, 80, 'By Ian, Jason, Chris, Nic', menuConfig).setOrigin(0.5);
        menuConfig.fontFamily = 'Gill Sans, sans-serif';
        menuConfig.fontSize = '15px';
        menuConfig.color = '#ffffff';
        menuConfig.stroke = '#000'
        this.add.text(game.config.width / 2, 110, 'Click and drag to set velocity', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, 130, 'Hold to slow down', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, 150, 'Click on an activity to interact', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '20px'; 
        this.add.text(game.config.width / 2, game.config.height - 50, 'Click to start', menuConfig).setOrigin(0.5);
        
        //this.add.bitmapText(0, 200, "pixel_font", "MOTHER 3");
        this.input.on("pointerdown", () => {
            this.scene.start("Tutorial");
        });

        
    }

    update(time, delta) {
        this.starfield.tilePositionX -= 0.025 * delta;
      
    }
}
