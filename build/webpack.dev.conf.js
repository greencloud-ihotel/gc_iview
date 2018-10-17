/**
 * 本地预览
 */

const path = require("path");
const webpack = require("webpack");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.conf.js");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const apiMocker = require("webpack-api-mocker");

module.exports = merge(webpackBaseConfig, {
  devtool: "eval-source-map",

  // 入口
  entry: {
    main: "./examples/main",
    vendors: ["vue"]
  },
  // 输出
  output: {
    path: path.join(__dirname, "../examples/dist"),
    publicPath: "",
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },
  resolve: {
    alias: {
      gc_iview: "../../src/index",
      vue: "vue/dist/vue.esm.js"
    }
  },
  devServer: {
    before(app) {
      apiMocker(app, path.resolve("./mocker/index.js"), {
        proxy: {
          "/repos/*": "https://api.github.com/"
        },
        changeHost: true
      });
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendors",
      filename: "vendor.bundle.js"
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: path.join(__dirname, "../examples/dist/index.html"),
      template: path.join(__dirname, "../examples/index.html")
    }),
    new FriendlyErrorsPlugin()
  ]
});
