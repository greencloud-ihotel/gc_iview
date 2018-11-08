import iView from "iview";
import "iview/dist/styles/iview.css";
import axios from "axios";
import components from "./components";

const useLib = Vue => {
  Vue.prototype.$http = axios;
  Vue.prototype.$complie = Vue.complie;
  // Vue.use(iView);
};
const install = (Vue, opts = {}) => {
  if (install.installed) return;
  // 安装所有组件
  components.map(component => Vue.component(component.name, component));
  useLib(Vue);
};
// 自动安装
if (typeof window !== "undefined" && window.Vue) {
  console.log("window install");
  install(window.Vue);
  useLib(window.Vue);
  /*  eslint-disable no-new */
  // 渲染到#app
  new window.Vue({
    el: "#app"
  });
}
console.log("export");

export default {
  version: "1.0.0",
  install
};
