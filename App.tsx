/*
 * @Descripttion:
 * @version:
 * @@Company:
 * @Author: FY01
 * @Date: 2022-01-19 20:49:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-28 14:18:52
 */
import React, {Component} from 'react';
import {View} from 'react-native';

// for using Toast from 'react-native-root-toast'
import {RootSiblingParent} from 'react-native-root-siblings';

import Nav from './src/Nav';
import Geo from './src/utils/geolocation';

interface State {
  isFinishedInitGeo: boolean;
}
export default class App extends Component {
  state: State = {
    isFinishedInitGeo: false,
  };
  async componentDidMount() {
    await Geo.initGeo();
    this.setState({isFinishedInitGeo: true});
  }
  render() {
    return (
      <RootSiblingParent>
        <View style={{flex: 1}}>
          {this.state.isFinishedInitGeo ? <Nav></Nav> : <></>}
        </View>
      </RootSiblingParent>
    );
  }
}
