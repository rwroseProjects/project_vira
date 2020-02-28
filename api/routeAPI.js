var fs = require('fs');

/*
	routeAPI Module
	This module routes all API's through for the Express Server.
*/

//Recursively walks through every directory and requires every API js file.
var walkRequire = function(dir, app) {
	var list = fs.readdirSync(dir);
	list.forEach(function(file) {

		if (file === "routeAPI.js") return;

		file = dir + '/' + file;
		var stat = fs.statSync(file);
		if (stat && stat.isDirectory()) {
			walkRequire(file, app);
		} else {
			if ((file.split(".").pop()) === "js") {
				require(file)(app);
				// console.log(file);
			}
		}
	}) 
}

module.exports = function(app) {
	
	/* Prior version. Left if for context. Non recursive.
	fs.readdirSync(__dirname).forEach(function(file) {
		if (file == "routeAPI.js") return;
		var name = file.substr(0, file.indexOf('.'));
		require("./"+name)(app);
	});
	*/
	walkRequire(__dirname, app);
}