var ncp = require('./node_modules/ncp').ncp;

var testGitName = function (name) {
	if(name.search(/(\.git|\.bow)/g) > -1) {
		return false;
	}
	return true;
};

var moveFiles = function(source, dir) {
	var options = {
		filter: testGitName
	};
	ncp(source, dir, options, function (err) {
		if (err) {
			return console.error(err);
		}
		console.log('Project created at ' + dir);
	});
};

module.exports = function(dir) {
	moveFiles('./base', dir);
}(process.argv[2]);