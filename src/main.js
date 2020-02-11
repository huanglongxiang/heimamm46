import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router/index.js'

// 导入element-io的样式
import ElementUi from 'element-ui'
Vue.use(ElementUi)

Vue.config.productionTip = false

new Vue({
  // 将路由挂载到Vue实例上
  router,
  render: h => h(App),
}).$mount('#app')
