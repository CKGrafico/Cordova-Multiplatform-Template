var ncp = require('./node_modules/ncp').ncp;

var moveFiles = function(source, dir) {
	ncp(source, dir, function (err) {
		if (err) {
			return console.error(err);
		}
		console.log('Project created at ' + dir);
	});
};

module.exports = function(dir) {
	moveFiles('./base', dir);
}(process.argv[2]);