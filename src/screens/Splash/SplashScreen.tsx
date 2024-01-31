import LayoutBackgroundDefault from '@layouts/default/LayoutBackgroundDefault';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserViewModel from '@redux/hooks/useUserViewModel';
import {BaseState} from '@redux/stores';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import navigationService from '@services/navigationService';
import {Screen} from '@navigation/navigation.enums';
import BootSplash from 'react-native-bootsplash';
import {useEffect} from 'react';

const SplashScreen = () => {
  const {isEmptyConnectedMails} = useUserViewModel();
  const connectedMails = useSelector(
    (state: BaseState) => state?.userReducer.connectedMails,
  );

  const checkAuth = async () => {
    const user = await AsyncStorage.getItem('user');
    const firebaseAuth = auth()!.currentUser;

    setTimeout(() => {
      if (firebaseAuth?.uid && user) {
        if (!connectedMails.length || isEmptyConnectedMails) {
          navigationService.navigateAndReset(Screen.ConnectMailScreen);
        } else {
          navigationService.navigateAndReset(Screen.MainTabBar);
        }
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
