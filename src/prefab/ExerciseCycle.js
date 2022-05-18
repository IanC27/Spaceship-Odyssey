class ExerciseCycle extends Activity {
    constructor(scene, x, y, texture, frame, player, range=60) {
        super(scene, x, y, texture, frame, player, range);
        this.displayName = "Work out!"
    }

    onInteract(player) {
        this.scene.scene.launch("ExerciseScene");
        let subScene = this.scene.scene.get("ExerciseScene");
        subScene.events.on("shutdown", () => {
            this.preEnd();
        });
        
    }

    end() {

    }


}

class ExerciseScene extends Phaser.Scene {
    constructor() {
        super("ExerciseScene");
    }

    create() {
        
        let KeyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        let KeyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.add.rectangle(game.config.width / 2, game.config.height / 2 - 50, 75, 40, 0xff0000);
        this.arrow = this.physics.add.sprite(game.config.width / 2, game.config.height / 2 - 50, "arrow");
        this.arrow.setAngularVelocity(90);

        this.leftKeySprite = this.add.image(game.config.width / 2 - 26, game.config.height / 2 - 50, "LeftKey");
        this.rightKeySprite = this.add.image(game.config.width / 2 + 26, game.config.height / 2 - 50, "RightKey").setAlpha(0.5);
        this.nextKeyLeft = true;

        this.score = 0;

        KeyLeft.on("down", () => {
            if (this.nextKeyLeft) {
                if (this.arrow.angle < -150 || this.arrow.angle > 150) {
                    this.score += 10;
                    this.swap(false);
                    this.arrow.setAngularVelocity(this.arrow.body.angularVelocity + 10);
                    //console.log("left!");
                    this.sound.play("goodbleep");
                } else {
                    //console.log("whoops!");
                    this.sound.play("ouch");
                    this.swap(false);
                }
            }
        });

        KeyRight.on("down", () => {
            if (!this.nextKeyLeft) {
                if (this.arrow.angle < 30 && this.arrow.angle > -30) {
                    this.score += 10;
                    this.swap(true);
                    this.arrow.setAngularVelocity(this.arrow.body.angularVelocity + 10);
                    //console.log("right!");
                    this.sound.play("goodbleep");
                } else {
                    //console.log("whoops!");
                    this.sound.play("ouch");
                    this.swap(true);
                }
            }
        });
        
        // 6000ms = 1 hr in game
        this.time.delayedCall(12000, () => {
            playerStatus.fitness += this.score;
            this.scene.stop();
        })

    }

    swap(leftIsNext){
        if (leftIsNext) {
            this.nextKeyLeft = true;
            this.rightKeySprite.setAlpha(0.5);
            this.leftKeySprite.setAlpha(1);
        } else {
            this.nextKeyLeft = false;
            this.rightKeySprite.setAlpha(1);
            this.leftKeySprite.setAlpha(0.5);
        }
    }

    update(){
        
        
    }

}