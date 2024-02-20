import LayoutBackgroundDefault from '@layouts/default/LayoutBackgroundDefault';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import navigationService from '@services/navigationService';
import {Screen} from '@navigation/navigation.enums';
import BootSplash from 'react-native-bootsplash';
import {useEffect} from 'react';
import {LocalUtils} from '@utils/localStorageUtils';
import BaseMailUtils from '@utils/baseMailUtils';

const SplashScreen = () => {
  const checkAuth = async () => {
    const firebaseAuth = auth()!.currentUser;

    setTimeout(async () => {
      const user = await AsyncStorage.getItem('user');
      const isConnectedMails = await LocalUtils.isConnectedMail(
        BaseMailUtils.getValueForPersistMail(user ? JSON.parse(user) : ''),
      );
      if (firebaseAuth?.uid && user) {
        if (!isConnectedMails) {
          navigationService.navigateAndReset(Screen.ConnectMailScreen);
        } else {
          navigationService.navigateAndReset(Screen.MainTabBar, {
            params: Screen.HomeScreen,
          });
        }
        setTimeout(() => {
          BootSplash.hide({fade: true});
        }, 200);
        return;
      }
      navigationService.navigateAndReset(Screen.IntroScreen);

      setTimeout(() => {
        BootSplash.hide({fade: true});
      }, 200);
    }, 500);
  };

  useEffect(() => {
    checkAuth();
  }, [auth()!.currentUser]);

  return <LayoutBackgroundDefault />;
};

export default SplashScreen;
