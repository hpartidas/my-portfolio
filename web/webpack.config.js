const path = require('path');

module.exports = {
  entry: './src/main.src',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.src'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react']
        }
      }
    }]
  }
}
