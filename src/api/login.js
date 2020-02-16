import axios from 'axios'
import $http from "../js/http"

const loginRequest = axios.create({
    baseURL: process.env.VUE_APP_URL,
    // 标识 cookie ，在请求发送的时候连带 cookie 进行发送 
    withCredentials: true
})
// 登录逻辑
export function getLogin(data) {
    return loginRequest({
        url: $http.getLogin.url,
        method: $http.getLogin.method,
        data,
    })
}