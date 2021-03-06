import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router/index.js'
// 导入仓库
import store from './store/store.js'
// 接口调用导入
import { getAPI } from '@/js/getData'

// 导入element-io的样式
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi)

// 导入全局样式
import './style/base.css' //基础样式
import './filter/filter.js'  // 过滤器

// 全局组件导入
import subjectList from '@/components/subjectName.vue'
import enterpriseSelect from '@/components/enterpriseSelect.vue'
import citySelect from '@/components/citySelect.vue'
import myEditer from '@/components/myediter.vue'

Vue.component('subjectList', subjectList)
Vue.component('enterpriseSelect', enterpriseSelect)
Vue.component('citySelect', citySelect)
Vue.component('myEditer', myEditer);

Vue.config.productionTip = false

Vue.prototype.$getAPI = getAPI

new Vue({
  // 将路由挂载到Vue实例上
  router,
  // 仓库实例
  store,
  render: h => h(App),
}).$mount('#app')
