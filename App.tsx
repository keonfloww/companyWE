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
import useFirebaseService from '@services/firebaseService';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BootSplash from 'react-native-bootsplash';
// WARNING: Be careful when change the value of below code.
// It will lead us to some dependencies conflict, example webview package
enableFreeze(true);

const App = () => {
  const {initFirebaseApp} = useFirebaseService();

  useEffect(() => {
    BootSplash.hide({fade: true});
  }, []);

  useEffect(() => {
    initFirebaseApp();
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
