/*
 * @Descripttion:
 * @version:
 * @@Company:
 * @Author: FY01
 * @Date: 2022-01-21 14:03:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-21 14:55:19
 */
import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {pxToDp} from '../../utils/styleKits';

interface P {
  style: object;
  textStyle: object;
}
export default class MyButton extends Component<P> {
  static defaultProps = {
    style: {},
    textStyle: {},
  };
  render() {
    const {children} = this.props;
    return (
      <View>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={{...styles.linearGradient, ...this.props.style}}>
          <Text style={{...styles.buttonText, ...this.props.textStyle}}>
            {children}
          </Text>
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  linearGradient: {
    marginTop: pxToDp(15),
    paddingLeft: pxToDp(15),
    paddingRight: pxToDp(15),
    borderRadius: pxToDp(25),
  },
  buttonText: {
    fontSize: pxToDp(15),
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: pxToDp(10),
    color: '#ffffff',
    backgroundColor: 'transparent',
    letterSpacing: pxToDp(10),
  },
});
