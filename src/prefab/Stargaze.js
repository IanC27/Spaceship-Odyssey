class Stargaze extends Activity {
    constructor(scene, x, y, texture, frame, player) {
        super(scene, x, y, texture, frame, player);
        this.displayName = "stargaze";


    }

    activeUpdate(){
        if (Phaser.Input.Keyboard.JustDown(controls.quit)) {
            this.preEnd(this.astronaut);
        }
    }

    onInteract(player){
        this.setFrame(1);
        this.text = this.scene.add.text(this.x, this.y - 20 , 'press q to finish stargazing', {fontSize: '10px', fill: '#ffffff'}).setOrigin(0.5, 0.5);
        this.scene.stressBorder.setFillStyle(0x00ff00, 1);
        this.scene.destressTimer.paused = false;
    }

    end(player) {
        this.text.destroy();
        this.scene.stressBorder.setFillStyle(0xffffff, 1);
        this.scene.destressTimer.paused = true;
        this.setFrame(0)
    }
}