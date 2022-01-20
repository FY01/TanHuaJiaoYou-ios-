/*
 * @Descripttion:
 * @version:
 * @@Company:
 * @Author: FY01
 * @Date: 2022-01-19 22:04:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-19 22:42:46
 */
import {Dimensions} from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

// design layout'width / element'width(px) = device's width / element'width(dp)
// in this case ,we set up design layout'width 375

/**
 * turn px to dp
 * @param eleWidth(px)
 * @returns eleWidth(dp)
 */
export const pxToDp = (eleWidth: number): number =>
  (screenWidth * eleWidth) / 375;
