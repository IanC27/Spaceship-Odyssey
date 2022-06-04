class Stargaze extends Activity {
    constructor(scene, x, y, texture, frame, player, anim, textOffset) {
        super(scene, x, y, texture, frame, player, anim, textOffset);
        this.displayName = "Stargaze";
        this.body.setSize(80, 80);
    }

    condition() {
        return this.tiredCheck && playerStatus.stress > 0;
    }

    failToStart() {}

    activeUpdate(){
        if (Phaser.Input.Keyboard.JustDown(controls.quit) || playerStatus.stress == 0) {
            this.preEnd(this.astronaut);
        }

    }

    onInteract(player){
        this.setFrame(1);
        this.text = this.scene.add.text(this.x, this.y - 20 , '', {fontSize: '10px', fill: '#ffffff'}).setOrigin(0.5, 0.5);
        this.scene.stressBorder.setFillStyle(0x00ff00, 1);
        this.scene.destressTimer.paused = false;
        this.floatyTween = this.scene.add.tween({
            targets: this,
                y: this.y + 10,
                ease: "Quad.inout",
                duration: 2500,
                yoyo: true,
                repeat: -1
        });
        
    }

    end(player) {
        this.text.destroy();
        this.floatyTween.stop();
        this.scene.stressBorder.setFillStyle(0xffffff, 1);
        this.scene.destressTimer.paused = true;
        this.setFrame(0)
    }
}