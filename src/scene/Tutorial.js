
class Tutorial extends Phaser.Scene {
    constructor() {
        super("Tutorial");
    }

    preload() {
        this.load.image('instructions', 'assets/instructions.png'); 
    }

    create() {
        this.cameras.main.setBackgroundColor('#000');

        this.add.tileSprite(game.config.width / 2, game.config.height / 2, 1000, 1000, "starfield").setScrollFactor(0.1).setOrigin(0.5, 0.5);
        this.add.tileSprite(game.config.width / 2, game.config.height / 2, 250, 125, "instructions").setScrollFactor(0).setOrigin(0.5, 0.5);
        
        controls.interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        controls.next = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        controls.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        controls.quit = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);


        this.nate = this.physics.add.sprite(game.config.width / 4 + 10, game.config.height / 2 + 20, "astro");
        this.nate.setDepth(1)
        this.nate.setInteractive({draggable: true});
        this.nate.setBounceX(0.8);
        this.nate.setBounceY(0.8);

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
      

        // walls
        this.walls = this.physics.add.staticGroup();
        this.walls.add(this.add.rectangle(0, game.config.height / 4, game.config.width, 20, 0xffffff).setOrigin(0, 0));
        this.walls.add(this.add.rectangle(0, game.config.height / 4 + 100, game.config.width, 20, 0xffffff).setOrigin(0, 0));
        this.walls.add(this.add.rectangle(0, game.config.height / 4, 20, 100, 0xffffff).setOrigin(0, 0));
        this.walls.add(this.add.rectangle(game.config.width , game.config.height / 4, 20, 120, 0xffffff).setOrigin(0, 0));
        this.physics.add.collider(this.nate, this.walls, null, null, this);

        // camera follow
        this.cameras.main.startFollow(this.nate, true, 0.1, 0.1);
        this.cameras.main.setDeadzone(150, 150);
        
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
            this.nate.setVelocityX(this.velocityVector.x);
            this.nate.setVelocityY(this.velocityVector.y);
            this.flingLine.setTo(0, 0, 0, 0);

        })

        // camera follow
        this.cameras.main.startFollow(this.nate, true, 0.1, 0.1);

        this.activities = this.physics.add.group({runChildUpdate: true});
        
        this.activities.add(new SampleActivity(this, 170, 140, "activity", 0, this.nate));
        
        
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
        // UI
        this.add.rectangle(0, 0, game.config.width, 30, 0x6b6b6b)
            .setOrigin(0, 0)
            .setScrollFactor(0);;

        // clock
        this.clockPosX = 4
        this.add.rectangle(this.clockPosX, 4, 70, 19, 0xffffff)
            .setOrigin(0, 0)
            .setScrollFactor(0);
        
        
        this.clockDay = this.add.bitmapText(this.clockPosX + 2, 6, "pixel_font", '');
        this.clockDay.setScrollFactor(0, 0);
        this.clockDay.setLetterSpacing(1);

        this.add.rectangle(this.clockPosX + 14, 12, 3, 2, 0x000000)
            .setOrigin(0, 0)
            .setScrollFactor(0);

        this.clockHour = this.add.bitmapText(this.clockPosX + 19, 6, "pixel_font", '');
        this.clockHour.setScrollFactor(0, 0);
        this.clockHour.setLetterSpacing(1);

        this.add.rectangle(this.clockPosX + 42, 12, 3, 2, 0x000000)
            .setOrigin(0, 0)
            .setScrollFactor(0);


        this.clockMin = this.add.bitmapText(this.clockPosX + 47, 6, "pixel_font", '');
        this.clockMin.setScrollFactor(0, 0);
        this.clockMin.setLetterSpacing(1);

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

        // timer
        
        this.clockInterval = setInterval(myTimer, 100);
        function myTimer() {
            game.clock.minutes -= 1;
        }
        

        this.bgm = this.sound.add('songNoise');
        this.bgm.setLoop(true);
        this.bgm.play();
    }


    update(delta) {
        if (game.clock.minutes <= 0){
            clearInterval(this.clockInterval);
            this.gameOver();
        }
        let days = Math.floor(game.clock.minutes / 1440)
        //console.log(game.clock.minutes % 144);
        let hours = Math.floor((game.clock.minutes % 1440) / 60)
        let minutes = (game.clock.minutes % 60);
        
        this.clockDay.text = days.toString().padStart(1, "0"); 
        this.clockHour.text = hours.toString().padStart(2, "0");
        this.clockMin.text = minutes.toString().padStart(2, "0");

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