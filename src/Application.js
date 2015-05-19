import device;
import ui.StackView as StackView;
import ui.TextView as TextView;

import src.TitleScreen as TitleScreen;
import src.GameScreen as GameScreen;
import src.SoundController as SoundController;

exports = Class(GC.Application, function() {

    this.initUI = function() {

        var titlescreen = new TitleScreen(); //,
            gamescreen = new GameScreen();

        var rootView = new StackView({
            superview: this,
            x: 0,
            y: 0,
            width: 576,
            height: 1024,
            clip: true,
            scale: device.height / 1024
        });

        rootView.push(titlescreen);

        /* Listen for when the start button has been pressed.
         * Hide title screen and show the title screen.  Then
         * start the game by sending an event.
         */
        titlescreen.on('titlescreen::start', function(){
         rootView.push(gamescreen);
         gamescreen.emit('app:start');
        });

        // Return to the title screen when the game is over
        gamescreen.on('gamescreen:end',function(){
            rootView.pop();
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

});
