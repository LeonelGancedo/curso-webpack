const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
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
      },
      {
        test: /\.css|.styl$/i,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.woff|.woff2$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name].[ext]",
            outputPath: "./assets/fonts",
            publicPath: "./assets/fonts",
            esModules: false
          }
        }
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
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{
        // Lo que debo copiar
        from: path.resolve(__dirname, "src", "assets/images"),
        // Donde se va a pegar en dist
        to: "assets/images"
      }]
    })
  ]
}