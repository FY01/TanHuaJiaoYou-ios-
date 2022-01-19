/*
 * @Descripttion:
 * @version:
 * @@Company:
 * @Author: FY01
 * @Date: 2022-01-19 21:33:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-19 22:33:40
 */
import {Image, View, StyleSheet, StatusBar} from 'react-native';
import React, {Component} from 'react';

import {pxToDp} from '../../../utils/styleKits';

export default class Login extends Component {
  render() {
    return (
      <View>
        {/* 0.0 status bar */}
        <StatusBar backgroundColor="transparent" translucent={true} />
        {/* 1.0 background image */}
        <Image
          style={styles.backgroundImage}
          source={require('../../../res/profileBackground.jpeg')}></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: pxToDp(200),
  },
});
