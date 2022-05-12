class MessageHome extends Activity {
    constructor(scene, x, y, texture, frame, player, range=60, animation) {
        super(scene, x, y, texture, frame, player, range);
        this.activeAnim = animation;
    }

    preload() {
        this.load.image("background", "assets/MessageHomeBackground.png"); 
    }

    activeUpdate(){
        
    }
    
    onInteract(player){
        this.scene.add.sprite(game.config.width /2, game.config.height /2, 'background');
        this.text = []
        this.text.push(this.scene.add.text(this.x, this.y - 40, 'Type the following words: father, message,', {fo ntSize: '10px', fill: '#ffff00'}).setOrigin(0.5, 0.5));
        this.text.push(this.scene.add.text(this.x, this.y - 30, 'contact, busy, well, regards', {fontSize: '10px', fill: '#ffff00'}).setOrigin(0.5, 0.5)); 
        // this event remains after activity is over: consider converting this activity to it's own scene
        this.scene.input.keyboard.createCombo("father");
        this.scene.input.keyboard.on('keycombomatch', function (event) {
            this.scene.add.text(0, 0, 'Message: <Father>, it has been 133', {fontSize: '8px', fill: '#ffff00'});
            this.scene.input.keyboard.createCombo("message");
            this.scene.input.keyboard.on('keycombomatch', function (event) {
                this.scene.add.text(0, 10, 'days and we are close to finishing our orbit.', {fontSize: '8px', fill: '#ffff00'});
                this.scene.input.keyboard.createCombo("contact");
                this.scene.input.keyboard.on('keycombomatch', function (event) {
                    this.scene.add.text(0, 20, 'I miss you all dearly. Since my last contact', {fontSize: '8px', fill: '#ffff00'});
                    this.scene.input.keyboard.createCombo("busy");
                    this.scene.input.keyboard.on('keycombomatch', function (event) {
                        this.scene.add.text(0, 30, 'with Control,  had been busy keeping the station', {fontSize: '8px', fill: '#ffff00'});
                        this.scene.input.keyboard.createCombo("well");
                        this.scene.input.keyboard.on('keycombomatch', function (event) {
                            this.scene.add.text(0, 40, 'running and fitted. All is well and I', {fontSize: '8px', fill: '#ffff00'});
                            this.scene.input.keyboard.createCombo("regards");
                            this.scene.input.keyboard.on('keycombomatch', function (event) {
                                this.scene.add.text(0, 50, 'cannot wait to be back, Best Regards, <players name>', {fontSize: '8px', fill: '#ffff00'});
                            });
                        });
                    });
                });
            });
        });
        // play animation if there is one
        if (this.activeAnim){
            this.play(this.activeAnim);
        }
        
    }

    end(player) {
        for (let tex of this.text) {
            tex.destroy()
        }
        this.setFrame(0)
        this.textEntry.destroy();
    }
}