
class NodeTwo extends Phaser.Scene {
    constructor() {
        super("NodeTwo");
    }

    preload() {
        
 
    }

    create() {
        this.cameras.main.setBackgroundColor('#000');
        controls.interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        controls.next = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
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
        this.nate.setBounceX(0.8);
        this.nate.setBounceY(0.8);
        this.nate.setMaxVelocity(game.config.height / 2, game.config.height / 2);
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
        };

            
        // flinging controls

        this.pointer = this.input.activePointer;
        this.flingLine = this.add.line(0, 0, this.nate.x, this.nate.y, this.nate.x, this.nate.y, 0x00ff00);
        this.flingLine.setDepth(1);
        this.mouseMoved = false;
        
        this.velocityVector = {x: 0, y: 0};

        this.input.on("pointerdown", (pointer) => {
            
            this.nate.setDrag(100);
            this.mouseMoved = false;
            
        });
        
        this.input.on("pointermove", (pointer) => {
            this.mouseMoved = true;
        });
        
        this.input.on("pointerup", (pointer) => {
            /*
            let vX = pointer.downX - pointer.upX
            let vY = pointer.downY - pointer.upY
            console.log(vX, vY);
            */
            if (this.mouseMoved) {
                this.nate.setVelocityX(this.velocityVector.x);
                this.nate.setVelocityY(this.velocityVector.y);
                this.mouseMoved = false;
            }
            this.nate.setDrag(0);
            this.flingLine.setTo(0, 0, 0, 0);
            this.velocityVector.x = 0;
            this.velocityVector.y = 0;
        });

        // in case the player drags outside, max velocity it to edge of screen
        this.input.on("pointerupoutside", (pointer) => {
            /*
            let endX = Phaser.Math.Clamp(pointer.upX, 0, game.config.width);
            let endY = Phaser.Math.Clamp(pointer.upY, 0, game.config.height);
            let vX = pointer.downX - endX;
            let vY = pointer.downY - endY;
            console.log(vX, vY);
            */
            this.nate.setVelocityX(this.velocityVector.x);
            this.nate.setVelocityY(this.velocityVector.y);
            this.flingLine.setTo(0, 0, 0, 0);

        })

        // camera follow
        this.cameras.main.startFollow(this.nate, true, 0.1, 0.1);
        //this.cameras.main.setDeadzone(100, 100);
        
        // activity anims

        this.anims.create({
            key: "workAnim",
            frames: this.anims.generateFrameNumbers("work_astro", {start: 0, end: 2, first: 0}),
            frameRate: 4,
            repeat: -1,
            yoyo: true
        });

        this.anims.create({
            key: "bikeAnim",
            frames: this.anims.generateFrameNumbers("exercise_astro", {start: 0, end: 1, first: 0}),
            frameRate: 4,
            repeat: -1,
        })

        this.anims.create({
            key: "readAnim",
            frames: this.anims.generateFrameNumbers("read_astro", {start: 0, end: 1, first: 0}),
            frameRate: 0.4,
            repeat: -1,
        })


        /*

        this.anims.create({
            key: "messagehomeAnim",
            frames: this.anims.generateFrameNumbers("messagehome", {start: 0, end: 0, first: 0}),
            frameRate: 1,
            repeat: 0
        })
        */

        // create activities 
        this.activities = this.physics.add.group({runChildUpdate: true});

        const researchS = map.findObject("objects", obj => obj.name === "Research");
        this.activities.add(new Research(this, researchS.x, researchS.y, "activity", 0, this.nate, "workAnim"));

        const sleepS = map.findObject("objects", obj => obj.name === "Sleep");
        this.activities.add(new SleepingBag(this, sleepS.x, sleepS.y, "sleep", 0, this.nate));
        
        const messageS = map.findObject("objects", obj => obj.name === "Message");
        this.activities.add(new MessageHome(this, messageS.x, messageS.y, "messagehome", 0, this.nate, "workAnim"));

        const exerciseS = map.findObject("objects", obj => obj.name === "Exercise");
        this.activities.add(new ExerciseCycle(this, exerciseS.x, exerciseS.y, "cycle", 0, this.nate, "bikeAnim"));

