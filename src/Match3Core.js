// Our levels
var level = {
    x: 250,
    y: 113,
    col: 8,
    rows,
    8,
    tile_W: 40,
    tile_H: 40,
    tiles: [],
    selectedTile: {
        selected: false,
        col: 0,
        row: 0
    }
};

/* Removes Matches from the game
 * screen and insert new tiles
 */
function ResoveClusters(){
	findClusters();

	while(clusters.length > 0) {
		RemoveClusters();
		ShiftTiles();
		FindClusters();
	}
}

//find clusters
var clusters = [];

function FindClusters(){}

// Available moves
var moves = [];
function Swap(x1,y1,x2,y2){}
function FindMoves(){}

// remove clusters
function RemoveClusters() {}

// Replace removed tiles
function ShiftTiles(){}