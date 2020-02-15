const LIST_CONTENT = {
    // 获取验证码
    getCaptcha: {
        url: process.env.VUE_APP_URL+'/captcha?type=sendsms',
        method: 'get'
    }
}

export default LIST_CONTENT