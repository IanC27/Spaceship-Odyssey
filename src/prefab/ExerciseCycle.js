class ExerciseCycle extends Activity {
    onInteract(player) {
        this.scene.scene.launch("ExerciseScene");
        let subScene = this.scene.scene.get("ExerciseScene");
        subScene.events.on("shutdown", () => {
            this.preEnd();
        });
        
    }

    end(){

    }
}

class ExerciseScene extends Phaser.Scene {
    constructor() {
        super("ExerciseScene");
    }

    create() {
        console.log("a new scene!");
        this.input.keyboard.on("keydown", () => {this.scene.stop()})
    }

}