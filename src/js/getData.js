import axios from 'axios'
import listContent from './http.js'
import {
    getToken
} from '@/utils/token.js'
import {
    Loading
} from 'element-ui'


let instents = axios.create({
    baseURL: process.env.VUE_APP_URL,
    timeout: 3000,
    withCredentials: true
})

let load = null;
// 拦截器封装 请求
instents.interceptors.request.use(res => {
    // 进行token设置
    res.headers.token = getToken();
    load = Loading.service({
        text: '加载中...'
    })
    return res;
}, () => {
    // 异常
    load.close();
})
// 拦截器响应 响应
instents.interceptors.response.use(res => {
    load.close();
    return res.data;
}, () => {
    load.close();
})

// 遍历请求 api, 并发送请求
export async function getAPI(key, params="", isFormData = false, config = {}) {
    // 存放 url method
    let api = listContent[key];
    /* 
    判断请求是否是 formdata 类型的对象，如果是，进行遍历存放
    如果不是，返回原来的 
    params 参数  
    isFormData formdata 判断  
    config 配置参数
    */
    let newParams = {};
    // 是否是 formdata 对象
    if (params && isFormData) {
        newParams = new FormData();
        // 遍历参数并将其加入到 formdata 对象中去
        for (let i in params) {
            newParams.append(i, params[i])
        }
    } else {
        newParams = params;
    }

    let res = {};
    // 发送请求并接收数据
    if (api.method == 'put' || api.method == 'post' || api.method == 'patch') {
        try {
            res = await  instents[api.method](api.url, newParams, config)
        } catch (error) {
            res = error;
        }
    } else if (api.method == 'delete' || api.method == 'get') {
        config.params = newParams;
        try {
            res = await instents[api.method](api.url, config);
        } catch (error) {
            res =  error
        }
    }
    // 返回数据
    return res;
}
