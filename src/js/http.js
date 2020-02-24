const LIST_CONTENT = {
    // 获取验证码 直接获取
    getCaptcha: {
        url: process.env.VUE_APP_URL+'/captcha?type=sendsms&t=',
        method: 'get'
    },
    getCaptchaLogin: {
        url: process.env.VUE_APP_URL+'/captcha?type=login&t=',
        method: 'get'
    },
    // 短信验证
    getSendNote: {
        url: process.env.VUE_APP_URL + '/sendsms',
        method: 'post'
    },
    // 图片上传
    getUploads: {
        url: process.env.VUE_APP_URL + '/uploads',
        method: 'post'
    },
    // 注册
    setRegisterUser: {
        url: process.env.VUE_APP_URL + '/register',
        method: 'post'
    },
    // 登录
    getLogin: {
        url: '/login',
        method: 'post'
    },
    // 首页--用户信息
    getInfo: {
        url: '/info',
        method: 'get'
    },
    // 首页--登出
    getLogout: {
        url: '/logout',
        method: 'get'
    },
    // 学科列表
    getSubjectList: {
        url: '/subject/list',
        method: 'get'
    },
    // 学科添加
    addSubject: {
        url: '/subject/add',
        method: 'post'
    },
    // 学科删除
    removeSubject: {
        url: '/subject/remove',
        method: 'post'
    },
    // 学科编辑
    editSubject: {
        url: '/subject/edit',
        method: 'post'
    },
    // 学科状态
    statusSubject: {
        url: '/subject/status',
        method: 'post'
    },
    // 企业列表
    enterpriseList: {
        url: '/enterprise/list',
        method: 'get'
    },
    // 企业编辑
    enterpriseEdit: {
        url: '/enterprise/edit',
        method: 'post'
    },
    // 企业删除
    enterpriseRemove: {
        url: '/enterprise/remove',
        method: 'post'
    },
    // 企业状态设置
    enterpriseStatus: {
        url: '/enterprise/status',
        method: 'post'
    },
    // 企业添加
    enterpriseAdd: {
        url: '/enterprise/add',
        method: 'post'
    },
    /* 用户接口 */
    // 用户列表
    userList: {
        url: '/user/list',
        method: 'get'
    },
    // 用户编辑
    userEdit: {
        url: '/user/edit',
        method: 'post'
    },
    // 用户删除
    userRemove: {
        url: '/user/remove',
        method: 'post'
    },
    // 用户状态设置
    userStatus: {
        url: '/user/status',
        method: 'post'
    },
    // 后台用户添加
    userAdd: {
        url: '/user/add',
        method: 'post'
    },
    // 获取token
    getToken: {
        url: '/token',
        method: 'post'
    },
}

export default LIST_CONTENT