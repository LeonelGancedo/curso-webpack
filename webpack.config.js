const path = require('path');

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
  }
}