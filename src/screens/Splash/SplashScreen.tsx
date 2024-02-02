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
    const user = await AsyncStorage.getItem('user');
    const isConnectedMails = await AsyncStorage.getItem(
      LOCAL_STORAGE_KEYS.IS_CONNECTED_MAILS,
    );

    const firebaseAuth = auth()!.currentUser;

    setTimeout(() => {
      if (firebaseAuth?.uid && user) {
        if (!isConnectedMails) {
          navigationService.navigateAndReset(Screen.ConnectMailScreen);
        } else {
          navigationService.navigateAndReset(Screen.MainTabBar);
        }
        BootSplash.hide({fade: true});
        return;
      }
      navigationService.navigateAndReset(Screen.IntroScreen);

      BootSplash.hide({fade: true});
    }, 500);
  };

  useEffect(() => {
    checkAuth();
  }, [auth()!.currentUser]);

  return <LayoutBackgroundDefault />;
};

export default SplashScreen;
