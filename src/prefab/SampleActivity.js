class SampleActivity extends Activity {
    
    activeUpdate(){
       
    }

    condition() {
        return true;
    }

    onInteract(player) {
        this.word = this.scene.add.bitmapText(this.x, this.y - 40, "pixel_font", "BEGIN")
            .setLetterSpacing(1)
            .setOrigin(0.5, 0.5);
        this.word.setInteractive();
        this.word.on("pointerdown", () => {
            this.scene.scene.start("NodeTwo");
        });
    }

    end(player) {
        this.text.destroy();
        this.scene.scene.start("NodeTwo");
    }
}