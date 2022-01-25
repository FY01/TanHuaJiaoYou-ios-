/*
 * @Descripttion:
 * @version:
 * @@Company:
 * @Author: FY01
 * @Date: 2022-01-20 16:55:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-23 16:42:15
 */
import axios from 'axios';
import {BASE_URI} from './pathMap';
import toast from './Toast';

const instance = axios.create({
  baseURL: BASE_URI,
});

let toastIns = new toast();

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    toastIns.show('loading......');

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response): any {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    toastIns.hide();
    // only return response.data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default {
  get: instance.get,
  post: instance.post,
};
