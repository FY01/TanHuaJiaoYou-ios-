/*
 * @Descripttion:
 * @version:
 * @@Company:
 * @Author: FY01
 * @Date: 2022-01-27 16:21:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-28 16:20:41
 */

import {PermissionsAndroid, Platform} from 'react-native';
import {
  init,
  Geolocation,
  setLocatingWithReGeocode,
} from 'react-native-amap-geolocation';
import axios from 'axios';
import toast from './Toast';
class Geo {
  async initGeo(): Promise<any> {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
    }
    // if (Platform.OS === 'ios') {
    //   setLocatingWithReGeocode(true);
    // }

    // // key ios-key and android-key
    await init({
      ios: 'c6e2ab1a05428700b26cfa013388a3f6',
      android: 'c6e2ab1a05428700b26cfa013388a3f6',
    });
    return Promise.resolve();
  }
  async getCurrentPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('开始定位');
      Geolocation.getCurrentPosition(({coords}) => {
        resolve(coords);
      }, reject);
    });
  }
  async getCityByLocation(): Promise<any> {
    let t = new toast();
    t.show('获取位置中');
    // key ios-key and android-key
    // await init({
    //   ios: 'c6e2ab1a05428700b26cfa013388a3f6',
    //   android: 'c6e2ab1a05428700b26cfa013388a3f6',
    // });
    const result: any = await this.getCurrentPosition();

    const res = await axios.get('https://restapi.amap.com/v3/geocode/regeo', {
      // key  web-js key
      params: {
        location: `${result.longitude},${result.latitude}`,
        // location: `-122.406417,37.785834`,
        key: '65b3d81835eb135867feddec2954bf6e',
      },
    });
    t.hide();
    return Promise.resolve(res.data);
  }
}

export default new Geo();
