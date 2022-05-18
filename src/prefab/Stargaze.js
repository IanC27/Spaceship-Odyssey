class Stargaze extends Activity {
    constructor(scene, x, y, texture, frame, player, range=60, animation) {
        super(scene, x, y, texture, frame, player, range);
        this.activeAnim = animation;
    }


    onInteract(player){
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