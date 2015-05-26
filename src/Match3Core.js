import animate;
import ui.View;
import ui.ImageView;
import ui.resource.Image as Image;

import src.chance;
//var Chance = require('chance');
var chance = new Chance();

// our images
var img_bee = new Image({
        url: "resources/images/bee.png"
    }),
    img_beehive = new Image({
        url: "resources/images/beehive.png"
    }),
    img_honeycomb = new Image({
        url: "resources/images/honeycomb.png"
    }),
    img_jar = new Image({
        url: "resources/images/honeyjar.png"
    });
var TileBee, TileBeehive, TileHoneycomb, TileJar;

exports = Class(ui.View, function(supr) {
    this.init = function(opts) {
        opts = merge(opts, {
            width: 100,
            height: 100
        });

        supr(this, 'init', [opts]);

        TileBee = new ui.ImageView({
            superview: this,
            width: this.width,
            height: this.height,
            image: img_bee
        });
        TileBeehive = new ui.ImageView({
            superview: this,
            width: this.width,
            height: this.height,
            image: img_beehive
        });
        TileHoneycomb = new ui.ImageView({
            superview: this,
            width: this.width,
            height: this.height,
            image: img_honeycomb
        });
        TileJar = new ui.ImageView({
            superview: this,
            width: this.width,
            height: this.height,
            image: img_jar
        });
    };

    this.build = function() {};

    this.ReadyGame = function() {
        InitializeBoard();
        CreateLevel();

        //Find Initial Moves and Clusters
        FindMoves();
        FindClusters();
    };
});

// Our levels
var level = {
    x: 250,
    y: 113,
    col: 9,
    rows: 9,
    tile_W: 40,
    tile_H: 40,
    tiles: [],
    selectedTile: {
        selected: false,
        col: 0,
        row: 0
    }
};

function InitializeBoard() {
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

        ResolveClusters();
        FindMoves();

        if (moves.length > 0) {
            done = true;
        }
    }
}

function GetRandomTile() {
    var result = chance.integer({
        min: 0,
        max: 3
    });

    switch (result) {
        case 0: // 1st tile type
            return;
        case 1: // 2nd tile type
            return;
        case 2: //3rd tile type
            return;
        case 3: //4th tile type
            return;
    }
}

/* Removes Matches from the game
 * screen and insert new tiles
 */
function ResolveClusters() {
    FindClusters();

    while (clusters.length > 0) {
        RemoveClusters();
        ShiftTiles();
        FindClusters();
    }
}

//find clusters
var clusters = [];

function FindClusters() {
    // Reset clusters
    clusters = [];

    FindHorizontalClusters();
    FindVerticalClusters();
}

function FindHorizontalClusters() {
    // Find horizontal clusters
    for (var j = 0; j < level.rows; j++) {
        // Start with a single tile, cluster of 1
        var matchlength = 1;
        for (var i = 0; i < level.col; i++) {
            var checkcluster = false;

            if (i == level.columns - 1) {
                // Last tile
                checkcluster = true;
            } else {
                // Check the type of the next tile
                if (level.tiles[i][j].type == level.tiles[i + 1][j].type &&
                    level.tiles[i][j].type != -1) {
                    // Same type as the previous tile, increase matchlength
                    matchlength += 1;
                } else {
                    // Different type
                    checkcluster = true;
                }
            }

            // Check if there was a cluster
            if (checkcluster) {
                if (matchlength >= 3) {
                    // Found a horizontal cluster
                    clusters.push({
                        column: i + 1 - matchlength,
                        row: j,
                        length: matchlength,
                        horizontal: true
                    });
                }

                matchlength = 1;
            }
        }
    }
}

