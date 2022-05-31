class SleepingBag extends Activity {
    constructor(scene, x, y, texture, frame, player) {
        super(scene, x, y, texture, frame, player);
        this.displayName = "Sleep";
    }

    condition() {
        //can do if tired
        return true;
    }

    activeUpdate(){
        if (Phaser.Input.Keyboard.JustDown(controls.quit) 
         || playerStatus.energy >= 100) {
            this.preEnd(this.astronaut);
        }
    }

    onInteract(player){
        this.scene.sound.play("zipper");
        this.setFrame(1);
        let delay;
        this.text = this.scene.add.text(this.x, this.y - 20 , '', {fontSize: '10px', fill: '#000000'}).setOrigin(0.5, 0.5);
        if (playerStatus.homeSickness == 100){
            delay = 2000;
            this.text.text = "I really miss home...";
            this.scene.add.tween({
                targets: this.text,
                duration: 2000,
                alpha: 0,
                y: this.y - 50,
                ease: "Quad.out"
            });
        } else {
            delay = 0;
        }
        
        this.scene.time.delayedCall(delay, () => {
            this.text.text = "click to wake up"
            this.text.alpha = 1;
            this.text.y = this.y - 20;
            this.scene.awakeTimer.paused = true;
            this.scene.sleepTimer.paused = false;
            this.scene.sleepBorder.setFillStyle(0x00ff00, 1);
        
        }, this)
        
    }

    end(player) {
        this.scene.sound.play("zipper_R");
        this.text.destroy();
        this.scene.sleepBorder.setFillStyle(0xffffff, 1);
        this.setFrame(0);
        this.scene.awakeTimer.paused = false;
        this.scene.sleepTimer.paused = true;
    }
}