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
        this.inputKeys = {
            A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        }
        const target = this.physics.add.sprite(game.config.width / 2, game.config.height / 2 + 4, "target");
        target.body.setSize(8, 30 )
        this.keysVelocity = -80
        this.AKeys = this.physics.add.group({
            velocityX: this.keysVelocity
        }) 
        this.DKeys = this.physics.add.group({
            velocityX: this.keysVelocity
        })
        this.input.keyboard.on('keydown-A', (evt) => {
            if (this.physics.world.overlap(target, this.AKeys)) {
                console.log("nice!");
                
            }
        })

        this.physics.add.overlap(target, this.AKeys, (t, keySprite) => {
            if (Phaser.Input.Keyboard.JustDown(this.inputKeys.A)) {
                

            }
        })

        this.deployKey()
        
    }

    deployKey(){
        this.AKeys.add(this.add.sprite(game.config.width, game.config.height / 2, "AKey"));


    }
}