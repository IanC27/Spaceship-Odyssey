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
        this.setFrame(1);
        this.word.setInteractive();
        this.word.on("pointerdown", () => {
            this.scene.music.stop();
            this.scene.sound.play("launch");
            this.scene.add.tween({
                targets: this.scene,
                scrollSpeed: 0.35,
                duration: 2000,
                ease: "Quad.out"

            });
            this.word.destroy();
            this.button.destroy();
            this.scene.time.delayedCall(2000, () => {
                this.scene.scene.start("NodeTwo");
            })
            
        });
    }

    end(player) {
        this.text.destroy();
        this.scene.scene.start("NodeTwo");
    }
}