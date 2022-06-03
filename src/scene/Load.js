class Load extends Phaser.Scene {
    constructor() {
        super("Load");
    }

    preload() {

        this.load.image("menu", "assets/menu.png")
        // based on this example: https://phaser.io/examples/v3/view/game-objects/bitmaptext/retro-font/retro-text-1#
        this.load.image("pixel_font", "assets/bitmapfont.png");
        
        

        let astroDimensions = {
            frameWidth: 16,
            frameHeight: 32
        };
        this.load.spritesheet("astro", "assets/astroAnimV1.png", astroDimensions);
        this.load.spritesheet("stargaze_astro", "assets/astroStargaze.png", astroDimensions)
        this.load.spritesheet("exercise_astro", "assets/astroExerciseAnim.png", astroDimensions);
        this.load.spritesheet("read_astro", "assets/astroReadAnim.png", astroDimensions)
        this.load.spritesheet("work_astro", "assets/astroCraftAnim.png", astroDimensions)
        this.load.image("activity", "assets/activity.png");
        this.load.spritesheet("sleep", "assets/sleepsheet.png", astroDimensions);
        this.load.image("messagehome", "assets/textingBooth.png");
        this.load.image("cycle", "assets/midbike.png");
        this.load.image("library", "assets/bookshelf2.png");
        this.load.image("stargaze", "assets/stargaze.png");
        this.load.image("background", "assets/MessageHomeBackground.png"); 
        
        this.load.image("LeftKey", "assets/LeftKey.png");
        this.load.image("RightKey", "assets/RightKey.png");
        this.load.image("starfield", "assets/starfield.png");
        this.load.image("arrow", "assets/arrow.png");
        this.load.image("target", "assets/target_box_a.png");
        this.load.image("AKey", "assets/AKey.png");
        this.load.image("DKey", "assets/DKey.png");
        this.load.image("SKey", "assets/SKey.png");
        this.load.image("QKey", "assets/QKey.png");
        this.load.image("WKey", "assets/WKey.png");
        this.load.image("EKey", "assets/EKey.png");

        this.load.image("ship_tiles", "assets/tilesheet.png");
        this.load.tilemapTiledJSON("ship_map", "assets/Node2Map.json");
        this.load.tilemapTiledJSON("menu_map", "assets/Title.json");

        this.load.audio("songNoise", "assets/noiseQ.mp3");
        this.load.audio("goodbleep", "assets/dadeep.wav");
        this.load.audio("ouch", "assets/eeemmp.wav");
        this.load.audio("zipper", "assets/zipper.mp3");
        this.load.audio("zipper_R", "assets/zipper_reversed.mp3");
        this.load.audio("typing", "assets/keyboard.mp3");
        this.load.audio("power_on", "assets/power on.mp3");
        this.load.audio("power_down", "assets/powerdown.mp3");
        this.load.audio("A_beep", "assets/A.wav");
        this.load.audio("S_beep", "assets/S.wav");
        this.load.audio("Q_beep", "assets/Q.wav");
        this.load.audio("W_beep", "assets/W.wav");
        this.load.audio("success", "assets/goodnews.mp3");
        this.load.audio("failure", "assets/badnews.mp3");
    }

    create() {
        let fontConfig = {
            image: "pixel_font",
            width: 10,
            height: 15,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET3,
            charsPerRow: 36,
            spacing: {x: 0, y: 0},
            lineSpacing: 2

        }
        this.cache.bitmapFont.add("pixel_font", Phaser.GameObjects.RetroFont.Parse(this, fontConfig));
        this.scene.start("menuScene");
    }
}