class MessageHome extends Activity {
    constructor(scene, x, y, texture, frame, player, range=60, animation) {
        super(scene, x, y, texture, frame, player, range);
        this.activeAnim = animation;
        this.displayName = "Message home"
    }
    
    onInteract(player){
        this.scene.scene.launch("MessageScene");
        let subScene = this.scene.scene.get("MessageScene");
        subScene.events.on("shutdown", () => {
            this.preEnd();
        });   
    }

    end(player) {
        playerStatus.family += 100;
        this.setFrame(0);
    }
}

class MessageScene extends Phaser.Scene {
    constructor() {
        super("MessageScene");
    }

    create() {
        this.sfx = this.sound.add("typing", {loop: true});
        this.sfx.play();

        this.add.rectangle(0, 0, game.config.width, 60, 0xffffff).setOrigin(0, 0);
        this.add.text(game.config.width / 2, game.config.height / 2 - 40, "Type!", {fontSize: '10px', fill: '#ffaa00'}).setOrigin(0.5, 0.5);
        this.words = ["father", "message", "busy", "contact", "well", "regards"];
        this.texts = ['<Father>, it has been 133', 'days and we are close to finishing our orbit.', 'I miss you all dearly. Since my last contact', 'with Control, I had been busy keeping the station', 'running and fitted. All is well and I', 'cannot wait to be back, Best Regards, <players name>'];
        // TODO: make the words random?
        this.prompt = this.add.text(game.config.width / 2, game.config.height / 2 - 25, "father", {fontSize: '10px', fill: '#ffff00'}).setOrigin(0.5, 0.5);
        this.comboConfig = {
            resetOnWrongKey: false,
            maxKeyDelay: 0,
            deleteOnMatch: true
        }
        this.wordIndex = 0;
        this.textIndex = 0;
        this.height = 0;
        this.input.keyboard.on('keycombomatch', () => {
                //console.log("match");
                this.sound.play("goodbleep");
                this.prompt.setColor('#00ff00');
                this.add.text(0, this.height, this.texts[this.textIndex], {fontSize: '8px', fill: '#000000'});
                this.time.delayedCall(200, () => {
                    this.prompt.setColor('#ffff00');
                    this.wordIndex++;
                    this.textIndex++;
                    this.height += 10;
                    this.createKeyCombo(this.wordIndex);
                });
                
            })
        this.createKeyCombo(0);    
    }

    createKeyCombo(index) {
        if (index >= this.words.length) {
            this.time.delayedCall(3000, () => {
                this.sfx.stop();
                this.scene.stop();
            });
        } else {
            this.prompt.text = this.words[index];
            this.input.keyboard.createCombo(this.words[index], this.comboConfig);
        }   
    }
}