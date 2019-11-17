const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: { //local onde irá o bundle
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [ //faz com que o babel transpile os códigos js 
      {
        test: /\.js$/, //formato dos arquivos
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
      }, {
        test: /.*\.(gif|png|jpe?g)$/i,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  }
};