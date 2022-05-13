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
        this.add.rectangle(game.config.width / 2, game.config.height / 2, 96, 64, 0x000000);
        this.arrow = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, "arrow");
        this.arrow.setAngularVelocity(45);
        this.arrow.setAngularAcceleration(10);

    }

}