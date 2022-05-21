class SleepingBag extends Activity {
    constructor(scene, x, y, texture, frame, player, range=60, animation) {
        super(scene, x, y, texture, frame, player, range);
        this.activeAnim = animation;
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
        this.scene.sound.play("zipper");
        this.text = this.scene.add.text(this.x, this.y - 20 , 'press q to wake up', {fontSize: '10px', fill: '#000000'}).setOrigin(0.5, 0.5);
        
        this.scene.awakeTimer.paused = true;
        this.scene.sleepTimer.paused = false;

        this.sleepStartTime = game.clock.minutes;
        this.hoursSlept = 0;
        
        this.play(this.activeAnim);
    }

    end(player) {
        this.scene.sound.play("zipper_R");
        this.text.destroy();
        this.setFrame(0);
        this.scene.awakeTimer.paused = false;
        this.scene.sleepTimer.paused = true;
    }
}