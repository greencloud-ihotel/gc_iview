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
    if (process.env.NODE_ENV === "production") {
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
          }
        },
        /^iview.*/
      ];
    }
  }
};
