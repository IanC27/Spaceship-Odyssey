class ExerciseCycle extends Activity {
    constructor(scene, x, y, texture, frame, player, animation) {
        super(scene, x, y, texture, frame, player, animation);
        this.displayName = "Work out!"
        this.animOffset = {x: -2, y: -6  }
    }

    onInteract(player) {
        this.scene.stressTimer.paused = false;
        this.scene.scene.launch("ExerciseScene");
        let subScene = this.scene.scene.get("ExerciseScene");
        subScene.events.on("shutdown", () => {
            this.preEnd();
        });
    }

    end() {
        this.scene.stressTimer.paused = true;

    }
}

class ExerciseScene extends Phaser.Scene {
    constructor() {
        super("ExerciseScene");
    }

    create() {
        if (playerStatus.stress >= 100) {
            this.pStress = this.add.text(game.config.width / 2, game.config.height / 2  + 20, "I feel stressed...", { fontSize: '15px', fill: '#000000' })
                .setOrigin(0.5, 0.5);
            this.add.tween({
                targets: this.pStress,
                duration: 2000,
                alpha: 0,
                y: game.config.height / 2,
                ease: "Quad.out"
            });
            this.pointReward = 3;
            this.pointTextColor = "#ff0000";
        } else {
            this.pointReward = 5;
            this.pointTextColor = "#00ff00";
        }
        this.pointsText = this.add.text(game.config.width / 2, game.config.height - 10, "+" + this.pointReward.toString(), {fontSize: '15px', fill: this.pointTextColor});
        this.pointsText.setAlpha(0);
        this.pointsText.setOrigin(0.5, 0.5);
        
        let KeyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        let KeyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        //this.add.rectangle(game.config.width / 2, game.config.height / 2 - 50, 75, 40, 0xff0000);
        this.arrow = this.physics.add.sprite(game.config.width / 2, game.config.height / 2 - 40, "arrow");
        this.arrow.setAngularVelocity(100);

        this.leftKeySprite = this.add.sprite(game.config.width / 2 - 26, game.config.height / 2 - 40, "AKey");
        this.leftKeySprite.setInteractive();
        this.rightKeySprite = this.add.sprite(game.config.width / 2 + 26, game.config.height / 2 - 40, "DKey").setAlpha(0.5);
        this.rightKeySprite.setInteractive();
        this.nextKeyLeft = true;

        this.score = 0;
        
        this.leftKeySprite.on("pointerdown", () => {
            this.processLeftKey();
        })
        KeyLeft.on("down", () => {
            this.processLeftKey();
        });

        this.rightKeySprite.on("pointerdown", () => {
            this.processRightKey();
        })
        KeyRight.on("down", () => {
           this.processRightKey();
        });
        
        // 6000ms = 1 hr in game
        this.time.delayedCall(12000, () => {
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

    hit() {
        this.sound.play("goodbleep");
        playerStatus.fitness += this.pointReward;
        this.add.tween({
            targets: this.pointsText,
            y: {from: game.config.height / 2 - 10, to: game.config.height / 2 - 30},
            alpha: {from: 1, to: 0},
            ease: "Quad.out",
            duration: 1500
        });

    }

    processLeftKey() {
        if (this.nextKeyLeft) {
            if (this.arrow.angle < -150 || this.arrow.angle > 150) {
                this.swap(false);
                this.arrow.setAngularVelocity(this.arrow.body.angularVelocity + 10);
                //console.log("left!");
                this.hit();
            } else {
                //console.log("whoops!");
                this.sound.play("ouch");
                this.swap(false);
            }
        } 
    }

    processRightKey() {
        if (!this.nextKeyLeft) {
            if (this.arrow.angle < 30 && this.arrow.angle > -30) {
                this.swap(true);
                this.arrow.setAngularVelocity(this.arrow.body.angularVelocity + 10);
                //console.log("right!");
                this.hit();
            } else {
                //console.log("whoops!");
                this.sound.play("ouch");
                this.swap(true);
            }
        }
    }
}