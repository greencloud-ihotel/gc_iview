// vue.config.js
module.exports = {
  pages: {
    index: {
      entry: "examples/main.js",
      template: "examples/index.html",
      filename: "index.html"
    }
  },
  css: { extract: false },
  productionSourceMap: false,
  configureWebpack: config => {
    // console.log("NODE_ENV", process.env.NODE_ENV);
    // if (process.env.NODE_ENV == "production") {
    config.externals = [
      {
        vue: "vue",
        iview: "iview",
        axios: "axios",
        moment: "moment",
        "animate.css": "animate.css",
        lodash: "lodash"
      },
      /^iview.*/
    ];
    // }
    // console.log("BUID_TYPE", process.env.BUID_TYPE);
    // if (process.env.BUID_TYPE !== "docs" && config.externals) {
    //   config.externals.push({ lodash: "lodash" });
    // }
  }
};
