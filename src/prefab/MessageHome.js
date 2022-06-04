class MessageHome extends Activity {
    constructor(scene, x, y, texture, frame, player, animation, textOffset) {
        super(scene, x, y, texture, frame, player, animation, textOffset);
        this.activeAnim = animation;
        this.displayName = "Message home"
        this.animOffset = {x: -5, y: 0}
    }
    
    onInteract(player){
        this.scene.scene.launch("MessageScene");
        let subScene = this.scene.scene.get("MessageScene");
        subScene.events.on("shutdown", () => {
            this.preEnd();
        });   
    }

    end(player) {
        if (playerStatus.stress >= 100){
            playerStatus.family += 10;
        }else{
            playerStatus.family += 15;
        }
        this.scene.resetHS();
    }
}

class MessageScene extends Phaser.Scene {
    constructor() {
        super("MessageScene");
    }

    create() {
        this.sfx = this.sound.add("typing", {loop: true});
        this.sfx.play();

        this.buttonBounds = {
            x_min: 30,
            x_max: game.config.width - 30,
            y_min: 70,
            y_max: game.config.height - 30
        }

        this.add.rectangle(0, 0, game.config.width, 60, 0xffffff).setOrigin(0, 0);
        this.prompt =this.add.text(game.config.width / 2, game.config.height / 2 - 40, "Type!", {fontSize: '15px', fill: '#000000'}).setOrigin(0.5, 0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 20, "", {fontSize: '15px', fill: '#ffaa00'}).setOrigin(0.5, 0.5);
        this.texts = ['<Father>, it has been 133', 'days and we are close to finishing our orbit.', 'I miss you all dearly. Since my last contact', 'with Control, I had been busy keeping the station', 'running and fitted. All is well and I', 'cannot wait to be back, Best Regards, <players name>'];
        // TODO: make the words random?
        

        this.keys = ["A", "S", "Q", "W"];
        for (let key of this.keys) {
            this.input.keyboard.on("keydown-" + key, () => {
                if (key == this.currKey) {
                    this.hitKey();
                }
            });
        }
        
        this.button = this.add.sprite(0, 0, "AKey");
        this.button.setOrigin(0.5, 0.5);
        this.button.setInteractive();
        this.button.on("pointerdown", () => {
            this.hitKey();
        })
        this.textIndex = 0;
        this.height = 0;
        this.newButton(); 
    }

    hitKey() {
        this.sound.play("goodbleep");
        this.add.text(0, this.height, this.texts[this.textIndex], {fontSize: '8px', fill: '#000000'});
        this.textIndex++;
        this.height += 10;
        this.button.setTint(0x00FF00);
        this.time.delayedCall(100, () => {
            this.newButton();
        })
    }

    newButton() {
        if (this.textIndex >= this.texts.length) {
            this.prompt.text = "Sending. . .";
            this.button.destroy();
            this.time.delayedCall(3000, () => {
                this.sfx.stop();
                this.scene.stop();
            });
        } else {
            this.button.setTint(0xFFFFFF);
            this.button.x = randomInt(this.buttonBounds.x_min, this.buttonBounds.x_max);
            this.button.y = randomInt(this.buttonBounds.y_min, this.buttonBounds.y_max);
            this.currKey = randomElem(this.keys);
            this.button.setTexture(this.currKey + "Key");
        }
    }
}