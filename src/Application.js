import device;
import animate;

import ui.View as View;

import ui.ImageView as ImageView;
import ui.StackView as StackView;
import ui.TextView as TextView;

import menus.views.MenuView as MenuView;
import .constants.menuConstants as menuConstants;

// import src.TitleScreen as TitleScreen;
// import.GameScreen as GameScreen;
// import.SoundController as SoundController;
import .GameScreen;
import .SoundController;

var BOUNDS_WIDTH = 576;
var BOUNDS_HEIGHT = 1024;

// var titlescreen = new TitleScreen();
var gamescreen = new GameScreen();

var sound = SoundController.getSound();

exports = Class(GC.Application, function(opts) {

    this.initUI = function() {
        this.engine.updateOpts({
            alwaysRepaint: true,
            clearEachFrame: false,
            keyListenerEnabled: false,
            logsEnabled: true,
            noTimestep: false,
            noReflow: true,
            showFPS: false,
            resizeRootView: false,
            preload: ['resources/images', 'resources/sounds']
        });
        this.ScaleUI();

        this._menuBaackground = new ImageView({
            superview: this,
            x: 0,
            y: 0,
            width: this.baseWidth,
            height: this.baseHeight,
            image: 'resources/images/title_screen.png'
        });

        this._createMainMenu();
        this.OnMainMenu();

        // var rootView = new StackView({
        //     superview: this,
        //     x: 0,
        //     y: 0,
        //     width: this.baseWidth,
        //     height: this.baseHeight,
        //     clip: true,
        //     scale: device.height / 1024
        // });

        // rootView.push(titlescreen);
        // sound.play('titlemusic');

        /* Listen for when the start button has been pressed.
         * Hide title screen and show the title screen.  Then
         * start the game by sending an event.
         */
        // titlescreen.on('titlescreen::start', function() {
        //     sound.stop('titlemusic');
        //     rootView.push(gamescreen);
        //     sound.play('levelmusic');
        //     gamescreen.emit('app:start');
        // });

        // Return to the title screen when the game is over
        // gamescreen.on('gamescreen:end', function() {
        //     sound.stop('levelmusic');
        //     rootView.pop();
        //     sound.play('titlemusic');
        // });

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
    this.launchUI = function() {};

    this.ScaleUI = function() {
        if (device.height > device.width) {
            this.baseWidth = BOUNDS_WIDTH;
            this.baseHeight = device.height * (BOUNDS_WIDTH / device.width);
            this.scale = device.width / this.baseWidth;
        } else {
            this.baseWidth = BOUNDS_HEIGHT;
            this.baseHeight = device.height * (BOUNDS_HEIGHT / device.width);
            this.scale = device.height / this.baseHeight;
        }
        this.view.style.scale = this.scale;
    };

    // Additional functions
    this._createMainMenu = function() {
        this._mainMenu = new MenuView({
            superview: this,
            title: 'Honey Bear',
            modal: true,
            items: [{
                item: 'Play Game',
                action: bind(this, 'OnLaunchGame')
            }],
            // showTransitionMethod: menuConstants.trasitionMethod.SCALE,
            // hideTransitionMethod: menuConstants.trasitionMethod.SCALE
        });
    };

    this.OnLaunchGame = function() {
        sound.stop('titlemusic');
        sound.play('levelmusic');
        gamescreen.on('InputSelect',function(){
            console.log("Play Game clicked!");
        })
        gamescreen.emit('app:start');

    };
    this.OnMainMenu = function() {
        sound.play('titlemusic');
        this._mainMenu.show();
    };
});
