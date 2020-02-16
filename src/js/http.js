const LIST_CONTENT = {
    // 获取验证码
    getCaptcha: {
        url: process.env.VUE_APP_URL+'/captcha?type=sendsms&t=',
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
    }
}

export default LIST_CONTENT