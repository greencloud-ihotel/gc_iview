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
    console.log("NODE_ENV", process.env.NODE_ENV);
    if (process.env.NODE_ENV == "production") {
      config.externals = [
        {
          vue: {
            root: "Vue",
            commonjs: "vue",
            commonjs2: "vue",
            amd: "vue"
          },
          iview: "iview",
          axios: {
            root: "axios",
            commonjs: "axios",
            commonjs2: "axios",
            amd: "axios"
          },
          moment: "moment",
          "animate.css": "animate.css"
        },
        /^iview.*/
      ];
    }
    console.log("BUID_TYPE", process.env.BUID_TYPE);
    if (process.env.BUID_TYPE !== "docs" && config.externals) {
      config.externals.push({ lodash: "lodash" });
    }
  }
};
