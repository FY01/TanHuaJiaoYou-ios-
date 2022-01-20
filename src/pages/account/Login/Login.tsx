/*
 * @Descripttion:
 * @version:
 * @@Company:
 * @Author: FY01
 * @Date: 2022-01-19 21:33:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-20 13:37:07
 */
import React, {Component} from 'react';
import {Image, View, StyleSheet, StatusBar, Text} from 'react-native';
import {Input} from 'react-native-elements';
// to use Icon ,need to import Icon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/FontAwesome';

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
        {/* 2.0 login content */}
        <View style={styles.contentContainer}>
          {/* 2.1 content title */}
          <View>
            <Text style={styles.contentTitle}>手机号登陆注册</Text>
            <Input autoCompleteType={false} placeholder="BASIC INPUT" />

            <Input
              autoCompleteType={false}
              placeholder="INPUT WITH ICON"
              leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
            />
            <Icon name={'phone'} size={24} color={'#999'} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: pxToDp(200),
  },
  contentContainer: {
    padding: pxToDp(20),
  },
  contentTitle: {
    color: '#888',
    fontSize: pxToDp(25),
    fontWeight: 'bold',
  },
});
