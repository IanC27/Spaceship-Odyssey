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
        this.astro = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, "astro", 1);
        this.astro.setScale(2, 2);
        //this.add.bitmapText(0, 200, "pixel_font", "MOTHER 3");
        this.input.on("pointerdown", () => {
            this.scene.start("Tutorial");
        });

        
    }

    update(time, delta) {
        this.starfield.tilePositionX -= 0.025 * delta;
      
    }
}
