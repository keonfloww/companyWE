import Config from 'react-native-config';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const useFirebaseService = () => {
  const initFirebaseApp = () => {
    console.log('---initFirebaseApp---');
    // Firebase auth setup
    GoogleSignin.configure({
      webClientId:
        Config.GOOGLE_CLIENT_ID ??
        '527645071665-2eqr8u8nb3rhjpe55p99kll6j0lk7ab6.apps.googleusercontent.com',
      iosClientId:
        '527645071665-8kag2l8pmv2pm9iirpl5371b80mstd7f.apps.googleusercontent.com',
    });
  };

  return {initFirebaseApp};
};

export default useFirebaseService;
