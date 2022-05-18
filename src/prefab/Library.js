class Library extends Activity {
    onInteract(player) {
        this.scene.scene.launch("LibScene");
        let subScene = this.scene.scene.get("LibScene");
        subScene.events.on("shutdown", () => {
            this.preEnd();
        });
        
    }

    end(player) {
        playerStatus.knowledge += 20;
        this.setFrame(0);
    }
}

class LibraryScene extends Phaser.Scene {
    constructor() {
        super("LibScene");
    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 2 - 40, "Remember this key", {fontSize: '10px', fill: '#ffaa00'}).setOrigin(0.5, 0.5);
        this.words = ["aexdhcy", "cdjnpzm", "rxsklsq", "ipuyhta"];
        this.prompt = this.add.text(game.config.width / 2, game.config.height / 2 - 25, "aexdhcy", {fontSize: '10px', fill: '#ffff00'}).setOrigin(0.5, 0.5);
        this.prompt.setVisible(true);
        this.time.delayedCall(3000, () => {
            this.prompt.setVisible(false);
        })
        this.comboConfig = {
            resetOnWrongKey: false,
            maxKeyDelay: 0,
            deleteOnMatch: true
        }
        this.wordIndex = 0;
        this.input.keyboard.on('keycombomatch', () => {
                //console.log("match");
                this.sound.play("goodbleep");
                this.prompt.setColor('#00ff00');
                this.time.delayedCall(200, () => {
                    this.prompt.setColor('#ffff00');
                    this.wordIndex++;
                    this.createKeyCombo(this.wordIndex);
                });
                
            })
        this.createKeyCombo(0);    
    }

    createKeyCombo(index) {
        if (index >= this.words.length) {
            
            this.scene.stop();
        } else {
            this.prompt.text = this.words[index];
            this.prompt.setVisible(true);
            this.time.delayedCall(3000, () => {
                this.prompt.setVisible(false);
            })
            this.input.keyboard.createCombo(this.words[index], this.comboConfig);
        }   
    }
}