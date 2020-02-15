import axios from 'axios'
import $http from "../js/http"

export function sendsms(data) {
    return axios({
        url: $http.getSendNote.url,
        method: $http.getSendNote.method,
        data,
        // 标识 cookie ，在请求发送的时候连带 cookie 进行发送 。。。
        withCredentials: true
    })
}

