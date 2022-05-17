
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
    scene: [Menu, GameOver, NodeTwo, NodeThree, NodeFour, ExerciseScene, MessageScene, LibraryScene]
}

let controls = {};
let playerStatus;

let game = new Phaser.Game(config);