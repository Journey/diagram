module.exports = {
  // configuration
  context: __dirname + "/app",
  entry:"",
  output:{
    path:__dirname + "/dist",
    filename:"diagram.js"
  }
  module: {
    loaders: [
      {
	test: /\.jsx?$/,
	exclude: /(node_modules|bower_components)/,
	loader: 'babel' // 'babel-loader' is also a legal name to reference
      }
    ]
  }

};

