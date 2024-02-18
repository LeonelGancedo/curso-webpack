const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  mode: "development",
  devtool: 'source-map',
  // watch: true,
  resolve: {
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    }
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
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts",
            publicPath: "../assets/fonts",
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
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [{
        // Lo que debo copiar
        from: path.resolve(__dirname, "src", "assets/images"),
        // Donde se va a pegar en dist
        to: "assets/images"
      }]
    }),
    new Dotenv(),
    new BundleAnalyzerPlugin()
  ],
  devServer : {
    // Dirección donde va a tomar el archivo
    static: path.join(__dirname, 'dist'),
    //Comprimir los archivos
    compress: true,
    // Sirve para tener la historia de lo que sucede en el navegador
    historyApiFallback: true,
    // Puerto a utilizar
    port: 8080,
    open: true,
  }
}