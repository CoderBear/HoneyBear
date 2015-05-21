/* jshint ignore:start */
import AudioManager;
/* jshint ignore:end */

exports.sound = null;
exports.getSound = function() {
	if(!exports.sound) {
		exports.sound = new AudioManager({
			path: 'resources/sounds',
			files:{
				levelmusic:{
					path:'music',
					volume:0.5,
					background:true,
					loop:true
				},
				titlemusic:{
					path:'music',
					volume:0.5,
					background:true,
					loop:true
				},
			}
		});
	}
	return exports.sound;
};