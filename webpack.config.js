const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        // Test declara que extensión de archivos aplicara el loader
        test: /\.m?js$/,
        // Exclude permite omitir archivos o carpetas especificas
        exclude: /node_modules/,
        // Use es un arreglo u objeto donde dices que loader aplicaras
        use: {
          loader: "babel-loader"
          },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Inserción de los elementos
      inject: true,
      // Ubicación del template
      template: './public/index.html',
      // El resultado de la transformación que va a poner en dist
      filename: './index.html'
    })
  ]
}