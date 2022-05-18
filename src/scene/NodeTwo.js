
class NodeTwo extends Phaser.Scene {
    constructor() {
        super("NodeTwo");
    }

    preload() {
        this.load.image("astro", "assets/astronautV1.png");
        this.load.image("activity", "assets/activity.png")
        this.load.spritesheet("sleep", "assets/sleepsheet.png", {
            frameWidth: 16,
            frameHeight: 32
        });
        this.load.image("messagehome", "assets/textingBooth.png");
        this.load.image("cycle", "assets/bike.png");
        this.load.image("library", "assets/library.png");
        this.load.image("stargaze", "assets/stargaze.png");
        this.load.image("background", "assets/MessageHomeBackground.png"); 
        this.load.image("AKey", "assets/AKey.png");
        this.load.image("LeftKey", "assets/LeftKey.png");
        this.load.image("RightKey", "assets/RightKey.png");

        this.load.image("arrow", "assets/arrow.png");

        this.load.audio("songNoise", "assets/noiseQ.mp3");
        this.load.audio("goodbleep", "assets/dadeep.wav");
        this.load.audio("ouch", "assets/eeemmp.wav");
    }

    create() {
        this.cameras.main.setBackgroundColor('#000');
        controls.interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        //controls.next = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        controls.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        controls.quit = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);


        this.nate = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, "astro");
        this.nate.setDepth(1);
        this.nate.setInteractive({draggable: true});
        //this.nate.setCollideWorldBounds(true);
        this.nate.setBounceX(0.8);
        this.nate.setBounceY(0.8);
        this.nate.setMaxVelocity(1000, 1000)
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

        this.sleepBorder = this.add.rectangle(game.config.width - 106, 4, 102, 7, 0xffffff);
        this.sleepBorder.setOrigin(0, 0).setScrollFactor(0);
        this.sleepMeter = this.add.rectangle(game.config.width - 105, 5, 100, 5, 0x0000ff).setOrigin(0, 0);
        this.sleepMeter.setScrollFactor(0);
        // after about 5 hours, lose 100 sleep
        this.awakeTimer = this.time.addEvent({
            delay: 300,
            callback: this.decrSleep,
            callbackScope: this,
            loop: true
        });
        this.sleepTimer = this.time.addEvent({
            delay: 60,
            callback: this.incrSleep,
            callbackScope: this,
            loop: true,
            paused: true
        });
        
            
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
            this.nate.setVelocityX(vectorX);
            this.nate.setVelocityY(vectorY);
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

        // skip to end debug
        /*controls.next.on('down', () => {
            //this.gameOver();
        })
        */
        // walls
        this.walls = this.physics.add.staticGroup();
        this.walls.add(this.add.rectangle(-game.config.width / 2, game.config.height / 4, game.config.width*2, 20, 0xffffff).setOrigin(0, 0));
        this.walls.add(this.add.rectangle(-game.config.width / 2, game.config.height / 4 + 100, game.config.width*2, 20, 0xffffff).setOrigin(0, 0));
        this.walls.add(this.add.rectangle(-game.config.width * 0.5, game.config.height / 3, 20, 100, 0xffffff  ).setOrigin(0, 0))
        this.walls.add(this.add.rectangle(game.config.width * 1.5, game.config.height / 3, 20, 120, 0xffffff  ).setOrigin(0, 0))
        this.physics.add.collider(this.nate, this.walls, null, null, this);

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
        
        this.activities.add(new SampleActivity(this, 0, 140, "activity", 0, this.nate));
        
        this.activities.add(new SleepingBag(this, 60, 140, "sleep", 0, this.nate, 60, "sleepAnim"));
        
        this.activities.add(new MessageHome(this, 120, 140, "messagehome", 0, this.nate, 60));

        this.activities.add(new ExerciseCycle(this, 180, 140, "cycle", 0, this.nate ));

        this.activities.add(new Library(this, 240, 140, "library", 0, this.nate ));

        this.activities.add(new Stargaze(this, 300, 140, "stargaze", 0, this.nate ));
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

    }
    
    gameOver() {
        this.clockRight.text = "00:00";
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