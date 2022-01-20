/*
 * @Descripttion:
 * @version:
 * @@Company:
 * @Author: FY01
 * @Date: 2022-01-19 21:33:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-21 00:11:25
 */
import React, {Component, FormEvent} from 'react';
import {Image, View, StyleSheet, StatusBar, Text, Alert} from 'react-native';
import {Input} from 'react-native-elements';
// to use Icon ,need to import Icon from 'react-native-vector-icons/FontAwesome'
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Toast from 'react-native-root-toast';

import {pxToDp} from '../../../utils/styleKits';
import {validatePhone} from '../../../utils/validator';
import request from '../../../utils/request';
import {ACCOUNT_LOGIN} from '../../../utils/pathMap';
import toast from '../../../utils/Toast';

export default class Login extends Component {
  constructor(props: any) {
    super(props);

    toast.show('hello toast');

    setTimeout(function hideToast() {
      toast.hide();
    }, 5000);
  }
  state = {
    phoneNumbers: '18718020503',
    isLegalPhoneNumbers: true,
  };

  //   handle input change text
  handleChangeText = (phoneNumbers: string): void => {
    this.setState({
      phoneNumbers,
    });
  };

  //   handle submit
  phoneNumbersSubmitting = async (): Promise<void> => {
    /**
     * 1. legal input test
     *    if have not pass the test , show errorMsg
     * 2. send http request(if past)
     * 3. turn to verification page
     */
    const {phoneNumbers} = this.state;

    if (validatePhone(phoneNumbers)) {
      // pass verification
      this.setState({isLegalPhoneNumbers: true});

      const result = await request.post(ACCOUNT_LOGIN, {phone: phoneNumbers});
      console.log(result);
    } else {
      // have not pass verification
      this.setState({isLegalPhoneNumbers: false});
      return;
    }
  };
  render() {
    const {phoneNumbers, isLegalPhoneNumbers} = this.state;
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
          {/* 2.1 content header */}
          <View>
            <View>
              <Text style={styles.contentTitle}>手机号登陆注册</Text>
            </View>
            <View style={{marginTop: pxToDp(20)}}>
              <Input
                autoCompleteType={false}
                placeholder="请输入手机号码"
                maxLength={11}
                keyboardType="phone-pad"
                onChangeText={this.handleChangeText}
                value={phoneNumbers}
                errorMessage={isLegalPhoneNumbers ? '' : '请输入正确的手机号码'}
                onSubmitEditing={() => {
                  // console.log('sss');
                  this.phoneNumbersSubmitting();
                }}
                leftIcon={{
                  type: 'font-awesome',
                  name: 'phone',
                  size: pxToDp(20),
                }}
              />
            </View>

            {/* <Icon name={'phone'} size={24} color={'#999'} /> */}
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
