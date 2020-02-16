import axios from 'axios'
import $http from "../js/http"
import { getToken } from '../utils/token'

const loginRequest = axios.create({
    baseURL: process.env.VUE_APP_URL,
    // 标识 cookie ，在请求发送的时候连带 cookie 进行发送 
    withCredentials: true
})

// 用户信息读取
export function getInfo() {
    return loginRequest({
        url: $http.getInfo.url,
        method: $http.getInfo.method,
        headers: {
            token:getToken()
        }
    })
}
// 退出登录
export function exitInfo() {
    return loginRequest({
        url: $http.getLogout.url,
        method: $http.getLogout.method,
        headers: {
            token:getToken()
        }
    })
}