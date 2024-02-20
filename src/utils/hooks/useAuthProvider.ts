import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import InAppBrowserUtils from '@utils/inAppBrowserUtils';
import InAppBrowser from 'react-native-inappbrowser-reborn';

/**
 * Just keep this hook inside the utils. Then we can easily to migrate, pack the package
 */
const useAuthProvider = () => {
  const signInByGoogle = async () => {
    // Check if your device supports Google Play
    // await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    const userData = await auth().signInWithCredential(googleCredential);
    const token = await userData.user.getIdToken();
    return {userData, accessToken: token};
  };

  const onGoogleLinkButtonPress = async () => {
    await InAppBrowser.open(
      `https://troove-dev-385107.uc.r.appspot.com/api/v1/gmail/connect?doc_id=${
        auth()!.currentUser!.uid
      }`,
      InAppBrowserUtils.configDefault,
    );
  };

  const signOutFirebase = async () => {
    try {
      // await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => console.log('User signed out from Firebase!'));
    } catch (error) {
      console.log('signOutFirebase', error);
    }
  };
  return {
    signInByGoogle,
    onGoogleLinkButtonPress,
    signOutFirebase,
  };
};

export default useAuthProvider;
