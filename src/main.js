import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router/index.js'
// 导入仓库
import store from './store/store.js'

// 导入element-io的样式
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi)

// 导入全局样式
import './style/base.css'

Vue.config.productionTip = false

new Vue({
  // 将路由挂载到Vue实例上
  router,
  // 仓库实例
  store,
  render: h => h(App),
}).$mount('#app')
