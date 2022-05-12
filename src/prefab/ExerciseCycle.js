class ExerciseCycle extends Activity {
    onInteract(player) {
        this.scene.scene.launch("ExerciseScene");
        this.scene.time.delayedCall(2000, () => {
            this.scene.scene.stop("ExcerciseScene");
            this.preEnd(this.astronaut);
        })

    }
}

class ExerciseScene extends Phaser.Scene {
    constructor() {
        super("ExerciseScene");
    }

    create() {
        
    }

}