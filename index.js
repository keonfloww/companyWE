/**
 * @format
 */

// Crashlysis
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/crashlytics';

import {AppRegistry} from 'react-native';
import App from 'App';
import {name as appName} from './app.json';
import {startNetworkLogging} from 'react-native-network-logger';

// Register the service
startNetworkLogging();
// register();

AppRegistry.registerComponent(appName, () => App);
