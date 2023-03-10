const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname,'src','index.html'),
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
        filename: "style.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/i,
        use: {
            loader: "html-loader",
            options: {
                minimize: true
            }
        }
      },
    ],
  },
  devServer:{
    port:5148,
    open:true,
    liveReload:true,
    watchFiles: ["./src/*.html"],
  }
}