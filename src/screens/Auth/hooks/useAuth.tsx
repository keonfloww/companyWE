import {useDispatch, useSelector} from 'react-redux';
import {BaseState} from '@redux/stores';
import {
  useUserRegisterMutation,
  useUserVerifyMutation,
} from '@redux/slices/api/userApi.slice';
import useAuthProvider from '@utils/hooks/useAuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOCAL_STORAGE_KEYS} from '@utils/localStorageUtils';
import {userSliceActions} from '@redux/slices/user.slice';
import {mailSliceActions} from '@redux/slices/mail.slice';
import navigationService from '@services/navigationService';
import {Screen} from '@navigation/navigation.enums';
import firestore from '@react-native-firebase/firestore';
import {FireStoreCollection} from '@services/firestoreService';

const useAuth = () => {
  const dispatch = useDispatch();

  const {signInByGoogle} = useAuthProvider();
  const [userRegister] = useUserRegisterMutation();
  const [userVerify] = useUserVerifyMutation();

  const user = useSelector((state: BaseState) => state?.userReducer?.user?.id);

  const signInOrSignUpByFirebase = async ({isSignUp = false}) => {
    try {
      global?.props?.showLoading();

      const {userData, accessToken} = await signInByGoogle();
      AsyncStorage.setItem(
        LOCAL_STORAGE_KEYS.USER,
        JSON.stringify(userData.user),
      );

      const oldUserUid = await AsyncStorage.getItem(
        LOCAL_STORAGE_KEYS.LATEST_USER_UID_AUTH,
      );

      const isUserReSignInWithSameAccount = oldUserUid != userData?.user?.uid;

      if (isUserReSignInWithSameAccount) {
        console.log(
          'user is diff with old once/ first sign in => remove old local storage',
        );
        dispatch(userSliceActions.init());
        dispatch(mailSliceActions.clear());
        await AsyncStorage.setItem(
          LOCAL_STORAGE_KEYS.LATEST_USER_UID_AUTH,
          userData?.user?.uid,
        );
        await AsyncStorage.removeItem(LOCAL_STORAGE_KEYS.IS_CONNECTED_MAILS);

        // Delete firestore to prevent auto sync old connected mails
        firestore()
          .collection(FireStoreCollection.MAIL)
          .doc(userData?.user?.uid)
          .delete();
      }

      if (isSignUp) {
        // API register
        userRegister({
          id: userData.user.uid.toString(),
          user_name: userData?.user?.displayName?.toString() ?? '',
          email_address: userData?.user?.email?.toString() ?? '',
          is_email_address_verified: userData.user.emailVerified,
          sign_up_provider_id: 1,
          accessToken: accessToken,
        });
      } else {
        // API register login
        userVerify({
          id: userData.user.uid.toString(),
          is_email_address_verified: Boolean(userData.user.emailVerified),
          accessToken: accessToken,
        });
      }

      const isConnectedMails = await AsyncStorage.getItem(
        LOCAL_STORAGE_KEYS.IS_CONNECTED_MAILS,
      );

      console.log('isConnectedMails', isConnectedMails);
      if (!isConnectedMails) {
        navigationService.navigateAndReset(Screen.ConnectMailScreen);
        return;
      }

      navigationService.navigateAndReset(Screen.MainTabBar, {
        params: Screen.HomeScreen,
      });
    } catch (error) {
      console.log('error signInOrSignUpByFirebase', error);
    } finally {
      global?.props?.hideLoading();
    }
  };
  return {user, signInOrSignUpByFirebase};
};
export default useAuth;
