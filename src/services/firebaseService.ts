import Config from 'react-native-config';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firebase from '@react-native-firebase/app';

const useFirebaseService = () => {
  const initFirebaseApp = async () => {
    console.log('initFirebaseApp', initFirebaseApp);
    const firebaseConfig = {
      projectId: 'troove-dev',
      apiKey: 'AIzaSyAnDPFgDWxqTI7M-dA6BWSlSFrFJr_E5Qw',
      appId: '1:527645071665:android:fda65edbcaf1f7a98d3810',
      clientId:
        '527645071665-2eqr8u8nb3rhjpe55p99kll6j0lk7ab6.apps.googleusercontent.com',
      androidClientId:
        '527645071665-2eqr8u8nb3rhjpe55p99kll6j0lk7ab6.apps.googleusercontent.com',
    };
    // Firebase auth setup
    if (!firebase.apps.length) {
      await firebase.initializeApp(firebaseConfig);
    }

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
