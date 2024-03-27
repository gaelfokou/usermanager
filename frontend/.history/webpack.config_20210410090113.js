const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const host = process.env.HOST || "localhost";

module.exports = {
  // entry: path.join(__dirname, "src", "index.js"),
  entry: ['regenerator-runtime/runtime', path.join(__dirname, "src", "index.js")],
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: "/",
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name]-[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: "index.html",
      template: path.join(__dirname, "public", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public/manifest.json",
          to: "manifest.json",
        },
        {
          from: "public/favicon.ico",
          to: "favicon.ico",
        },
        {
          from: "public/logo192.png",
          to: "logo192.png",
        },
        {
          from: "public/logo192.png",
          to: "logo512.png",
        },
      ],
    }),
  ],
  resolve: { extensions: ["*", ".js", ".jsx"] },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    hot: false,
    watchContentBase: true,
    liveReload: true,
    host,
    port: 3000,
    publicPath: "/",
    historyApiFallback: true,
    open: true,
  },
};
