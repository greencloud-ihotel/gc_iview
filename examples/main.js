// import 'babel-polyfill'
import Vue from "vue";
import iview from "iview";
import gc_iview from "../src/index";
import App from "./app.vue";
Vue.use(iview);
// 使用gc_iview
Vue.use(gc_iview);

// 开启debug模式
Vue.config.debug = true;
new Vue({
  render: h => h(App)
}).$mount("#app");
