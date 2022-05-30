class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

    preload() {
      //  this.load.image("menu", "assets/menu.png"); // menu 
        this.load.image('space', 'assets/starfield.png');
    }

    create() {
        this.cameras.main.setBackgroundColor('#000');
        // title screen graphic
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'space').setOrigin(0, 0); //fix resolution
        //this.add.sprite(game.config.width /2, game.config.height /2, 'menu');  // menu


        this.knowledgeSuccess = true
        if (playerStatus.knowledge >= 70) {
            this.knowledgeMessage = "Congratulations! All your studyng paid off and you earned your Bachelor's Degree"
        } else if (playerStatus.knowledge >= 50) {
            this.knowledgeMessage = "Great Work! You did enough studying to earn a 2-year Associate's Degree... Could you have gone further?"
        } else if (playerStatus.knowledge > 0) {
            this.knowledgeMessage = "You learned a lot and got some course credit. Only a bit further and you might've been able to earn a degree!"
        } else {
            this.knowledgeMessage = "You didn't make great use of the ship library... Isn't there still so much you want to learn?";
            this.knowledgeSuccess = false;
        }

        this.researchSuccess = true;
        if (playerStatus.research >= 150) {
            this.researchMessage = "Incredible! Through your research efforts, you discovered a safe, cheap, renewable energy source that will benefit humanity for decades to come!";
        } else if (playerStatus.research >= 75) {
            this.researchMessage = "Thanks to your work in the research lab, you discovered a more energy efficient process for making safe drinking water! Is there more to discover?...";
        } else if (playerStatus.research >= 25) {
            this.researchMessage = "Nice job, you discovered a new moon orbiting Jupiter! But you feel like you were on the verge of discovering something even greater..."
        } else {
            this.researchMessage = "You were unable to utilize the station's research lab to it's full potential. What kind of discoveries have still yet to be made?"; //???
            this.researchSuccess = false;
        }

        this.fitnessSuccess = true;
        if (playerStatus.fitness >= 200) {
            this.fitnessMessage = "You really worked on your body and became a well-toned machine. Your image is on the cover of Bodybuilder's Weekly!";
        } else if (playerStatus.fitness >= 25) {
            this.fitnessMessage = "You managed to keep in shape while on board. Good Job!";
        } else {
            this.fitnessMessage = "Unfortunately, being in space that long without enough excercise took it's toll on your body. Your condition once you returned landed you in the hospital for a couple months.";
            this.fitnessSuccess = false;
        }

        this.familySuccess = true;
        if (playerStatus.family >= 60) {
            this.familyMessage = "Despite being away from Earth for 5 whole years, you didn't feel like you missed too much due to your frequent correspondence with your family.";
        } else if (playerStatus.family >= 10) {
            this.familyMessage = "You were overjoyed to see your family again, but also surprised at how much has gone by in 5 years. So many milestones passed by in what felt like moments... You wonder if it was really worth it...";
        } else {
            this.familyMessage = `After years of sending messages with no reply, your family had eventually assumed the worst. Your spouse had remarried, and the rest of your family was getting ready to move on. It was a shock when you returned. They are desperate to know why you couldn't write home.`;
            this.familySuccess = false;
        }

        

        
        
        // menu text configuration
        let gameoverConfig = {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '35px',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            wordWrap: {width: game.config.width - 20}
        }
        this.add.text(game.config.width / 2, 20, 'RESULTS', gameoverConfig)
            .setOrigin(0.5);
        gameoverConfig.fontSize = '20px';
        this.nextText = this.add.text(game.config.width / 2, game.config.height - 30, 'NEXT ==>', gameoverConfig)
            .setOrigin(0.5);
        gameoverConfig.fontFamily = 'Gill Sans, sans-serif';
        gameoverConfig.fontSize = '15px';
        gameoverConfig.stroke = '#000';

        this.results = [this.researchMessage, this.knowledgeMessage, this.fitnessMessage, this.familyMessage];
        this.success = [this.researchSuccess, this.knowledgeSuccess, this.fitnessSuccess, this.familySuccess];
        this.index = 0;
        this.resultText = this.add.text(game.config.width / 2, 40, "", gameoverConfig)
        .setOrigin(0.5, 0.0);

        this.showResults();

        this.input.on("pointerdown", () => {
            this.index++
            if (this.index < this.results.length) {
                this.showResults()
            } else {
                game.clock.minutes = 1440;
                this.scene.start("NodeTwo");
            }
            
        })
        
        /*
        this.add.text(game.config.width / 2, game.config.height / 2 + 20, `Fitness: ${playerStatus.fitness}`, gameoverConfig)
            .setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, `Family Relationships: ${playerStatus.family}`, gameoverConfig)
            .setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 20, `Research: ${playerStatus.research}`, gameoverConfig)
            .setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 40, `Knowledge: ${playerStatus.knowledge}`, gameoverConfig)
            .setOrigin(0.5);
        */
        //Space key
        controls.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);


    }

    showResults() {
        if (this.success[this.index]) {
            this.resultText.setColor("#00ff00");
            this.sound.play("success");
        } else {
            this.resultText.setColor("#ff0000");
            this.sound.play("failure");
        }
        this.resultText.text = this.results[this.index];
        if (this.index == this.results.length - 1) {
            this.nextText.text = "Play Again"
        }
    }

    update(time, delta) {
        this.starfield.tilePositionX -= 0.25;
        if (Phaser.Input.Keyboard.JustDown(controls.restart)) {
            game.clock.minutes = 1440;
            this.scene.start("NodeTwo");
        }
    }
}
