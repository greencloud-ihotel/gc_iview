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
    config.externals = {
      vue: "Vue",
      "view-design": "iview",
      axios: "axios",
      moment: "moment",
      "animate.css": "animate.css"
    };
  },
  chainWebpack: config => {
    config.optimization.delete("splitChunks");
    config.plugins.delete("copy");
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    config.plugins.delete("html");
    config.plugins.delete("hmr");
    config.entryPoints.delete("app");
  }
};
