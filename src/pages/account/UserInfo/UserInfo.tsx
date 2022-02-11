/*
 * @Descripttion:
 * @version:
 * @@Company:
 * @Author: FY01
 * @Date: 2022-01-23 16:46:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-30 13:39:03
 */
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';

import {pxToDp} from '../../../utils/styleKits';
import SvgUri from 'react-native-svg-uri';
import {male, female} from '../../../res/fonts/iconSvg';
import {Input} from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import Picker from 'react-native-picker';
import moment from 'moment';
import Geo from '../../../utils/geolocation';

enum Gender {
  Male,
  Female,
}
interface State {
  nickname: string;
  gender: Gender;
  birthday: '';
  city: string;
  header: string;
  // longitude
  lng: string;
  // latitude
  lat: string;
  // address detail
  address: string;

  date: Date;
  open: boolean;
}
interface GeoRes {
  regeocode: any;
}

export default class UserInfo extends Component {
  state: State = {
    nickname: '',
    gender: Gender.Male,
    birthday: '',
    city: '',
    header: '',
    lng: '',
    lat: '',
    address: '',
    date: new Date(),
    open: false,
  };

  // set user info
  setUserInfo = (key: string, value: string | Gender | Date): void => {
    this.setState({
      [key]: value,
    });
  };

  // show city picker
  showCityPicker = (): void => {
    Picker.init({
      pickerData: ['北京', '上海', '广州', '深圳'],
      pickerTitleText: '请选择城市',
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      selectedValue: ['上海'],
      onPickerConfirm: data => {
        console.log(data);
      },
      onPickerCancel: data => {
        console.log(data);
      },
      onPickerSelect: data => {
        console.log(data);
      },
    });
    Picker.show();
  };

  async componentDidMount() {
    const result: GeoRes = await Geo.getCityByLocation();
    // console.log(result);
    const address = result.regeocode.formatted_address;
    let city: string = result.regeocode.addressComponent.city;
    // city = city.replace('市', '');
    console.log(result.regeocode.addressComponent.streetNumber.location);
    const lng = result.regeocode.addressComponent.streetNumber.location.split(
      ',',
    )[0];
    const lat = result.regeocode.addressComponent.streetNumber.location.split(
      ',',
    )[1];
    this.setState({address, city, lng, lat});
  }
  render() {
    const {gender, nickname, open, birthday, date, city} = this.state;
    const isMale = gender === Gender.Male;
    return (
      <View style={styles.container}>
        {/* 0.0 header */}
        <Text style={styles.header}>填写资料:</Text>
        <Text style={styles.header}>提升我的魅力</Text>
        {/* 1.0 gender */}
        <View style={{marginTop: pxToDp(20), marginBottom: pxToDp(20)}}>
          <View style={styles.svgContainer}>
            <Pressable
              onPress={() => {
                this.setUserInfo('gender', Gender.Male);
              }}
              style={{
                backgroundColor: isMale ? '#e55' : '#eee',
                ...styles.iconContainer,
              }}>
              <SvgUri
                svgXmlData={male}
                width={`${pxToDp(34)}`}
                height={`${pxToDp(34)}`}></SvgUri>
            </Pressable>
            <Pressable
              onPress={() => {
                this.setUserInfo('gender', Gender.Female);
              }}
              style={{
                backgroundColor: isMale ? '#eee' : '#5ee',
                ...styles.iconContainer,
              }}>
              <SvgUri
                svgXmlData={female}
                width={`${pxToDp(34)}`}
                height={`${pxToDp(34)}`}></SvgUri>
            </Pressable>
          </View>
        </View>
        {/* 2.0 nickname */}
        <View>
          <Input
            autoCompleteType={false}
            value={nickname}
            placeholder="请输入昵称"
            onChangeText={value => {
              this.setUserInfo('nickname', value);
            }}></Input>
        </View>
        {/* 3.0 birthday */}
        <View>
          <Input
            autoCompleteType={false}
            placeholder="请选择日期"
            disabled={true}
            value={birthday}
            rightIcon={{
              type: 'font-awesome',
              name: 'chevron-down',
              size: pxToDp(10),
            }}
            onPressIn={() => {
              this.setState({open: true});
            }}></Input>
          <DatePicker
            modal
            open={open}
            date={date}
            locale="zh-Hans"
            mode="date"
            maximumDate={new Date()}
            confirmText="确定"
            cancelText="取消"
            onConfirm={date => {
              this.setState({
                birthday: moment(date).format('YYYY-MM-DD'),
                open: false,
              });
            }}
            onCancel={() => {
              this.setState({
                open: false,
              });
            }}
          />
        </View>
        {/* 4.0 location */}
        <View>
          <Input
            autoCompleteType={false}
            onPressIn={this.showCityPicker}
            disabled={true}
            value={`当前在：${city}`}></Input>
        </View>
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
  svgContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '60%',
    justifyContent: 'space-around',
  },
  iconContainer: {
    width: pxToDp(60),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
