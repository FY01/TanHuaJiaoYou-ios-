import React, {Component} from 'react';
import {View, Text} from 'react-native';

import Nav from './src/Nav';

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Nav></Nav>
      </View>
    );
  }
}