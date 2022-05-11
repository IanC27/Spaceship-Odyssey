class MessageHome extends Activity {
    constructor(scene, x, y, texture, frame, player, range=60, animation) {
        super(scene, x, y, texture, frame, player, range);
        this.activeAnim = animation;
    }

    activeUpdate(){
        if (Phaser.Input.Keyboard.JustDown(controls.quit)) {
            this.preEnd(this.astronaut);
        }
        if (Phaser.Input.Keyboard.JustDown(controls.interact)) {
            game.clock.minutes -= 60;
        }
    }

    onInteract(player){
        this.text = []
        this.text.push(this.scene.add.text(this.x, this.y - 60, 'Press q to quit task', {fontSize: '10px',}).setOrigin(0.5, 0.5));
        this.text.push(this.scene.add.text(this.x, this.y - 50, 'Press e to start writing a message home', {fontSize: '10px',}).setOrigin(0.5, 0.5)); 
        this.text.push(this.scene.add.text(this.x, this.y - 40, 'Message: <Father>, it has been 133', {fontSize: '7px',}).setOrigin(0.5, 0.5));
        this.text.push(this.scene.add.text(this.x, this.y - 30, 'days and we are close to finishing our orbit.', {fontSize: '7px',}).setOrigin(0.5, 0.5));
        this.text.push(this.scene.add.text(this.x, this.y - 20, 'I miss you all dearly. Since my last contact', {fontSize: '7px',}).setOrigin(0.5, 0.5));
        this.text.push(this.scene.add.text(this.x, this.y - 10, 'with Control,  had been busy keeping the station', {fontSize: '7px',}).setOrigin(0.5, 0.5));
        this.text.push(this.scene.add.text(this.x, this.y, 'running and fitted. All is well and I', {fontSize: '7px',}).setOrigin(0.5, 0.5));
        this.text.push(this.scene.add.text(this.x, this.y + 10, 'cannot wait to be back, Best Regards, <players name>', {fontSize: '7px',}).setOrigin(0.5, 0.5));
        this.textEntry = this.scene.add.text(0, 0, '', { font: '10px Courier', fill: '#ffff00' });
        this.scene.input.keyboard.on('keydown', (event) => {
            this.textEntry.text += event.key;
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