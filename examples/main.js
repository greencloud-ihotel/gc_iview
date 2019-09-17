import Vue from "vue";
import VueRouter from "vue-router";
import iview from "iview";
import "iview/dist/styles/iview.css";
import gc_iview from "../src/index";
import App from "./app.vue";
Vue.use(VueRouter);
Vue.use(iview);
// 使用gc_iview
Vue.use(gc_iview);

const router = new VueRouter({
  esModule: false,
  mode: "history",
  routes: [
    {
      path: "/AutoTable",
      component: resolve => require(["./routers/AutoTable.vue"], resolve)
    },
    {
      path: "/EditTable",
      component: resolve => require(["./routers/EditTable.vue"], resolve)
    },
    {
      path: "/CurdLine",
      component: resolve => require(["./routers/CurdLine.vue"], resolve)
    },
    {
      path: "/FilterSearch",
      component: resolve => require(["./routers/FilterSearch.vue"], resolve)
    },
    {
      path: "/DatePickers",
      component: resolve => require(["./routers/DatePickers.vue"], resolve)
    },
    {
      path: "/TFSwitch",
      component: resolve => require(["./routers/TFSwitch.vue"], resolve)
    },
    {
      path: "/SuperSearch",
      component: resolve => require(["./routers/SuperSearch.vue"], resolve)
    },
    {
      path: "/CustomTable",
      component: resolve => require(["./routers/CustomTable.vue"], resolve)
    },
    {
      path: "/FilterList",
      component: resolve => require(["./routers/FilterList.vue"], resolve)
    },
    {
      path: "/UploadImages",
      component: resolve => require(["./routers/UploadImages.vue"], resolve)
    },
    {
      path: "/AutoForm",
      component: resolve => require(["./routers/AutoForm.vue"], resolve)
    }
  ]
});
// 开启debug模式
console.log(router);

Vue.config.debug = true;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
