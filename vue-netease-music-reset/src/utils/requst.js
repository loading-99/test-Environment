import axios from "axios";
import { Loading } from 'element-ui';

const BASE_URL = 'https://netease-music-api.fe-mm.com';

export const requstwaitoutloading = createBaseInstance()
export const requst = createBaseInstance()
loadingcycle(requst.interceptors)


// axios基础请求模板，
function createBaseInstance() {

    const instance = axios.create({
            baseURL: BASE_URL,
            timeout: 10000,

        })
        // 添加数据拦截器
    instance.interceptors.response.use(handleResponse, handleerror)

    return instance
}

// 初始化loading
let loading

// loading拦截器周期载入，入场与出场
function loadingcycle(interceptors) {
    interceptors.request.use(loadingenter)
    interceptors.response.use(loadingout, requesterror)
}
// 加载element ui loading 组件
function loadingenter(config) {
    loading = Loading.service({
        target: 'body',
        text: '正在加载中...',
        spinner: 'el-icon-loading',
        background: 'transparent',
        customClass: 'loadingname'
    });
    return config
}
// 关闭loading组件
function loadingout(response) {
    loading.close();
    return response
}
// 执行异常，抛出错误
function requesterror(e) {
    loadingout()
    throw e
}

// 对响应数据的处理，剥离部分数据嵌套
function handleResponse(response) {
    return response.data
}
// 对请求错误的处理，弹窗提示，终止js运行，抛出错误
function handleerror(e) {
    alert('出错了！', e.message);
    throw e
}