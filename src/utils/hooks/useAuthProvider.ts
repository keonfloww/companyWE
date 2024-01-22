import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

/**
 * Just keep this hook inside the utils. Then we can easily to migrate, pack the package
 */
const useAuthProvider = () => {
  const retrieveGoogleToken = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    return idToken;
  };

  const signInByGoogle = async () => {
    // Get the users ID token
    const idToken = await retrieveGoogleToken();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  // const retrieveAppleToken = () => {};
  // const signInByApple = () => {};

  // const signInByCredential = () => {};

  return {
    signInByGoogle,
  };
};

export default useAuthProvider;
