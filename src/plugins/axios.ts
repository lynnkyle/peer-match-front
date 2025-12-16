import axios from "axios";

const isDev = process.env.NODE_ENV === 'development';

const instance = axios.create({
    baseURL: isDev ? 'http://localhost:8080/api' : 'http://peer-match-backend.linzeyuan.site/api'
});

// 后台请求携带Cookie
instance.defaults.withCredentials = true;

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    console.log(response);
    if (response?.data?.code === 40100) {
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default instance;


