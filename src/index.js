import components from "./components";
import reg from "./libs/regExp";
import { version } from "../package.json";

const useLib = Vue => {
  Vue.prototype.$complie = Vue.complie;
  Vue.prototype.$reg = reg;
};
const install = Vue => {
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
  version,
  install
};
console.log(GC_IVIEW);
export default GC_IVIEW;
