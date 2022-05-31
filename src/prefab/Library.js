class Library extends Activity {
    constructor(scene, x, y, texture, frame, player, animation) {
        super(scene, x, y, texture, frame, player, animation);
        this.displayName = "Study";
    }

    onInteract(player) {
        this.scene.stressTimer.paused = false;
        this.scene.scene.launch("LibScene");
        let subScene = this.scene.scene.get("LibScene");
        subScene.events.on("shutdown", () => {
            this.preEnd();
        });
    }

    end(player) {
        this.scene.stressTimer.paused = true;
        this.setFrame(0);
    }
}

class LibraryScene extends Phaser.Scene {
    constructor() {
        super("LibScene");
    }

    create() {
        this.combo = []
        if (playerStatus.stress >= 100) {
            this.pStress = this.scene.add.text(this.x, this.y + 20, "This stress is holding me back...", {fontSize: '10px', fill: '#ffaa00'}).setOrigin(0.5, 0.5);
            this.scene.time.delayedCall(2000, () => {
                this.pStress.destroy();
            });
            this.pointReward = 3;
            this.pointTextColor = "#ff0000";
        } else {
            this.pointReward = 5;
            this.pointTextColor = "#00ff00";
        }


        this.add.text(game.config.width / 2, game.config.height / 2 - 25, "Memorize!", {fontSize: '10px', fill: '#ffaa00'})
            .setOrigin(0.5, 0.5);
        this.pointsText = this.add.text(game.config.width / 2, game.config.height / 2 - 10, "+" + this.pointReward.toString(), {fontSize: '10px', fill: this.pointTextColor});
        this.pointsText.setAlpha(0);
        this.pointsText.setOrigin(0.5, 0.5);

        this.keys = ["Q", "W", "A", "S"];
        this.sprites = {
            Q: this.add.sprite(game.config.width / 2 - 10, game.config.height / 2 - 60, "QKey"),
            W: this.add.sprite(game.config.width / 2 + 10, game.config.height / 2 - 60, "WKey"),
            A: this.add.sprite(game.config.width / 2 - 10, game.config.height / 2 - 40, "AKey"),
            S: this.add.sprite(game.config.width / 2 + 10, game.config.height / 2 - 40, "SKey")
        }
        
        

        this.input.keyboard.on('keycombomatch', () => {
            this.keysRemaining = this.combo.length + 1;
                this.time.delayedCall(500, () => {
                    this.sound.play("goodbleep");
                    playerStatus.knowledge += this.pointReward
                    this.add.tween({
                        targets: this.pointsText,
                        y: {from: game.config.height / 2 - 10, to: game.config.height / 2 - 30},
                        alpha: {from: 1, to: 0},
                        ease: "Quad.out",
                        duration: 1500
                    })

                    if (this.combo.length == 5) {
                        this.time.delayedCall(500, () => {
                            this.scene.stop();
                        });
                    } else {
                        this.combo.push(this.keys[randomInt(this.keys.length)]);
                        this.input.keyboard.createCombo(this.combo, {deleteOnMatch: true});
                        this.playSequence();
                    }
                });
        });

        for (let key of this.keys) {
            this.input.keyboard.on("keydown-" + key, () => {
                //console.log(key);
                this.keysRemaining -= 1;
                let sprite = this.sprites[key]
                this.sound.play(key + "_beep");
                sprite.setTint(0x00FF00);
                this.time.delayedCall(100, () => {
                    sprite.clearTint();
                });
                this.time.delayedCall(500, () => {
                    if (this.keysRemaining < 1) {
                        this.sound.play("ouch");
                        this.scene.stop();
                    }
                })
        });
        }

        this.combo.push(this.keys[randomInt(this.keys.length)]);
        this.combo.push(this.keys[randomInt(this.keys.length)]);
        this.keysRemaining = 2;
        this.input.keyboard.createCombo(this.combo, {deleteOnMatch: true});
        this.playSequence();
    }

    playSequence() {
        let tl = this.tweens.createTimeline();
        for (let key of this.combo) {
            tl.add({
                targets: this.sprites[key],
                ease: "Linear",
                duration: 1,
                tint: 0x00FF00,
                repeat: 0,
                yoyo: false,
                delay: 200,
                onComplete: () => (this.sound.play(key + "_beep"))
            });
            tl.add({
                targets: this.sprites[key],
                ease: "Linear",
                duration: 1,
                tint: 0xFFFFFF,
                repeat: 0,
                yoyo: false,
                delay: 100,
            })
            
        }
        tl.play();
    }
}
