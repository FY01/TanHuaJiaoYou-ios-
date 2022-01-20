/*
 * @Descripttion:
 * @version:
 * @@Company:
 * @Author: FY01
 * @Date: 2022-01-19 20:49:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-20 23:51:34
 */
import React, {Component} from 'react';
import {View} from 'react-native';

// for using Toast from 'react-native-root-toast'
import {RootSiblingParent} from 'react-native-root-siblings';

import Nav from './src/Nav';

export default class App extends Component {
  render() {
    return (
      <RootSiblingParent>
        <View style={{flex: 1}}>
          <Nav></Nav>
        </View>
      </RootSiblingParent>
    );
  }
}
