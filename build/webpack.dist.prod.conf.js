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
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist",
    filename: "index.min.js",
    library: "gc_iview",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  externals: [
    {
      iview: "iview",
      lodash: {
        root: "_",
        commonjs: "lodash",
        commonjs2: "lodash",
        amd: "lodash"
      },
      moment: {
        root: "moment",
        commonjs: "moment",
        commonjs2: "moment",
        amd: "moment"
      },
      "animate.css": {
        root: "animate.css",
        commonjs: "animate.css",
        commonjs2: "animate.css",
        amd: "animate.css"
      }
    },
    /^iview.*/
  ],
  plugins: [
    // @todo
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"'
    }),
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: true
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});
