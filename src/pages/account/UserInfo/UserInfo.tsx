import {renderNode} from 'react-native-elements/dist/helpers';

/*
 * @Descripttion:
 * @version:
 * @@Company:
 * @Author: FY01
 * @Date: 2022-01-23 16:46:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-26 14:09:46
 */
import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';

import {pxToDp} from '../../../utils/styleKits';
import SvgUri from 'react-native-svg-uri';
import {male, female} from '../../../res/fonts/iconSvg';

export default class UserInfo extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* 0.0 header */}
        <Text style={styles.header}>填写资料</Text>
        <Text style={styles.header}>提升我的魅力</Text>
        <SvgUri svgXmlData={male} width="30" height="30"></SvgUri>
        <SvgUri svgXmlData={female} width="30" height="30"></SvgUri>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: pxToDp(20),
    paddingTop: pxToDp(60),
  },
  header: {
    fontSize: pxToDp(20),
    color: '#666',
    fontWeight: 'bold',
  },
});
