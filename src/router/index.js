// 导入vue
import Vue from 'vue'
// 导入Vue-router
import VueRouter from 'vue-router'
// 注册下一个 use
Vue.use(VueRouter)

// 组件引入
import login from '../views/login/login.vue'
import index from '@/views/index/index'

// 主页嵌套路由页面引入
import chart from '@/views/index/chart/chart'
import user from '@/views/index/user/user'
import question from '@/views/index/question/question'
import subject from '@/views/index/subject/subject'
import enterprise from '@/views/index/enterprise/enterprise'

// 导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建路由对象
const router = new VueRouter({
    routes:[
        {
            path: '/login',
            component: login
        },
        {
            path: '/index',
            component: index,
            children: [
                {
                    path: "chart",
                    component: chart
                },
                {
                    path: "user",
                    component: user
                },
                {
                    path: "question",
                    component: question
                },
                {
                    path: "enterprise",
                    component: enterprise
                },
                {
                    path: "subject",
                    component: subject
                }
            ]
        }
    ]
})

// 导航守卫 beforeEach 进入之前
router.beforeEach((to, from, next) => {
    // 开启进度条
    NProgress.start();
    next();
})

// 导航守卫
router.afterEach(() => {
    // 关闭进度条
    NProgress.done();
})

// 暴漏出去
export default router