# 开始使用

1. 引入 gc_iview

一般在 webpack 入口页面 main.js 中如下按步骤配置：

```javascript
import Vue from "vue";
import VueRouter from "vue-router";
import App from "components/app.vue";
import Routers from "./router.js";
import iView from "iview"; // step 1:import iview
import "iview/dist/styles/iview.css";
import iView from "gc_iview"; // step 2:import gc_iview

Vue.use(VueRouter);
Vue.use(iView); // step 3:use iview
Vue.use(gc_iview); // step 4:use gc_iview

// The routing configuration
const RouterConfig = {
  routes: Routers
};
const router = new VueRouter(RouterConfig);

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});
```

2.在组件中直接使用 gc_ivew 中的组件,注意:可以直接使用大写方式调用

```javascript
<template>
    <div>
        <AutoTable</AutoTable>
    </div>
</template>
<script>
    export default {
        data () {}
    }
</script>
```
