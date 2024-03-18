import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firebase from '@react-native-firebase/app';
import Config from 'react-native-config';

const useFirebaseService = () => {
  const initFirebaseApp = async () => {};

  return {initFirebaseApp};
};

export default useFirebaseService;
