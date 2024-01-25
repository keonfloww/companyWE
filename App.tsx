import React, {useEffect} from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import {ThemeProvider, createTheme} from '@rneui/themed';
import {Provider, useSelector} from 'react-redux';
import {RootState, store} from './src/redux/stores';
import {I18nextProvider} from 'react-i18next';
import i18n from '@i18n/locales/en';
import {enableFreeze} from 'react-native-screens';
import {RootSiblingParent} from 'react-native-root-siblings';
import AppProvider, {AppConsumer} from 'AppContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CommonStyles from '@screens/styles';
import BootSplash from 'react-native-bootsplash';
import useFirebaseService from '@services/firebaseService';
import auth from '@react-native-firebase/auth';
import navigationService from '@services/navigationService';
import { Screen } from '@navigation/navigation.enums';

// WARNING: Be careful when change the value of below code.
// It will lead us to some dependencies conflict, example webview package
enableFreeze(true);

// TODO: Handle theme for rneui
const theme = createTheme({
  lightColors: {
    primary: '#50048A',
    // secondary: 'white',
    // grey0: '#3C3C3C',
    custom: {
      backgroundColor: '#D9D9D9',
    },
  },
  darkColors: {
    primary: 'dark',
  },
  components: {
    Divider: {color: '#D9D9D9'},
    Button: {
      raised: true,
    },
    Text: {
      h4Style: {
        color: '#3C3C3C',
        fontFamily: CommonStyles.fontFamily.bold,
        fontSize: CommonStyles.fontSize.size16,
      },
    },
  },
});

const App = () => {
  const {initFirebaseApp} = useFirebaseService();
  // const user = useSelector((state: RootState) => state.userReducer.user);
  function onAuthStateChanged(user: any) {
    if (user) {
      navigationService.navigateAndReset(Screen.MainTabBar)
    }
    // setUser(user);
    console.log('in app.tsx',user);
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
          <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
              <AppProvider>
                <AppConsumer>
                  {(globalProps: any) => {
                    global.props = {...globalProps};
                    return <RootNavigator {...globalProps} />;
                  }}
                </AppConsumer>
              </AppProvider>
            </I18nextProvider>
          </ThemeProvider>
        </Provider>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
};

export default App;
