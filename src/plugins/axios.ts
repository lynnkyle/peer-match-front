import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    console.log("发送请求", config)
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    console.log("响应请求", response)
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance;


