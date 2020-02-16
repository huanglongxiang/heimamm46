import axios from 'axios'
import $http from "../js/http"

/**
 * 短信验证
 * @param {手机号与图形码} data 
 */
export function sendsms(data) {
    return axios({
        url: $http.getSendNote.url,
        method: $http.getSendNote.method,
        data,
        // 标识 cookie ，在请求发送的时候连带 cookie 进行发送 。。。
        withCredentials: true
    })
}
/**
 * 注册接口
 * @param {用户信息} data 
 */
export function userRegister(data) {
    return axios({
        url: $http.setRegisterUser.url,
        method: $http.setRegisterUser.method,
        data,
        withCredentials: true
    })
}

