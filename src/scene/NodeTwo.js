
class NodeTwo extends Phaser.Scene {
    constructor() {
        super("NodeTwo");
    }

    preload() {
        this.load.spritesheet("astro", "assets/astroAnimV1.png", {
            frameWidth: 16,
            frameHeight: 32
        });
        this.load.spritesheet("stargaze_astro", "assets/astroStargaze.png", {
            frameWidth: 16,
            frameHeight: 32
        })
        this.load.image("activity", "assets/activity.png");
        this.load.spritesheet("sleep", "assets/sleepsheet.png", {
            frameWidth: 16,
            frameHeight: 32
        });
        this.load.image("messagehome", "assets/textingBooth.png");
        this.load.image("cycle", "assets/bike.png");
        this.load.image("library", "assets/library.png");
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

        this.load.audio("songNoise", "assets/noiseQ.mp3");
        this.load.audio("goodbleep", "assets/dadeep.wav");
        this.load.audio("ouch", "assets/eeemmp.wav");
        this.load.audio("zipper", "assets/zipper.mp3");
        this.load.audio("zipper_R", "assets/zipper_reversed.mp3");
        this.load.audio("typing", "assets/keyboard.mp3");
        this.load.audio("power_on", "assets/power on.wav");
        this.load.audio("power_down", "assets/powerdown.wav");
        
    }

