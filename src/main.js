
const config = {
    type: Phaser.CANVAS,
    width: 256,
    height: 240,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    pixelArt: true,
    scene: [NodeTwo]
}

let controls = {}

let game = new Phaser.Game(config);