const path = require('path');

module.exports = {
  entry: {
    main: "./public/index.js",
    test: "mocha!./test/index.js"
  },
  output: {
    path: __dirname + "/public/",
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader',
        query: { presets: ['es2015'] } 
      },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loader: "style!css!sass" },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.scss', '.css']
  }
};
