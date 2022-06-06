class SampleActivity extends Activity {
    constructor(scene, x, y, texture, frame, player){
        super(scene, x, y, texture, frame, player);
        this.displayName = "Begin Launch";
    }

    activeUpdate(time, delta) {
       
    }

    condition() {
        return true;
    }

    onInteract(player) {
        this.button = this.scene.add.rectangle(this.x, this.y + 35, 75, 25, 0x00ff00);
        this.word = this.scene.add.bitmapText(this.x, this.y + 35, "pixel_font", "LAUNCH")
            .setLetterSpacing(1)
            .setOrigin(0.5, 0.5);
        this.word.setInteractive();
        this.word.on("pointerdown", () => {
            this.scene.sound.play("goodbleep");
            this.scene.scrollSpeed = 0.25;
            this.word.destroy();
            this.button.destroy();
            this.scene.time.delayedCall(1000, () => {
                this.scene.music.stop();
                this.scene.scene.start("NodeTwo");
            })
            
        });
    }

    end(player) {
        this.text.destroy();
        this.scene.scene.start("NodeTwo");
    }
}