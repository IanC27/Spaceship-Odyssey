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
        if (playerStatus.stress > 60){
            playerStatus.knowledge += 10;
        }else{
            playerStatus.knowledge += 20;
        }
        this.scene.stressTimer.paused = true;
        this.setFrame(0);
    }
}

class LibraryScene extends Phaser.Scene {
    constructor() {
        super("LibScene");
    }

    create() {
        this.keys = ["Q", "W", "A", "S"];
        this.sprites = {
            Q: this.add.sprite(game.config.width / 2 - 10, game.config.height / 2 - 60, "QKey"),
            W: this.add.sprite(game.config.width / 2 + 10, game.config.height / 2 - 60, "WKey"),
            A: this.add.sprite(game.config.width / 2 - 10, game.config.height / 2 - 40, "AKey"),
            S: this.add.sprite(game.config.width / 2 + 10, game.config.height / 2 - 40, "SKey")
        }
        this.combo = []
        

        this.input.keyboard.on('keycombomatch', () => {
                this.sound.play("goodbleep");
                this.combo.push(this.keys[randomInt(this.keys.length)]);
                this.time.delayedCall(200, () => {
                    this.input.keyboard.createCombo(this.combo, {deleteOnMatch: true});
                    this.playSequence();
                });
        });

        for (let key of this.keys) {
            this.input.keyboard.on("keydown-" + key, () => {
                console.log(key);
                if (this.blinkEvent.paused) {
                    let sprite = this.sprites[key]
                    this.sound.play(key + "_beep");
                    sprite.setTint(0x00FF00);
                    this.time.delayedCall(100, () => {
                        sprite.clearTint();
                    });
                }
        });
        }

        this.blinkEvent = this.time.addEvent({
            delay: 200,
            callback: this.blink,
            args: [],
            callbackScope: this,
            repeat: 0,
            paused: true
        });

        this.time.delayedCall(5000, () => this.scene.stop());

        this.combo.push(this.keys[randomInt(this.keys.length)]);
        this.combo.push(this.keys[randomInt(this.keys.length)]);
        this.input.keyboard.createCombo(this.combo, {deleteOnMatch: true});
        this.playSequence();
    }

    blink(i) {
        // at last item in combo
        if (i == this.combo.length - 1) {
            this.blinkEvent.paused = true;
        }
        let sprite = this.sprites[this.combo[i]]
        sprite.setTint(0x00FF00);
        console.log("blink", i);
        // play sound
        this.sound.play(this.combo[i] + "_beep");
        this.blinkEvent.args = [i + 1];
        this.time.delayedCall(100, () => {
            sprite.clearTint();
        })

    }

    playSequence() {
        this.blinkEvent.args = [0];
        this.blinkEvent.repeat = this.combo.length;
        this.blinkEvent.paused = false;
    }
}
