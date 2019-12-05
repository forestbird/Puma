const path = require('path');

module.exports = {
  entry: './js2020/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'all.bundle.js'
  },
  module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
};