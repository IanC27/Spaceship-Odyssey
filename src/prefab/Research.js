class Research extends Activity {
    constructor(scene, x, y, texture, frame, player, range=60) {
        super(scene, x, y, texture, frame, player, range);
        this.displayName = "Conduct Research"
    }

    onInteract(){
        this.scene.scene.launch("ResearchScene");
        let subScene = this.scene.scene.get("ResearchScene");
        subScene.events.on("shutdown", () => {
            this.preEnd();
        });   
    }
}

class ResearchScene extends Phaser.Scene {
    constructor() {
        super("ResearchScene");
    }

    create() {
        this.sound.play("power_on");

        const target = this.physics.add.sprite(game.config.width / 2, game.config.height / 2 + 4, "target");
        target.body.setSize(8, 30);
        this.keysVelocity = -80;
        this.keys = ["A", "D", "S", "Q", "W", "E"];
        this.keyGroups = {};
        

        for (let key of this.keys) {
            this.keyGroups[key] = this.physics.add.group({ velocityX: this.keysVelocity });

            this.input.keyboard.on("keydown-" + key, () => {
                console.log(key);
                if (this.physics.world.overlap(target, this.keyGroups[key])) {
                    console.log("nice!");
                    this.sound.play("goodbleep");
                    let group = this.keyGroups[key].getChildren();
                    group.shift().destroy();
                    playerStatus.research += 5;
                } else {
                    this.sound.play("ouch");

                }
            });
        }

        this.time.addEvent({
            delay: 1500,
            callback: this.deployKey,
            callbackScope: this,
            loop: true
        });
        
        this.deployKey()
        this.time.delayedCall(7600, () => {
            this.sound.play("power_down");
            this.scene.stop();
        
        });
    }

    deployKey() {
        let key = this.keys[randomInt(this.keys.length)];
        this.keyGroups[key].add(this.add.sprite(game.config.width, game.config.height / 2, key + "Key"));
    }
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}