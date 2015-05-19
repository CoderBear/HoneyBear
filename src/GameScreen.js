import animate;
import device;
import ui.View;
import ui.ImageView;
import ui.TextView;

import src.Match3Core as Core;

//Some constants
var CoreGame = new Core();
var level = new Core();
/* The Game Screen code.
 * The child of the main application in 
 * the game.  Everything else is a child
 * of game so it is all visible.
 */
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
	this.on('app:start',bind(this,start_game_flow));

	ReadyGame();

};

function ReadyGame() {
    // initialize the 2D Level Array
    for (var i = 0; i < level.col; i++) {
        level.tiles[i] = [];
        for (var j = 0; j < level.rows; j++) {
            //Define a tile type and shift type
            level.tiles[i][j] = {
                type: 0,
                shift: 0
            };
        }
    }

    CreateLevel();
}

function CreateLevel() {
    var done = false;

    // keep generating levels unitl it is correct
    while (!done) {
        for (var i = 0; i < level.col; i++) {
            for (var j = 0; j < level.rows; j++) {
                level.tiles[i][j].type = GetRandomTile();
            }
        }

        CoreGame.ResolveClusters();
        CoreGame.FindMoves();

        if(moves.length > 0) {
        	done = true;
        }
    }
}

// Starts the game
function start_game_flow() {}

// Game play
function play_game() {}

function tick() {}

function update_countdown() {}

// Game End
function end_game_flow() {}

function emit_endgame_event() {}
