import axios from 'axios';
import { getToken,getUserName } from './cookie';
import { message} from 'antd';

// 创建实例
const service = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 5000,
  });

  // 请求拦截器
  service.interceptors.request.use(function (config) {
    console.log(12312323,getUserName())
    config.headers["Token"] = getToken()
    config.headers["Username"] = getUserName()
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 响应拦截器
service.interceptors.response.use(function (response) {
    console.log(response)
    const  data = response.data
    if (data.resCode !== 0) {     // 全局错误拦截
      message.error(data.message);
      return Promise.reject(data );
    } else {
      return Promise.resolve(data);
    }
    // 对响应数据做点什么
    
    // return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default service