
class NodeThree extends Phaser.Scene {
    constructor() {
        super("NodeThree");
    }

    preload() {
        this.load.image("astro", "assets/astronautV1.png");
        this.load.image("activity", "assets/activity.png")
    }

    create() {
        this.cameras.main.setBackgroundColor('#e55050');
        controls.interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); 
        controls.next = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        controls.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.nate = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, "astro");
        this.nate.setDepth(1)
        this.nate.setInteractive({draggable: true});
        //this.nate.setCollideWorldBounds(true);
        this.nate.setBounceX(0.8);
        this.nate.setBounceY(0.8);
    
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

        // walls
        this.walls = this.physics.add.staticGroup();
        this.walls.add(this.add.rectangle(0, game.config.height / 4, game.config.width, 20, 0xffffff).setOrigin(0, 0));
        this.walls.add(this.add.rectangle(0, game.config.height / 4 + 100, game.config.width, 20, 0xffffff).setOrigin(0, 0));
        this.physics.add.collider(this.nate, this.walls, null, null, this);

        // camera follow
        this.cameras.main.startFollow(this.nate, true, 0.1, 0.1);
        this.cameras.main.setDeadzone(150, 150);

        // the activity
        this.thing_to_do = this.physics.add.sprite(160, 140, "activity");
        // activity range
        this.thing_to_do.setBodySize(60, 60);
        // when within range
        this.physics.add.overlap(this.nate, this.thing_to_do, () => {
            //console.log("in range")
            if (Phaser.Input.Keyboard.JustDown(controls.interact)) {
                console.log("do something")
            }
        }, null, this);
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
    }

    update() {
        if (game.clock.minutes <= 0){
            clearInterval(this.clockInterval);
            this.gameOver();
        }
        if (playerStatus.lastSlept - game.clock.minutes > 60 * 10) {
            playerStatus.tired = true;
            playerStatus.wellRested = false;
            console.log("yawn!")
        }
        
        this.clockRight.text = Math.floor(game.clock.minutes / 60).toString().padStart(2, "0") + ':' + (game.clock.minutes % 60).toString().padStart(2, "0");

    }
    
    gameOver() {
        this.clockRight.text = "00:00";
        this.scene.start("gameoverScene");
    }
}