        const libraryS = map.findObject("objects", obj => obj.name === "Library");
        this.activities.add(new Library(this, libraryS.x, libraryS.y, "library", 0, this.nate, "readAnim"));

        const stargazeS = map.findObject("objects", obj => obj.name === "Stargaze");
        this.activities.add(new Stargaze(this, stargazeS.x, stargazeS.y, "stargaze_astro", 0, this.nate));

        // create wall text
        const commsSign = map.findObject("objects", obj => obj.name === "Comms");
        // right aligned text
        this.add.bitmapText(commsSign.x, commsSign.y, "pixel_font", "COMMS", false, 2)
            .setLetterSpacing(1)
            .setOrigin(1, 0.5);

        const libSign = map.findObject("objects", obj => obj.name === "LibrarySign");
        this.add.bitmapText(libSign.x, libSign.y, "pixel_font", "LIBRARY")
            .setLetterSpacing(1)
            .setOrigin(0, 0.5);

        const gymSign = map.findObject("objects", obj => obj.name === "Gym");
        this.add.bitmapText(gymSign.x, gymSign.y, "pixel_font", "G Y M")
            .setLetterSpacing(1)
            .setOrigin(0.5, 0)
            .setMaxWidth(1);

        const quartersSign = map.findObject("objects", obj => obj.name === "Quarters");
        this.add.bitmapText(quartersSign.x, quartersSign.y, "pixel_font", "Q U A R T E R S")
            .setLetterSpacing(1)
            .setOrigin(0.5, 0)
            .setMaxWidth(1);

        const labSign = map.findObject("objects", obj => obj.name === "Lab");
        this.add.bitmapText(labSign.x, labSign.y, "pixel_font", "LAB")
            .setLetterSpacing(1)
            .setOrigin(0.5, 0.5)
            .setMaxWidth(1);

        // DEBUG ZONE
        // skip to end debug
        this.input.keyboard.on("keydown-MINUS", () => {
            this.gameOver();
        })
        
        // max all bad stuff
        this.input.keyboard.on("keydown-PLUS", () => {
            playerStatus.energy = 0;
            playerStatus.stress = 100;
            playerStatus.homeSickness = 100;
        })

        // END DEBUG ZONE

        // UI ELEMENTS
        // UI config
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
        // 
        this.add.rectangle(0, 0, game.config.width, 30, 0x6b6b6b)
            .setOrigin(0, 0)
            .setScrollFactor(0);

        // timer
        this.clockInterval = setInterval(myTimer, 100);
        function myTimer() {
            game.clock.minutes -= 1;
        }
        this.clockRight = this.add.bitmapText(15, 6, "pixel_font", '00 00');
        this.clockRight.setScrollFactor(0, 0);
        this.clockRight.setLetterSpacing(1);

        // sleep bar
        this.sleeptext = this.add.text(135, 8, "Sleep: ", {fontSize: '8px', fill: '#0000ff'}).setOrigin(0.5, 0.5);
        this.sleeptext.setScrollFactor(0, 0);
        this.sleepBorder = this.add.rectangle(game.config.width - 106, 4, 102, 7, 0xffffff);
        this.sleepBorder.setOrigin(0, 0).setScrollFactor(0);
        this.sleepMeter = this.add.rectangle(game.config.width - 105, 5, 100, 5, 0x0000ff).setOrigin(0, 0);
        this.sleepMeter.setScrollFactor(0);
        // stress bar
        this.stresstext = this.add.text(132, 16, "Stress: ", {fontSize: '8px', fill: '#800080'}).setOrigin(0.5, 0.5);
        this.stresstext.setScrollFactor(0, 0);
        this.stressBorder = this.add.rectangle(game.config.width - 106, 12, 102, 7, 0xffffff);
        this.stressBorder.setOrigin(0, 0).setScrollFactor(0);
        this.stressMeter = this.add.rectangle(game.config.width - 105, 13, 1, 5, 0x800080).setOrigin(0, 0);
        this.stressMeter.setScrollFactor(0);
        // homesickness bar
        this.hstext = this.add.text(118, 24, "Homesickness: ", {fontSize: '8px', fill: '#ff9900'}).setOrigin(0.5, 0.5);
        this.hstext.setScrollFactor(0, 0);
        this.hsBorder = this.add.rectangle(game.config.width - 106, 20, 102, 7, 0xffffff);
        this.hsBorder.setOrigin(0, 0).setScrollFactor(0);
        this.hsMeter = this.add.rectangle(game.config.width - 105, 21, 1, 5, 0xff9900).setOrigin(0, 0);
        this.hsMeter.setScrollFactor(0);
        
