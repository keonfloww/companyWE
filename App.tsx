import React, {useEffect} from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/stores';
import {I18nextProvider} from 'react-i18next';
import i18n from '@i18n/locales/en';
import {enableFreeze} from 'react-native-screens';
import {RootSiblingParent} from 'react-native-root-siblings';
import AppProvider, {AppConsumer} from 'AppContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CommonStyles from '@screens/styles';
import useFirebaseService from '@services/firebaseService';
import auth from '@react-native-firebase/auth';
import navigationService from '@services/navigationService';
import {Screen} from '@navigation/navigation.enums';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// WARNING: Be careful when change the value of below code.
// It will lead us to some dependencies conflict, example webview package
enableFreeze(true);

import {Colors} from 'react-native-ui-lib';

Colors.loadColors({
  primary: '#50048A',
  textSecondary: '#3C3C3C',
  buttonSecondary: '#606060',
  border: '#8F8F8F',
  accentColor: '#DFB5FF',

  error: '#E74C3C',
  success: '#20C997',
  waring: '#FFA145',

  text: '#3C3C3C',
  textDisable: '#757575',
});

const App = () => {
  const {initFirebaseApp} = useFirebaseService();
  // const user = useSelector((state: BaseState) => state.userReducer.user)
  function onAuthStateChanged(user: any) {
    if (user) {
      navigationService.navigateAndReset(Screen.MainTabBar);
    }
    // setUser(user);
    // console.log('in app.tsx', user);
    // if (user) setloggedIn(true);
  }

  useEffect(() => {
    // const init = async () => {
    //   // …do multiple sync or async tasks
    // };

    // init().finally(async () => {
    //   await BootSplash.hide({fade: true});
    //   console.log('BootSplash has been hidden successfully');
    // });

    initFirebaseApp();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <AppProvider>
              <AppConsumer>
                {(globalProps: any) => {
                  global.props = {...globalProps};
                  return (
                    <GestureHandlerRootView style={{flex: 1}}>
                      <RootNavigator {...globalProps} />
                    </GestureHandlerRootView>
                  );
                }}
              </AppConsumer>
            </AppProvider>
          </I18nextProvider>
        </Provider>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
};

export default App;
