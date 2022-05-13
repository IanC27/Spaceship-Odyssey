class Activity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, player, range=60) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        scene.physics.add.overlap(player, this, () => {
            if (Phaser.Input.Keyboard.JustDown(controls.interact) && !this.active) {
                this.preInteract(player)
            }
        }, this.condition, this);

        this.body.setSize(range, range);
        this.astronaut = player;
        // override constructor to disable
        this.disablePlayer = true;
        this.active = false;
    }

    update(time, delta) {
        if (this.active) {
            this.activeUpdate(time, delta);
        }
    }

    // override to perform check before interact
    condition(player, activity) {
        return true;
    }

    preInteract(player) {
        // disable body+object, and hide player
        this.active =  true;
        if (this.disablePlayer) {
            player.setVelocity(0, 0)
            player.disableBody(true, true);
        }
        console.log("interacted");
        this.onInteract(player);
    }

    preEnd() {
        //re-enable player
        if (this.disablePlayer) {
            this.astronaut.enableBody(true, this.x, this.y, true, true);
            this.active = false;
        }
        
        console.log("end");
        this.end();
    }

    onInteract(player) {

    }


    end(player) {
        
    }

    activeUpdate(time, delta) {
        
    }
    
    
}