        // after 8 hours, lose 100 sleep
        this.awakeTimer = this.time.addEvent({
            delay: 480,
            callback: this.decrSleep,
            callbackScope: this,
            loop: true
        });
        // refill 100 sleep after 1 hour asleep
        this.sleepTimer = this.time.addEvent({
            delay: 60,
            callback: this.incrSleep,
            callbackScope: this,
            loop: true,
            paused: true
        });
        
        this.stressTimer = this.time.addEvent({
            delay: 250,
            callback: this.incrStress,
            callbackScope: this,
            loop: true,
            paused: true
        });

        this.destressTimer = this.time.addEvent({
            delay: 50,
            callback: this.decrStress,
            callbackScope: this,
            loop: true,
            paused: true
        });

        // after 12 hours, gain 100 homesickness
        this.hsTimer = this.time.addEvent({
            delay: 800,
            callback: this.incrHs,
            callbackScope: this,
            loop: true
        });

        this.bgm = this.sound.add('songNoise');
        this.bgm.setLoop(true);
        this.bgm.play();
    }


    update(delta) {
        if (game.clock.minutes <= 0){
            clearInterval(this.clockInterval);
            this.gameOver();
        }
        
        this.clockRight.text = Math.floor(game.clock.minutes / 60).toString().padStart(2, "0") + ' ' + (game.clock.minutes % 60).toString().padStart(2, "0");

        if (this.nate.body.velocity.x > 10) {
            this.nate.setFrame(2);
        } else if (this.nate.body.velocity.x < -10) {
            this.nate.setFrame(0);
        } else {
            this.nate.setFrame(1);
        }

        // update velocity line position constantly
        if (this.pointer.isDown && this.pointer.getDistance() > 10) {
            this.nate.setDrag(0);
            let diffX = Phaser.Math.Clamp(this.pointer.downX - this.pointer.x, -(game.config.width / 2), game.config.width / 2);
            let diffY = Phaser.Math.Clamp(this.pointer.downY - this.pointer.y, -(game.config.height / 2), game.config.height / 2);
            //console.log(diffX, diffY);
            let endPointX = this.nate.x + diffX;
            let endPointY = this.nate.y + diffY;
            this.flingLine.setTo(this.nate.x, this.nate.y, endPointX, endPointY);
            this.velocityVector = {x: diffX, y: diffY};
        }
    }
    
    gameOver() {
        this.clockRight.text = "00:00";
        this.bgm.stop();
        // remember to add all sub-scene keys to this list
        let subScenes = ["ExerciseScene", "LibScene", "MessageScene", "ResearchScene"]
        for (let s of subScenes) {
            this.scene.stop(s);
        }
        this.sound.stopAll();
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

    incrStress() {
        let newStress = Math.min(100, playerStatus.stress + 1);
        playerStatus.stress = newStress;
        this.stressMeter.displayWidth = newStress;
        if (newStress >= 100){
            this.stressBorder.setFillStyle(0xff0000, 1);
        }
    }

    decrStress() {
        let newStress = Math.max(0, playerStatus.stress - 1);
        playerStatus.stress = newStress;
        this.stressMeter.displayWidth = newStress;
    }

    incrHs() {
        let newHs = Math.min(100, playerStatus.homeSickness + 1);
        playerStatus.homeSickness = newHs;
        this.hsMeter.displayWidth = newHs;
    }

    resetHS() {
        playerStatus.homeSickness = 0;
        this.hsMeter.displayWidth = 1;
    }
}