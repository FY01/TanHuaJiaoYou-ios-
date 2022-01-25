/*
 * @Descripttion:
 * @version:
 * @@Company:
 * @Author: FY01
 * @Date: 2022-01-19 21:33:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-25 13:45:51
 */
import React, {Component, FormEvent, ReactElement} from 'react';
import {
  Image,
  View,
  StyleSheet,
  StatusBar,
  Text,
  Pressable,
} from 'react-native';
import {Input} from 'react-native-elements';
// to use Icon ,need to import Icon from 'react-native-vector-icons/FontAwesome'
// import Icon from 'react-native-vector-icons/FontAwesome';

import {pxToDp} from '../../../utils/styleKits';
import {validatePhone} from '../../../utils/validator';
import request from '../../../utils/request';
import {ACCOUNT_LOGIN} from '../../../utils/pathMap';
import toast from '../../../utils/Toast';
import MyButton from '../../../components/MyButton';
import VCodeTest from '../../../components/VCodeTest';

const COUNTBEGIN: number = 10;
interface LoginComponent {
  navigation: {[propName: string]: any};
}
interface State {
  phoneNumbers: string;
  isLegalPhoneNumbers: boolean;
  isShowLogin: boolean;
  counting: number;
  isCountingFinished: boolean;
}
export default class Login extends Component<LoginComponent> {
  state: State = {
    phoneNumbers: '18718020503',
    isLegalPhoneNumbers: true,
    isShowLogin: true,
    counting: COUNTBEGIN,
    isCountingFinished: false,
  };

  //   handle input change text
  handleChangeText = (phoneNumbers: string): void => {
    this.setState({
      phoneNumbers,
    });
    if (validatePhone(phoneNumbers)) {
      this.setState({isLegalPhoneNumbers: true});
    }
  };

  //   handle submit
  phoneNumbersSubmitting = async (): Promise<void> => {
    /**
     * 1. legal input test
     *    if have not pass the test , show errorMsg
     * 2. send http request(if past)
     * 3. turn to verification page,open a counting timer
     */
    let {phoneNumbers, counting} = this.state;

    if (validatePhone(phoneNumbers)) {
      // pass verification
      this.setState({isLegalPhoneNumbers: true});
      try {
        const result = await request.post(ACCOUNT_LOGIN, {phone: phoneNumbers});

        // change the state from showLogin to showVCode
        this.setState({
          isShowLogin: false,
        });

        // in VCodeTest:start a counter
        this.startCounter();
      } catch (error) {
        let t = new toast();
        t.show(`network error:${error}`);
      }
    } else {
      // have not pass verification
      this.setState({isLegalPhoneNumbers: false});
      return;
    }
  };

  // Function:start a counter
  startCounter(): void {
    let {counting} = this.state;
    let countTimer = setInterval(() => {
      counting--;
      this.setState({counting});
      if (counting === 0) {
        clearInterval(countTimer);
        this.setState({isCountingFinished: true});
      }
    }, 1000);
  }

  // reGet the VCode
  reGetVCode = (finished: boolean): void => {
    if (finished) {
      this.setState(
        {
          counting: COUNTBEGIN,
          isCountingFinished: false,
        },
        this.phoneNumbersSubmitting,
      );
    } else {
      return;
    }
  };

  // render Login
  renderLogin = (): ReactElement => {
    const {phoneNumbers, isLegalPhoneNumbers} = this.state;
    return (
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
              // onSubmitEditing={() => {
              //   this.phoneNumbersSubmitting();
              // }}
              leftIcon={{
                type: 'font-awesome',
                name: 'phone',
                size: pxToDp(20),
              }}
            />
          </View>
          {/* <Icon name={'phone'} size={24} color={'#999'} /> */}
        </View>
        {/* 2.2 content validate Button */}
        <View>
          <Pressable
            // style={styles.button}
            onPress={() => {
              this.phoneNumbersSubmitting();
            }}>
            <MyButton>获取验证码</MyButton>
          </Pressable>
        </View>
      </View>
    );
  };

  // render validateCode
  renderVCode = (): ReactElement => {
    const {phoneNumbers, counting, isCountingFinished} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.contentContainer}>
        <View>
          <Text
            style={[
              styles.contentTitle,
              {color: '#333', marginBottom: pxToDp(10)},
            ]}>
            请输入6位验证码
          </Text>
        </View>
        <View>
          <Text style={{marginBottom: pxToDp(10)}}>
            已发到：+86 {phoneNumbers}
          </Text>
        </View>
        <View style={styles.vCode}>
          <VCodeTest phoneNumbers={phoneNumbers} navigation={navigation} />
        </View>
        <View>
          <Pressable
            // style={styles.button}
            style={[!isCountingFinished && styles.isNotFinished]}
            onPress={() => {
              this.reGetVCode(isCountingFinished);
            }}>
            <MyButton>
              重新获取验证码{`${isCountingFinished ? '' : `(${counting}s)`}`}
            </MyButton>
          </Pressable>
        </View>
      </View>
    );
  };

  render() {
    const {phoneNumbers, isLegalPhoneNumbers, isShowLogin} = this.state;
    // console.log(this.props);
    return (
      <View>
        {/* 0.0 status bar */}
        <StatusBar backgroundColor="transparent" translucent={true} />
        {/* 1.0 background image */}
        <Image
          style={styles.backgroundImage}
          source={require('../../../res/profileBackground.jpeg')}></Image>
        {/* 2.0 login content */}
        {isShowLogin ? this.renderLogin() : this.renderVCode()}
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
  button: {
    width: '100%',
    alignItems: 'center',
  },
  vCode: {
    height: pxToDp(100),
  },
  isNotFinished: {
    opacity: 0.6,
  },
});
