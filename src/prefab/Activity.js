class Activity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, player, animation, range=100) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.overlap(player, this);
        this.showTextZone = scene.physics.add.existing(scene.add.zone(this.x, this.y, range, range));
        this.justDone = false;

        this.on("overlapstart", () => {
            console.log("overlapstart")
            //console.log(this.inUse,  this.justDone)
            if (!this.inUse && !this.justDone) {
                if (this.condition()) {
                    this.preInteract(player)
                } else {
                    this.failToStart();
                }
            }
            this.justDone = true;
        });

        this.on("overlapend", () => {
            this.justDone = false;
            console.log("overlapend");
        })

        /*
        this.setInteractive();
        this.on("pointerdown", () => {
            if (scene.physics.world.overlap(this, this.astronaut) && !this.inUse){
                if (this.condition()) {
                    this.preInteract(player)
                } else {
                    this.failToStart();
                }
            }
        });
        */

        //this.body.setSize(range, range);
        this.astronaut = player;

        // place an animated sprite while being used
        this.activeAnim = animation;
        // override constructor to disable
        this.disablePlayer = true;
        // move the player and the animated sprite from the center
        this.animOffset = {x: 0, y:0};
        this.canDoTired = false;
        this.inUse = false;
        this.displayName = "Activity";
        this.displayText = this.scene.add.text(this.x, this.y - 30, "", {fontSize: '10px', fill: '#ffaa00'});
        this.displayText.setOrigin(0.5, 0);
    }

    update(time, delta) {
        // code for creating overlap into and exit events
        // https://codepen.io/samme/pen/WaZQOX
        if (!this.inUse) {
            let touching = !this.body.touching.none;
            let wasTouching = !this.body.wasTouching.none;
            //console.log(touching, wasTouching);
            if (touching && !wasTouching) this.emit("overlapstart");
            else if (!touching && wasTouching) this.emit("overlapend");
        }
        
        
        if (this.inUse) {
            this.displayText.text = "";
            this.activeUpdate(time, delta);
        } else if (this.scene.physics.world.overlap(this.showTextZone, this.astronaut)) {
            //console.log("overlap");
            this.displayText.text = this.displayName;
        } else {
            this.displayText.text = "";
        }
    }


    tiredCheck(){
        return (playerStatus.energy > 0);
    }

    // override to perform custom check before interact
    condition() {
        return this.tiredCheck();
    }

    // run if condition not met
    failToStart() {
        this.scene.sound.play("ouch");
        this.scene.sleepBorder.setFillStyle(0xffffff, 1);
        this.scene.time.delayedCall(400, () => {
            this.scene.sleepBorder.setFillStyle(0xff0000, 1);
        })
    }

    preInteract(player) {
        // disable body+object, and hide player
        
        if (this.disablePlayer) {
            player.setVelocity(0, 0);
            this.astronaut.setPosition(this.x + this.animOffset.x, this.y + this.animOffset.y);
            player.disableBody(true, true);

            if (this.activeAnim) {
                this.activeSprite = this.scene.add.sprite(this.x + this.animOffset.x, this.y + this.animOffset.y, this.activeAnim, 0);
                this.activeSprite.play(this.activeAnim);
            }
        }
        //console.log("interacted");
        this.inUse =  true;
        this.onInteract(player);
    }

    preEnd() {
        //re-enable player
        if (this.disablePlayer) {
            if (this.activeAnim) {
                this.activeSprite.destroy();
            }
            this.astronaut.enableBody(false, 0, 0, true, true);
            this.inUse = false;
        }
        
        //console.log("end");
        this.end();
    }

    onInteract(player) {

    }


    end(player) {
        
    }

    activeUpdate(time, delta) {
        
    }
    
    
}