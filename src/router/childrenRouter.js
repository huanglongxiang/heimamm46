// 主页嵌套路由页面引入
import chart from '@/views/index/chart/chart'
import user from '@/views/index/user/user'
import question from '@/views/index/question/question'
import subject from '@/views/index/subject/subject'
import enterprise from '@/views/index/enterprise/enterprise'

export default [
    {
        path: "chart",
        component: chart,
        meta: {
            title: '数据概览',
            rules: ['管理员','老师','学生'],
            icon: 'el-icon-pie-chart',
            fullPath: '/index/chart'
        }
    },
    {
        path: "user",
        component: user,
        meta: {
            title: '用户列表',
            rules: ['管理员'],
            icon: 'el-icon-user',
            fullPath: '/index/user'
        }
    },
    {
        path: "question",
        component: question,
        meta: {
            title: '题库列表',
            rules: ['管理员','老师','学生'],
            icon: 'el-icon-edit-outline',
            fullPath: '/index/question'
        }
    },
    {
        path: "enterprise",
        component: enterprise,
        meta: {
            title: '企业列表',
            rules: ['管理员','老师'],
            icon: 'el-icon-office-building',
            fullPath: '/index/enterprise'
        }
    },
    {
        path: "subject",
        component: subject,
        meta: {
            title: '学科列表',
            rules: ['管理员','老师','学生'],
            icon: 'el-icon-notebook-2',
            fullPath: '/index/subject'
        }
    }
]