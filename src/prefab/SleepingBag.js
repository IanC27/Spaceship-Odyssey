class SleepingBag extends Activity {
    constructor(scene, x, y, texture, frame, player, range=60, animation) {
        super(scene, x, y, texture, frame, player, range);
        this.activeAnim = animation;
        this.displayText = "Sleep";
    }

    condition() {
        //can do if tired
        return true;
    }

    activeUpdate(){
        if (Phaser.Input.Keyboard.JustDown(controls.quit)) {
            this.preEnd(this.astronaut);
        }
        if (Phaser.Input.Keyboard.JustDown(controls.interact)) {
            game.clock.minutes -= 60;
        }

        this.hoursSlept = Math.floor((this.sleepStartTime - game.clock.minutes) / 60)
        this.sleepIndicator.text = `asleep for: ${this.hoursSlept} hours`;        

    }

    onInteract(player){
        this.text = []
        this.text.push(this.scene.add.text(this.x, this.y - 50, 'press q to wake up', {fontSize: '10px',}).setOrigin(0.5, 0.5)); 
        this.text.push(this.scene.add.text(this.x, this.y - 40, 'press e to fast forward', {fontSize: '10px',}).setOrigin(0.5, 0.5));
        
        this.scene.awakeTimer.paused = true;
        this.scene.sleepTimer.paused = false;

        this.sleepIndicator = this.scene.add.text(this.x, this.y - 30, 'asleep for: 0 hours', {fontSize: '10px',}).setOrigin(0.5, 0.5);
        this.sleepStartTime = game.clock.minutes;
        this.hoursSlept = 0;
        
        this.play(this.activeAnim);
    }

    end(player) {
        for (let tex of this.text) {
            tex.destroy()
        }
        this.setFrame(0)
        if (playerStatus.wellRested) {
            console.log("rested well!");
        }
        this.sleepIndicator.destroy();
        this.scene.awakeTimer.paused = false;
        this.scene.sleepTimer.paused = true;
    }
}