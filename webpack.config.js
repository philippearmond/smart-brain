const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { //OBJ ABAIXO ADD PARA QUE EU POSSA USAR CSS MODULADO
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      { //OBJ ABAIXO ADD PARA QUE EU POSSA USAR IMPORT DE IMG NO COMPONENTE e instalo url-loader e file-loader
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      ]
    }
    ]
  }
};