function FindVerticalClusters() {
    // Find vertical clusters
    for (var i = 0; i < level.col; i++) {
        // Start with a single tile, cluster of 1
        var matchlength = 1;
        for (var j = 0; j < level.rows; j++) {
            var checkcluster = false;

            if (j == level.rows - 1) {
                // Last tile
                checkcluster = true;
            } else {
                // Check the type of the next tile
                if (level.tiles[i][j].type == level.tiles[i][j + 1].type &&
                    level.tiles[i][j].type != -1) {
                    // Same type as the previous tile, increase matchlength
                    matchlength += 1;
                } else {
                    // Different type
                    checkcluster = true;
                }
            }

            // Check if there was a cluster
            if (checkcluster) {
                if (matchlength >= 3) {
                    // Found a vertical cluster
                    clusters.push({
                        column: i,
                        row: j + 1 - matchlength,
                        length: matchlength,
                        horizontal: false
                    });
                }

                matchlength = 1;
            }
        }
    }
}

// Available moves
var moves = [];

function Swap(x1, y1, x2, y2) {
    var typeswap = level.tiles[x1][y1].type;
    level.tiles[x1][y1].type = level.tiles[x2][y2].type;
    level.tiles[x2][y2].type = typeswap;
}

function FindMoves() {
    // Reset moves
    moves = [];

    CheckHorizontalSwaps();
    CheckVerticalSwaps();

    // Reset clusters
    clusters = [];
}

function CheckHorizontalSwaps() {
    // Check horizontal swaps
    for (var j = 0; j < level.rows; j++) {
        for (var i = 0; i < level.col - 1; i++) {
            // Swap, find clusters and swap back
            Swap(i, j, i + 1, j);
            FindClusters();
            Swap(i, j, i + 1, j);

            // Check if the swap made a cluster
            if (clusters.length > 0) {
                // Found a move
                moves.push({
                    column1: i,
                    row1: j,
                    column2: i + 1,
                    row2: j
                });
            }
        }
    }
}

function CheckVerticalSwaps() {
    // Check vertical swaps
    for (var i = 0; i < level.col; i++) {
        for (var j = 0; j < level.rows - 1; j++) {
            // Swap, find clusters and swap back
            Swap(i, j, i, j + 1);
            FindClusters();
            Swap(i, j, i, j + 1);

            // Check if the swap made a cluster
            if (clusters.length > 0) {
                // Found a move
                moves.push({
                    column1: i,
                    row1: j,
                    column2: i,
                    row2: j + 1
                });
            }
        }
    }
}

// Loop over the cluster tiles and execute a function
function LoopClusters(func) {
    for (var i = 0; i < clusters.length; i++) {
        //  { column, row, length, horizontal }
        var cluster = clusters[i];
        var coffset = 0;
        var roffset = 0;
        for (var j = 0; j < cluster.length; j++) {
            func(i, cluster.column + coffset, cluster.row + roffset, cluster);

            if (cluster.horizontal) {
                coffset++;
            } else {
                roffset++;
            }
        }
    }
}

// remove clusters
function RemoveClusters() {
    // Change the type of the tiles to -1, indicating a removed tile
    LoopClusters(function(index, column, row, cluster) {
        level.tiles[column][row].type = -1;
    });

    for (var i = 0; i < level.col; i++) {
        var shift = 0;
        for (var j = level.rows - 1; j >= 0; j--) {
            if (level.tiles[i][j].type === -1) {
                shift++;
                level.tiles[i][j].shift = 0;
            } else {
                level.tiles[i][j].shift = shift;
            }
        }
    }
}

// Replace removed tiles
function ShiftTiles() {
    for (var i = 0; i < level.col; i++) {
        for (var j = level.rows - 1; j >= 0; j--) {
            // Loop from bottom to top
            if (level.tiles[i][j].type == -1) {
                // Insert new random tile
                level.tiles[i][j].type = GetRandomTile();
            } else {
                // Swap tile to shift it
                var shift = level.tiles[i][j].shift;
                if (shift > 0) {
                    Swap(i, j, i, j + shift);
                }
            }

            // Reset shift
            level.tiles[i][j].shift = 0;
        }
    }
}
