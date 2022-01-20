/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import { RootSiblingParent } from 'react-native-root-siblings'

AppRegistry.registerComponent(appName, () => App);
