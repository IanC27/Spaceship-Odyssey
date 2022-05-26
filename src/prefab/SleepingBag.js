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
        if (Phaser.Input.Keyboard.JustDown(controls.quit)) {
            this.preEnd(this.astronaut);
        }
    }

    onInteract(player){
        if (playerStatus.homeSickness <= 60){
            this.scene.sound.play("zipper");
            this.text = this.scene.add.text(this.x, this.y - 20 , 'press q to wake up', {fontSize: '10px', fill: '#000000'}).setOrigin(0.5, 0.5);
            this.scene.sleepBorder.setFillStyle(0x00ff00, 1);

            this.scene.awakeTimer.paused = true;
            this.scene.sleepTimer.paused = false;

            this.sleepStartTime = game.clock.minutes;
            this.hoursSlept = 0;
        }else{
            this.scene.sound.play("zipper");
            this.text = this.scene.add.text(this.x, this.y - 20 , 'I really miss home...', {fontSize: '10px', fill: '#000000'}).setOrigin(0.5, 0.5);
            this.scene.add.tween({
                targets: this.text,
                duration: 2000,
                alpha: 0,
                y: this.y - 50,
                ease: "Quad.out"
                
            })
            this.scene.time.delayedCall(2000, () => {
                this.text.text = 'press q to wake up';
                this.scene.sleepBorder.setFillStyle(0x00ff00, 1);
                this.scene.awakeTimer.paused = true;
                this.scene.sleepTimer.paused = false;

                this.sleepStartTime = game.clock.minutes;
                this.hoursSlept = 0;
            });
        }
        this.setFrame(1);
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