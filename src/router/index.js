// 导入vue
import Vue from 'vue'
// 导入Vue-router
import VueRouter from 'vue-router'
// 注册下一个 use
Vue.use(VueRouter)

// 组件引入
import login from '../views/login/login.vue'
import index from '@/views/index/index'
import childrenRouter from './childrenRouter'

// 导入进度条 插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// token 验证相关
import {
    removeToken,
    getToken
} from "@/utils/token";
import {
    getInfo
} from "@/api/index.js";
import {
    Message
} from 'element-ui'

// 导入仓库与相关对象
import store from '@/store/store.js'

// 创建路由对象
const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            component: login,
            meta: {
                title: '登录',
                rules: ['管理员','老师','学生']
            }
        },
        {
            path: '/index',
            component: index,
            meta: {
                title: '首页',
                rules: ['管理员','老师','学生']
            },
            children: childrenRouter
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
                } else if (res.data.code === 200) {
                    // 权限判断
                    if (res.data.data.status == 1) {
                        // 成功后，对接口数据进行处理
                        const userlogin = {
                            username: res.data.data.username,
                            avatar: process.env.VUE_APP_URL + '/' + res.data.data.avatar
                        };
                        // 判定弹框的页面
                        if (whitePath.includes(from.path)) {
                            Message.success("欢迎你");
                        }                       
                        store.commit('changeUserLogin', userlogin);
                        // 角色访问页面控制
                        const role = res.data.data.role; // 获取角色
                        store.commit('changRole',role);
                        if (to.meta.rules.includes(role)) {
                            next();
                        } else {
                            Message.warning('对不起，您权限不够');
                            NProgress.done(); 
                        }
                    } else {
                        Message.warning('当前处于禁用状态，等待管理员审核通过哦~');
                        next('/login');
                        NProgress.done();
                    }
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