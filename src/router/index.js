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

// token 验证相关
import { removeToken,getToken } from "@/utils/token";
import { getInfo } from "@/api/index.js";
import { Message } from 'element-ui'

// 创建路由对象
const router = new VueRouter({
    routes:[
        {
            path: '/',
            redirect: '/login',            
        },
        {
            path: '/login',
            component: login,
            meta: {
                title: '登录'
            }
        },
        {
            path: '/index',
            component: index,
            meta: {
                title: '首页'
            },
            children: [
                {
                    path: "chart",
                    component: chart,
                    meta: {
                        title: '数据概览'
                    }
                },
                {
                    path: "user",
                    component: user,
                    meta: {
                        title: '用户列表'
                    }
                },
                {
                    path: "question",
                    component: question,
                    meta: {
                        title: '题库列表'
                    }
                },
                {
                    path: "enterprise",
                    component: enterprise,
                    meta: {
                        title: '企业列表'
                    }
                },
                {
                    path: "subject",
                    component: subject,
                    meta: {
                        title: '学科列表'
                    }
                }
            ]
        }
    ]
})

// 路由白名单
const whitePath = ['/login']

// 导航守卫 beforeEach 进入之前
router.beforeEach((to, from, next) => {
    // 开启进度条
    NProgress.start();
    // token 判断  1、判断路径是否在白名单之内  2、判断 token 是否存在  3、判断token是否正确
    if (whitePath.includes(to.path.toLocaleLowerCase()) != true) {
        // token 是否存在
        if (getToken() == undefined) {
            Message.warning('请先登录哦~');
            next('/login');
            NProgress.done();
        } else {
            getInfo().then(res => {
                // 判断token是否正确
                if (res.data.code === 206) {
                    Message.warning("登录状态有误，请重新登录");
                    next('/login');
                    NProgress.done();
                    removeToken();
                } else if(res.data.code === 200) {
                    next();
                }
            })
        }
    } else {
        next();
    }
})

// 导航守卫
router.afterEach((to) => {
    // 关闭进度条
    NProgress.done();
    // 更改头标题
    window.document.title = to.meta.title;
})

// 暴漏出去
export default router