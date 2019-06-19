import components from "./components";

const useLib = Vue => {
  Vue.prototype.$complie = Vue.complie;
  // Vue.use(iView);
};
const install = (Vue, opts = {}) => {
  if (install.installed) return;
  // 安装所有组件
  useLib(Vue);
  components.map(component => Vue.component(component.name, component));
};
// 自动安装
if (typeof window !== "undefined" && window.Vue) {
  console.log("window install");
  install(window.Vue);
  useLib(window.Vue);
}
const GC_IVIEW = {
  version: "1.0.0",
  install
};
console.log(GC_IVIEW);
export default GC_IVIEW;
