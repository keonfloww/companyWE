import LayoutBackgroundDefault from '@layouts/default/LayoutBackgroundDefault';
import {Screen} from '@navigation/navigation.enums';
import auth from '@react-native-firebase/auth';
import navigationService from '@services/navigationService';
import {useEffect} from 'react';
import BootSplash from 'react-native-bootsplash';

const SplashScreen = () => {
  const checkAuth = async () => {
    setTimeout(async () => {
      navigationService.navigateAndReset(Screen.MainTabBar, {
        params: Screen.HomeScreen,
      });

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
