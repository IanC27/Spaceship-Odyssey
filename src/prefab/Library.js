class Library extends Activity {
    constructor(scene, x, y, texture, frame, player, animation, textOffset) {
        super(scene, x, y, texture, frame, player, animation, textOffset);
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
            this.pStress = this.add.text(game.config.width / 2, game.config.height / 2  + 70, "I feel stressed...", { fontSize: '15px', fill: '#aa0000' })
                .setOrigin(0.5, 0.5);
            this.add.tween({
                targets: this.pStress,
                duration: 3000,
                alpha: 0,
                y: game.config.height / 2 + 50,
                ease: "Quad.out"
            });
            this.pointReward = 3;
            this.pointTextColor = "#ff0000";
        } else {
            this.pointReward = 5;
            this.pointTextColor = "#00ff00";
        }

        this.add.text(game.config.width / 2, game.config.height / 2 - 25, "Memorize!", { fontSize: '15px', fill: '#ffffff' })
            .setOrigin(0.5, 0.5);
        this.pointsText = this.add.text(game.config.width / 2 + 10, game.config.height / 2 - 10, "+" + this.pointReward.toString(), { fontSize: '15px', fill: this.pointTextColor });
        this.pointsText.setAlpha(0);
        this.pointsText.setOrigin(0.5, 0.5);

        this.keys = ["Q", "W", "A", "S"];
        this.sprites = {
            Q: this.add.sprite(game.config.width / 2 - 10, game.config.height / 2 - 60, "QKey"),
            W: this.add.sprite(game.config.width / 2 + 10, game.config.height / 2 - 60, "WKey"),
            A: this.add.sprite(game.config.width / 2 - 10, game.config.height / 2 - 40, "AKey"),
            S: this.add.sprite(game.config.width / 2 + 10, game.config.height / 2 - 40, "SKey")
        }

        for (let key of this.keys) {
            this.input.keyboard.on("keydown-" + key, () => {
                this.processKey(key);
            });

            this.sprites[key].setInteractive();
            this.sprites[key].on('pointerdown', () => {
                this.processKey(key);
            });
        }

        this.combo.push(randomElem(this.keys));
        this.playerCombo = [];
        this.index = 0;
        this.time.delayedCall(500, () => this.playSequence());
        
    }

    checkCombo() {
        if (this.playerCombo[this.index] != this.combo[this.index]) {
            this.sound.play("ouch");
            this.scene.stop();
        }
        this.index += 1
        if (this.playerCombo.length == this.combo.length) {
            this.time.delayedCall(500, () => {
                this.sound.play("goodbleep");
                playerStatus.knowledge += this.pointReward
                this.add.tween({
                    targets: this.pointsText,
                    y: { from: game.config.height / 2 - 10, to: game.config.height / 2 - 30 },
                    alpha: { from: 1, to: 0 },
                    ease: "Quad.out",
                    duration: 1500
                })
                if (this.combo.length == 4) {
                    this.time.delayedCall(500, () => {
                        this.scene.stop();
                    });
                } else {
                    this.combo.push(randomElem(this.keys));
                    this.playerCombo = [];
                    this.index = 0;
                    this.playSequence();
                }
            }) 
        }
    }
    processKey(key) {
        //console.log(key);
        this.playerCombo.push(key);
        let sprite = this.sprites[key]
        this.sound.play(key + "_beep");
        sprite.setTint(0x00FF00);
        this.time.delayedCall(100, () => {
            sprite.clearTint();
        });
        this.checkCombo();
        
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
