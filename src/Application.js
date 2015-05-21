import device;
import ui.StackView as StackView;
import ui.TextView as TextView;

import src.TitleScreen as TitleScreen;
import src.GameScreen as GameScreen;
import src.SoundController as SoundController;

var BOUNDS_WIDTH = 576;
var BOUNDS_HEIGHT = 1024;

exports = Class(GC.Application, function() {

    this.initUI = function() {
        this.ScaleUI();

        var titlescreen = new TitleScreen(),
            gamescreen = new GameScreen();

        var rootView = new StackView({
            superview: this,
            x: 0,
            y: 0,
            width: this.baseWidth,
            height: this.baseHeight,
            clip: true,
            scale: device.height / 1024
        });

        rootView.push(titlescreen);
        var sound = SoundController.getSound();
        sound.play('titlemusic');

        /* Listen for when the start button has been pressed.
         * Hide title screen and show the title screen.  Then
         * start the game by sending an event.
         */
        titlescreen.on('titlescreen::start', function() {
            sound.stop('titlemusic');
            rootView.push(gamescreen);
            sound.play('levelmusic');
            gamescreen.emit('app:start');
        });

        // Return to the title screen when the game is over
        gamescreen.on('gamescreen:end', function() {
            sound.stop('levelmusic');
            rootView.pop();
            sound.play('titlemusic');
        });

        // this.tvHelloWorld = new TextView({
        //     superview: this.view,
        //     text: 'Hello, world!',
        //     color: 'white',
        //     x: 0,
        //     y: 100,
        //     width: this.view.style.width,
        //     height: 100
        // });

    };

    /* Execute after asset resources are loaded.  Splash
     * screen present is removed.
     */
    this.launchUI = function() {
    };

    this.ScaleUI = function() {
        if(device.height > device.width) {
            this.baseWidth = BOUNDS_WIDTH;
            this.baseHeight = device.height * (BOUNDS_WIDTH / device.width);
            this.scale = device.width / this.baseWidth;
        } else{
            this.baseWidth = BOUNDS_HEIGHT;
            this.baseHeight = device.height * (BOUNDS_HEIGHT/device.width);
            this.scale = device.height/this.baseHeight;
        }
        this.view.style.scale = this.scale;
    };

});
