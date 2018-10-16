// import 'babel-polyfill'
import Vue from '../node_modules/vue/dist/vue'
import toolkit from '../src/index'
import App from './app.vue'

// 使用toolkit
Vue.use(toolkit)

// 开启debug模式
Vue.config.debug = true
new Vue({
  render: h => h(App)
}).$mount('#app')
