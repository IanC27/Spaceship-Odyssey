
const config = {
    width: 256,
    height: 240,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    pixelArt: true,
    scene: [Load, Menu, GameOver, NodeTwo, ExerciseScene, MessageScene, LibraryScene, ResearchScene]
}

let controls = {};
let playerStatus;

let game = new Phaser.Game(config);