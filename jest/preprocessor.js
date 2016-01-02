var babelJest = require('babel-jest');
//var webpackAlias = require('jest-webpack-alias');
module.exports = {
    process: function(src, filename) {
	return src;
	if (filename.indexOf('node_modules') === -1
	    && filename.indexOf("libs") === -1) {
	    src = babelJest.process(src, filename);
	    if(filename.indexOf(".jsx")>-1){
		//src = webpackAlias.process(src, filename);
	    }
	}
	return src;
    }
};
