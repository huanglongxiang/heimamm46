const LIST_CONTENT = {
    // 获取验证码
    getCaptcha: {
        url: process.env.VUE_APP_URL+'/captcha?type=sendsms&t=',
        method: 'get'
    },
    getSendNote: {
        url: process.env.VUE_APP_URL + '/sendsms',
        method: 'post'
    },
    getUploads: {
        url: process.env.VUE_APP_URL + '/uploads',
        method: 'post'
    }
}

export default LIST_CONTENT