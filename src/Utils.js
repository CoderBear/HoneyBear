// read JSON from a file
exports.readJSON = function(url) {
	try {
		if (typeof window.CACHE[url] === 'string') {
			window.CACHE[url] = JSON.parse(window.CACHE[url]);
		}
		if (window.CACHE[url] === void 0) {
			console.error('utils.readJSON: Unable to read file:', url);
			throw new Error('utils.readJSON: Fail!');
		}
		return window.CACHE[url];
	} catch (e) {
		console.error('utils.readJSON: Invalid JSON!');
		throw e;
	}
};
