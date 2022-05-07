
class NodeTwo extends Phaser.Scene {
    constructor() {
        super("NodeTwo");
    }

    preload() {
        this.load.image("astro", "assets/astronaut.png");

    }

    create() {
        controls.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        controls.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); 
        this.nate = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, "astro");
        this.nate.setInteractive({draggable: true});
        let firstFlingDrag = true;
        let flingStart = {x: 0, y: 0};
        let flingEnd = {x: 0, y: 0};
        
        this.nate.on('drag', (pointer, dragX, dragY, dropped) => {
            if (firstFlingDrag) {
                firstFlingDrag = false;
                flingStart.x = dragX;
                flingStart.y = dragY;

                this.flingLine = this.add.line(0, 0, flingStart.x, flingStart.y, flingStart.x, flingStart.y, 0x00ff00)
            } else {
                flingEnd.x = dragX
                flingEnd.y = dragY
                
                this.flingLine.setTo(flingStart.x, flingStart.y, flingEnd.x, flingEnd.y);
            }
        })
        this.nate.on('dragend', (pointer, dragX, dragY, dropped) => {
            console.log("end", dragX, dragY);
            let vectorX = flingEnd.x - flingStart.x
            let vectorY = flingEnd.y - flingStart.y
            this.nate.setVelocityX(vectorX);
            this.nate.setVelocityY(vectorY);
            this.flingLine.destroy();
            firstFlingDrag = true;
        })

    }

    update() {

    }
}