    create() {
        this.cameras.main.setBackgroundColor('#000');
        controls.interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        controls.next = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        controls.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        controls.quit = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

        // background
        this.add.tileSprite(game.config.width / 2, game.config.height / 2, 1000, 1000, "starfield").setScrollFactor(0.1).setOrigin(0.5, 0.5);
        // create tilemap
        const map = this.add.tilemap("ship_map");
        const tileset = map.addTilesetImage("tilesheet", "ship_tiles");
        const shipLayer = map.createLayer("Ship", tileset, 0, 0);

        // tile 0 is the EMPTY tile, meaning tiles actually start at 1
        // tile index is ID + 1
        shipLayer.setCollision([1]);

        const playerSpawn = map.findObject("objects", obj => obj.name === "Player Spawn");

        this.nate = this.physics.add.sprite(playerSpawn.x, playerSpawn.y, "astro", 1);
        this.nate.setDepth(1);
        this.nate.setInteractive({draggable: true});
        //this.nate.setCollideWorldBounds(true);
        this.nate.setBounceX(0.8);
        this.nate.setBounceY(0.8);
        this.nate.setMaxVelocity(1000, 1000);


        this.physics.add.collider(this.nate, shipLayer);
        // score and status variables
        playerStatus = {
            energy: 100,
            stress: 0,
            homeSickness: 0,

            fitness: 0,
            research: 0,
            family: 0,
            knowledge: 0,
            inventionProgress: 0,
            inventions: 0,
            spaceWalk: false
        }

            
        // flinging controls
        let firstFlingDrag = true;
        let flingStart = {x: 0, y: 0};
        let flingEnd = {x: 0, y: 0};
        this.nate.on('drag', (pointer, dragX, dragY, dropped) => {
            if (firstFlingDrag) {
                firstFlingDrag = false;
                flingStart.x = dragX;
                flingStart.y = dragY;
                this.flingLine = this.add.line(0, 0, flingStart.x, flingStart.y, flingStart.x, flingStart.y, 0x00ff00)
            } else {
                flingEnd.x = dragX;
                flingEnd.y = dragY;
                this.flingLine.setTo(flingStart.x, flingStart.y, flingEnd.x, flingEnd.y);
            }
        })
        this.nate.on('dragend', (pointer, dragX, dragY, dropped) => {
            //console.log("end", dragX, dragY);
            let vectorX = flingEnd.x - flingStart.x;
            let vectorY = flingEnd.y - flingStart.y;
            this.nate.setVelocityX(-vectorX);
            this.nate.setVelocityY(-vectorY);
            this.flingLine.destroy();
            firstFlingDrag = true;
        })

        // breaking
        controls.space.on('down', () => {
            this.nate.setDrag(50);
        });
        controls.space.on('up', () => {
            this.nate.setDrag(0);
        })

        // camera follow
        this.cameras.main.startFollow(this.nate, true, 0.1, 0.1);
        //this.cameras.main.setDeadzone(150, 150);
        
        // activity anims
        this.anims.create({
            key: "sleepAnim",
            frames: this.anims.generateFrameNumbers("sleep", {start: 1, end: 1, first: 1}),
            frameRate: 1,
            repeat: 0
        })
        /*

        this.anims.create({
            key: "messagehomeAnim",
            frames: this.anims.generateFrameNumbers("messagehome", {start: 0, end: 0, first: 0}),
            frameRate: 1,
            repeat: 0
        })
        */

        this.activities = this.physics.add.group({runChildUpdate: true});

        const researchS = map.findObject("objects", obj => obj.name === "Research");
        this.activities.add(new Research(this, researchS.x, researchS.y, "activity", 0, this.nate));

        const sleepS = map.findObject("objects", obj => obj.name === "Sleep");
        this.activities.add(new SleepingBag(this, sleepS.x, sleepS.y, "sleep", 0, this.nate, 60, "sleepAnim"));
        
        const messageS = map.findObject("objects", obj => obj.name === "Message");
        this.activities.add(new MessageHome(this, messageS.x, messageS.y, "messagehome", 0, this.nate, 60));

        const exerciseS = map.findObject("objects", obj => obj.name === "Exercise");
        this.activities.add(new ExerciseCycle(this, exerciseS.x, exerciseS.y, "cycle", 0, this.nate ));

        const libraryS = map.findObject("objects", obj => obj.name === "Library");
        this.activities.add(new Library(this, libraryS.x, libraryS.y, "library", 0, this.nate ));

        const stargazeS = map.findObject("objects", obj => obj.name === "Stargaze");
        this.activities.add(new Stargaze(this, stargazeS.x, stargazeS.y, "stargaze_astro", 0, this.nate));




        // DEBUG ZONE
        // skip to end debug
        this.input.keyboard.on("keydown-MINUS", () => {
            this.gameOver();
        })
        
        // drain energy
        this.input.keyboard.on("keydown-PLUS", () => {
            playerStatus.energy = 0;
        })

        // END DEBUG ZONE

        //setting config
        let timeConfig = {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '28px',
            backgroundColor: '#9999FF',
            color: '#000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        // timer
        this.clockInterval = setInterval(myTimer, 100);
        function myTimer() {
            game.clock.minutes -= 1;
        }
        this.clockRight = this.add.text(0, 0, '24:00', timeConfig);
        this.clockRight.setScrollFactor(0, 0);

        // sleep bar & timers
        this.sleepBorder = this.add.rectangle(game.config.width - 106, 4, 102, 7, 0xffffff);
        this.sleepBorder.setOrigin(0, 0).setScrollFactor(0);
        this.sleepMeter = this.add.rectangle(game.config.width - 105, 5, 100, 5, 0x0000ff).setOrigin(0, 0);
        this.sleepMeter.setScrollFactor(0);
        // after  8 hours, lose 100 sleep
        this.awakeTimer = this.time.addEvent({
            delay: 480,
            callback: this.decrSleep,
            callbackScope: this,
            loop: true
        });
        // reffill 100 sleep after 1 hour asleep
        this.sleepTimer = this.time.addEvent({
            delay: 60,
            callback: this.incrSleep,
            callbackScope: this,
            loop: true,
            paused: true
        });
        

        this.bgm = this.sound.add('songNoise');
        this.bgm.setLoop(true);
        this.bgm.play();
    }


    update(delta ) {
        if (game.clock.minutes <= 0){
            clearInterval(this.clockInterval);
            this.gameOver();
        }
        
        this.clockRight.text = Math.floor(game.clock.minutes / 60).toString().padStart(2, "0") + ':' + (game.clock.minutes % 60).toString().padStart(2, "0");

        if (this.nate.body.velocity.x > 10) {
            this.nate.setFrame(2);
        } else if (this.nate.body.velocity.x < -10) {
            this.nate.setFrame(0);
        } else {
            this.nate.setFrame(1);
        }
    }
    
    gameOver() {
        this.clockRight.text = "00:00";
        this.bgm.stop();
        // remember to add all sub-scene keys to this list
        let subScenes = ["ExerciseScene", "LibScene", "MessageScene"]
        for (let s of subScenes) {
            this.scene.stop(s);
        }
        this.scene.start("gameoverScene");
    }

    addResearch(points) {
        playerStatus.research += points;
    }

    incrSleep() {
        let newEnergy = Math.min(100, playerStatus.energy + 1);
        playerStatus.energy = newEnergy;
        this.sleepMeter.displayWidth = newEnergy;
        this.nate.setMaxVelocity(100, 100);
        this.sleepBorder.setFillStyle(0xffffff, 1);
    }

    decrSleep() {
        let newEnergy = Math.max(0, playerStatus.energy - 1);
        playerStatus.energy = newEnergy;
        this.sleepMeter.displayWidth = newEnergy;
        if (newEnergy === 0){
            this.nate.setMaxVelocity(45, 45);
            this.sleepBorder.setFillStyle(0xff0000, 1);
        }
    }

    
}