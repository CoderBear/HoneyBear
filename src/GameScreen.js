import animate;
import event.Emitter as Emitter;
import device;
import ui.View;
import ui.ImageView;
import ui.TextView;

import src.Match3Core as Core;
import src.Utils as Utils;
//var Chance = require('chance');

//Some constants
var CoreGame = new Core();
var level = new Core();
//var chance = new Chance();
/* The Game Screen code.
 * The child of the main application in 
 * the game.  Everything else is a child
 * of game so it is all visible.
 */

exports = Class(ui.View, function(supr) {
    this.init = function(opts) {
        opts = merge(opts, {
            x: 0,
            y: 0,
            width: 576,
            height: 1024,
            backgroundColor: '#37b34a'
        });

        supr(this, 'init', [opts]);

        this.build();
    };

    this.build = function() {
        this.on('app:start', start_game_flow.bind(this));
    };

    // Main Menu Functions
	this.SetMenu = function(menu) {
		this._menu = menu;
	};

	this.GetMenu = function() {
		return this._menu;
	};

	this.OnLaunchMainMenu = function(){
		this.emit('MainMenu');
	};

});

/*
function ReadyGame() {
    CoreGame.InitializeBoard();
    CoreGame.CreateLevel();

    //Find Initial Moves and Clusters
    CoreGame.FindMoves();
    CoreGame.FindClusters();
}
*/

// Starts the game
function start_game_flow() {
	CoreGame.ReadyGame();
	play_game(this);
}

// Game play
function play_game() {
	if(CoreGame.moves.length === 0) {
		end_game_flow.call(this);
	}
}

// function tick() {}
// function update_countdown() {}

// Game End
function end_game_flow() {
	//slight delay before allowing a tap reset
	setTimeout(emit_endgame_event.bind(this), 2000);
}

function emit_endgame_event() {
	this.once('InputSelect', function() {
		this.emit('gamescreen:end');
		reset_game.call(this);
	});
}

function reset_game() {}
