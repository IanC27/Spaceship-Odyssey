class Stargaze extends Activity {
    constructor(scene, x, y, texture, frame, player) {
        super(scene, x, y, texture, frame, player);
        this.displayName = "stargaze";
    }


    onInteract(player){
        this.setFrame(1);
        this.scene.time.delayedCall(7000, () => {
            game.clock.minutes -= 60;
            this.preEnd(this.astronaut);
        })
    }

    end(player) {
        playerStatus.stress = 0;
        this.setFrame(0)
    }
}