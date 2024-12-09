// 封装用户请求axios
import axios, { AxiosRequestConfig } from "axios";

export const fetch = (options: AxiosRequestConfig) => {
  return axios({
    ...options,
  });
};

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前进行操作
    return config;
  },
  (error) => {
    // 对请求错误进行操作
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (res) {
    // 解构返回
    return res;
  },
  function (error) {
    // 对响应错误进行操作
    return Promise.reject(error);
  }
);
