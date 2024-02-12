import {useDispatch, useSelector} from 'react-redux';
import {BaseState} from '@redux/stores';
import {
  useUserRegisterMutation,
  useUserVerifyMutation,
} from '@redux/slices/api/userApi.slice';
import useAuthProvider from '@utils/hooks/useAuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOCAL_STORAGE_KEYS, LocalUtils} from '@utils/localStorageUtils';
import {userSliceActions} from '@redux/slices/user.slice';
import navigationService from '@services/navigationService';
import {Screen} from '@navigation/navigation.enums';
import {persistSliceActions} from '@redux/slices/persist.slice';
import BaseMailUtils from '@utils/baseMailUtils';

const useAuth = () => {
  const dispatch = useDispatch();

  const userReducerState = useSelector((state: BaseState) => state.userReducer);
  const persistReducerState = useSelector(
    (state: BaseState) => state.persistReducer,
  );
  const authUser = useSelector((state: BaseState) => state.userReducer.user);

  const {signInByGoogle, signOutFirebase} = useAuthProvider();
  const [userRegister] = useUserRegisterMutation();
  const [userVerify] = useUserVerifyMutation();

  const signInOrSignUpByFirebase = async ({isSignUp = false}) => {
    try {
      global?.props?.showLoading();

      const {userData, accessToken} = await signInByGoogle();
      AsyncStorage.setItem(
        LOCAL_STORAGE_KEYS.USER,
        JSON.stringify(userData.user),
      );

      const key = BaseMailUtils.getValueForPersistMail(userData);
      const isUserReSignInWithSameAccount = await LocalUtils.isConnectedMail(
        key,
      );
      console.log(
        'isUserReSignInWithSameAccount',
        isUserReSignInWithSameAccount,
        'key',
        key,
      );
      if (isUserReSignInWithSameAccount) {
        console.info('useAuth RESTORE FROM PERSIST DATA');
        dispatch(userSliceActions.setUser(userData));
        if (userData.user.email && persistReducerState?.[key]) {
          dispatch(
            userSliceActions.restoreFromPersistStore(
              persistReducerState?.[key],
            ),
          );
        }
        const userVerifyData = await userVerify({
          id: userData.user.uid.toString(),
          is_email_address_verified: Boolean(userData.user.emailVerified),
          accessToken: accessToken,
        });
        const userSignIn = {
          ...userVerifyData?.data,
          creationTime: userData.user.metadata.creationTime,
        };
        dispatch(userSliceActions.setUser(userSignIn));

        navigationService.navigateAndReset(Screen.MainTabBar, {
          params: Screen.HomeScreen,
        });

        return;
      }

      let userFromApi: any;
      if (isSignUp) {
        // API register
        const data = await userRegister({
          id: userData.user.uid.toString(),
          user_name: userData?.user?.displayName?.toString() ?? '',
          email_address: userData?.user?.email?.toString() ?? '',
          is_email_address_verified: userData.user.emailVerified,
          sign_up_provider_id: 1,
          accessToken: accessToken,
        });
        userFromApi = {
          ...data?.data?.data,
          creationTime: userData.user.metadata.creationTime,
        };
      } else {
        // sign in
        // API register login
        const data = await userVerify({
          id: userData.user.uid.toString(),
          is_email_address_verified: Boolean(userData.user.emailVerified),
          accessToken: accessToken,
        });
        userFromApi = {
          ...data?.data,
          creationTime: userData.user.metadata.creationTime,
        };
      }
      dispatch(userSliceActions.setUser(userFromApi));
      if (userData.user.email && persistReducerState?.[userData.user.email]) {
        // email for debug and uid for final release
        const key = BaseMailUtils.getValueForPersistMail(userData);
        dispatch(
          userSliceActions.restoreFromPersistStore(persistReducerState?.[key]),
        );
      }

      const isConnectedMails = await LocalUtils.isConnectedMail(
        BaseMailUtils.getValueForPersistMail(userData),
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

  const handleSignOut = async () => {
    try {
      global?.props?.showLoading();

      if (authUser?.user?.email) {
        dispatch(
          persistSliceActions.setUserPersistData({
            userCredentialUid: BaseMailUtils.getValueForPersistMail(authUser),
            data: userReducerState,
          }),
        );
      }
      dispatch(userSliceActions.init());
      await signOutFirebase();
    } catch (error) {
      console.log('error handleSignOut', error);
    } finally {
      // Dont clear on sign out anymore.
      // Because once user resign in with same credentials => keep data without sync
      // If the credentials is difference => remove and sync

      AsyncStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      // AsyncStorage.removeItem(LOCAL_STORAGE_KEYS.IS_CONNECTED_MAILS);
      navigationService.navigateAndReset(Screen.Login);
      global?.props?.hideLoading();
      console.clear();
    }
  };

  return {
    authUser,

    signInOrSignUpByFirebase,
    handleSignOut,
  };
};
export default useAuth;
