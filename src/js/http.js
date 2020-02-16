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
    }
}

export default LIST_CONTENT