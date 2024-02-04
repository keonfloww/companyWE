import LayoutBackgroundDefault from '@layouts/default/LayoutBackgroundDefault';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import navigationService from '@services/navigationService';
import {Screen} from '@navigation/navigation.enums';
import BootSplash from 'react-native-bootsplash';
import {useEffect} from 'react';
import {LOCAL_STORAGE_KEYS} from '@utils/localStorageUtils';

const SplashScreen = () => {
  const checkAuth = async () => {
    const firebaseAuth = auth()!.currentUser;

    setTimeout(async () => {
      const user = await AsyncStorage.getItem('user');
      const isConnectedMails = await AsyncStorage.getItem(
        LOCAL_STORAGE_KEYS.IS_CONNECTED_MAILS,
      );
      console.log('isConnectedMails', !!isConnectedMails);

      if (firebaseAuth?.uid && user) {
        if (!isConnectedMails) {
          console.log('Screen.ConnectMailScreen from splash screen');
          navigationService.navigateAndReset(Screen.ConnectMailScreen);
        } else {
          console.log('Screen.MainTabBar.Screen.HomeScreen from splash screen');
          navigationService.navigateAndReset(Screen.MainTabBar, {
            params: Screen.HomeScreen,
          });
        }

        await BootSplash.hide({fade: true});
        return;
      }
      navigationService.navigateAndReset(Screen.IntroScreen);

      await BootSplash.hide({fade: true});
    }, 500);
  };

  useEffect(() => {
    checkAuth();
  }, [auth()!.currentUser]);

  return <LayoutBackgroundDefault />;
};

export default SplashScreen;
