class SampleActivity extends Activity {
    
    activeUpdate(){
        // press q to abandon task
        if (Phaser.Input.Keyboard.JustDown(controls.quit)) {
            this.preEnd(this.astronaut);
        }
        if (this.count > 4){
            this.preEnd(this.astronaut);
        }
        if (Phaser.Input.Keyboard.JustDown(controls.interact)) {
            this.count += 1;
        }
    }

    onInteract(player) {
        this.text = this.scene.add.text(this.x, this.y - 50, 'press e 5 times!', {fontSize: '10px',}).setOrigin(0.5, 0.5);
        this.count = 0;
    }

    end(player) {
        this.text.destroy();
        game.clock.minutes -= 120;
    }
}