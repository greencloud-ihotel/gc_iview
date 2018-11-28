const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.conf.js");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

process.env.NODE_ENV = "production";

module.exports = merge(webpackBaseConfig, {
  devtool: "source-map",
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "../docs/assets/dist"),
    publicPath: "/dist",
    filename: "index.min.js",
    library: "gc_iview",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  externals: [
    {
      vue: {
        root: "Vue",
        commonjs: "vue",
        commonjs2: "vue",
        amd: "vue"
      },
      iview: "iview"
    },
    /^iview.*/
  ],
  plugins: [
    // @todo
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"'
    })
  ]
});
