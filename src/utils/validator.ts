/*
 * @Descripttion:
 * @version:
 * @@Company:
 * @Author: FY01
 * @Date: 2022-01-20 15:55:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-20 16:09:52
 */
export const validatePhone = (phone: string): boolean => {
  const reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
  return reg.test(phone);
};
