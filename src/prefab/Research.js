class Research extends Activity {
    constructor(scene, x, y, texture, frame, player, animation) {
        super(scene, x, y, texture, frame, player, animation);
        this.displayName = "Research";
        this.animOffset = {x: 0, y: 10}
    }

    onInteract(){
        this.scene.stressTimer.paused = false;
        this.scene.scene.launch("ResearchScene");
        let subScene = this.scene.scene.get("ResearchScene");
        subScene.events.on("shutdown", () => {
            this.preEnd();
        });   
    }

    end() {
        this.scene.stressTimer.paused = true;
    }
}

class ResearchScene extends Phaser.Scene {
    constructor() {
        super("ResearchScene");
    }

    create() {
        this.sound.play("power_on");
        this.keysVelocity = -80;
        this.maxCount = 5;

        if (playerStatus.stress >= 100) {
            this.pStress = this.add.text(game.config.width / 2, game.config.height / 2  - 40, "I feel stressed...", { fontSize: '15px', fill: '#aa0000', })
                .setOrigin(0.5, 0.5);
            this.add.tween({
                targets: this.pStress,
                duration: 3000,
                alpha: 0,
                y: game.config.height / 2 - 60,
                ease: "Quad.out"
            });
            this.pointReward = 3;
            this.pointTextColor = "#ff0000";
        } else {
            this.pointReward = 5;
            this.pointTextColor = "#00ff00";
        }

        this.pointsText = this.add.text(game.config.width / 2 + 20, game.config.height - 10, "+" + this.pointReward.toString(), {fontSize: '15px', fill: this.pointTextColor});
        this.pointsText.setAlpha(0);
        this.pointsText.setOrigin(0.5, 0.5);
        

        this.count = 0;
        this.keys = ["A", "D", "S", "Q", "W"];
        this.keyGroups = {};
        this.keyButtons = {};
        let buttonX = 89;
        this.target = this.physics.add.sprite(game.config.width / 2, game.config.height / 2 + 4, "target");
        this.target.body.setSize(8, 30);
        

        for (let key of this.keys) {
            this.keyGroups[key] = this.physics.add.group({ velocityX: this.keysVelocity });
            this.keyButtons[key] = this.add.sprite(buttonX, game.config.height - 90, key + "Key");
            buttonX += 20;

            this.keyButtons[key].setInteractive()
            this.keyButtons[key].on('pointerdown', () => {
                this.processKey(key);
            });
            
            this.input.keyboard.on("keydown-" + key, () => {
                this.processKey(key);
            });
        }

        this.time.addEvent({
            delay: 1500,
            callback: this.deployKey,
            callbackScope: this,
            loop: true
        });
        
        this.deployKey()
        this.time.delayedCall(8000, () => {
            this.sound.play("power_down");
            this.scene.stop();
        })
    }

    deployKey() {
        let key = randomElem(this.keys);
        this.keyGroups[key].add(this.add.sprite(game.config.width, game.config.height / 2, key + "Key"));
    }

    processKey(key) {
        //console.log(key);
        if (this.physics.world.overlap(this.target, this.keyGroups[key])) {
            //console.log("nice!");
            this.sound.play("goodbleep");
            playerStatus.research += this.pointReward;
            this.add.tween({
                targets: this.pointsText,
                y: {from: game.config.height / 2 - 10, to: game.config.height / 2 - 30},
                alpha: {from: 1, to: 0},
                ease: "Quad.out",
                duration: 1500
            });
            let group = this.keyGroups[key].getChildren();
            group.shift().destroy();
            this.count += 1;
        } else {
            this.sound.play("ouch");

        }
    }
}

