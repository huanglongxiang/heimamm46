// 导入vue
import Vue from 'vue'
// 导入Vue-router
import VueRouter from 'vue-router'
// 注册下一个 use
Vue.use(VueRouter)

// 组件引入
import login from '../views/login/login.vue'
// 创建路由对象
const router = new VueRouter({
    routes:[
        {
            path: '/login',
            component: login
        }
    ]
})
// 暴漏出去
export default router