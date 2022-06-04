
class Tutorial extends Phaser.Scene {
    constructor() {
        super("Tutorial");
    }

    preload() {
        //this.load.image('instructions', 'assets/instructions.png'); 
    }

    create() {
        this.cameras.main.setBackgroundColor('#000');

        this.add.tileSprite(game.config.width / 2, game.config.height / 2, 1000, 1000, "starfield").setScrollFactor(0.1).setOrigin(0.5, 0.5);
        //this.add.tileSprite(game.config.width / 2, game.config.height / 2, 250, 125, "instructions").setScrollFactor(0).setOrigin(0.5, 0.5);
        
        controls.interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        controls.next = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        controls.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        controls.quit = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

         // create tilemap
         const map = this.add.tilemap("menu_map");
         const tileset = map.addTilesetImage("tilesheet", "ship_tiles");
         const shipLayer = map.createLayer("Ship", tileset, 0, 0);
 
        // tile 0 is the EMPTY tile, meaning tiles actually start at 1
        // tile index is ID + 1
        shipLayer.setCollision([1]);
 
        const playerSpawn = map.findObject("objects", obj => obj.name === "Player Spawn");

        this.nate = this.physics.add.sprite(playerSpawn.x, playerSpawn.y, "astro");
        this.nate.setDepth(1);
        this.nate.setInteractive({draggable: true});
        this.nate.setBounceX(0.8);
        this.nate.setBounceY(0.8);
        this.physics.add.collider(this.nate, shipLayer);
      

        // camera follow
        this.cameras.main.startFollow(this.nate, true, 0.1, 0.1);
        this.cameras.main.setDeadzone(100, 100);
        
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
        const sBegin = map.findObject("objects", obj => obj.name === "Begin");
        this.activities.add(new SampleActivity(this, sBegin.x, sBegin.y, "activity", 0, this.nate));
        
    }


    update(delta) {
       
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
    
    
}