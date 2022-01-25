/*
 * @Descripttion:
 * @version:
 * @@Company:
 * @Author: FY01
 * @Date: 2022-01-19 21:39:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-25 13:46:59
 */
// In App.js in a new project

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './pages/account/Login/Login';
import UserInfo from './pages/account/UserInfo/UserInfo';

import Demo from './pages/Demo';

// interface P {
//   navigation: {[propName:string]:any};
// }

// class HomeScreen extends Component<P> {
//   render() {
//     return (
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         <Text>Home Screen</Text>
//         <Button
//           title="go to login details"
//           onPress={() => {
//             this.props.navigation.navigate('Login');
//           }}></Button>
//       </View>
//     );
//   }
// }

const Stack = createNativeStackNavigator();

export default class nav extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="UserInfo" component={UserInfo} />
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          <Stack.Screen name="Demo" component={Demo} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
