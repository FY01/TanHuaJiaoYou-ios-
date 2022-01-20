/*
 * @Descripttion:
 * @version:
 * @@Company:
 * @Author: FY01
 * @Date: 2022-01-20 16:55:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-20 16:58:21
 */
import axios from 'axios';
import {BASE_URI} from './pathMap';

const instance = axios.create({
  baseURL: BASE_URI,
});

export default {
  get: instance.get,
  post: instance.post,
};
