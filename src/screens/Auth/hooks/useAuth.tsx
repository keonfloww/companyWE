import {useDispatch, useSelector} from 'react-redux';
import {BaseState} from '@redux/stores';
import {
  useUserRegisterMutation,
  useUserGetMutation,
} from '@redux/slices/api/userApi.slice';
import useAuthProvider from '@utils/hooks/useAuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOCAL_STORAGE_KEYS, LocalUtils} from '@utils/localStorageUtils';
import {userSliceActions} from '@redux/slices/user.slice';
import navigationService from '@services/navigationService';
import {Screen} from '@navigation/navigation.enums';
import {persistSliceActions} from '@redux/slices/persist.slice';
import BaseMailUtils from '@utils/baseMailUtils';
import moment from 'moment';
import DateUtils from '@utils/dateUtils';

const useAuth = () => {
  const dispatch = useDispatch();

  const userReducerState = useSelector((state: BaseState) => state.userReducer);
  const persistReducerState = useSelector(
    (state: BaseState) => state.persistReducer,
  );
  const authUser = useSelector((state: BaseState) => state.userReducer.user);

  const {signInByGoogle, signOutFirebase} = useAuthProvider();
  const [userRegister] = useUserRegisterMutation();
  const [userGet] = useUserGetMutation();

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
      // DO TOUCH TO IT, THIS IS THE CORE FLOW
      dispatch(userSliceActions.setUser(userData));

      if (isUserReSignInWithSameAccount) {
        console.info('useAuth RESTORE FROM PERSIST DATA');

        if (userData?.user?.email && persistReducerState?.[key]) {
          dispatch(
            userSliceActions.restoreFromPersistStore(
              persistReducerState?.[key],
            ),
          );
        }
        const userVerifyData = await userGet({
          id: userData.user.uid.toString(),
          is_email_address_verified: Boolean(userData.user.emailVerified),
          accessToken: accessToken,
        });
        console.log({userVerifyData}, '----');
        const userSignIn = {
          ...userVerifyData?.data,
          creationTime: userData.user.metadata.creationTime,
          accessToken: accessToken,
        };
        dispatch(userSliceActions.setUserProfile(userSignIn));

        navigationService.navigateAndReset(Screen.MainTabBar, {
          params: Screen.HomeScreen,
        });

        return;
      }

      let userFromApi: any;
      const signedInBefore =
        moment(userData.user.metadata.creationTime) <
        moment(userData.user.metadata.lastSignInTime);
      const oldUser =
        moment(userData.user.metadata.creationTime).format(
          DateUtils.BACKEND_FORMAT,
        ) < moment().format(DateUtils.BACKEND_FORMAT);

      if (isSignUp && !oldUser && !signedInBefore) {
        // API register
        console.log('register run');
        const data = await userRegister({
          id: userData.user.uid.toString(),
          user_name: userData?.user?.displayName?.toString() ?? '',
          email_address: userData?.user?.email?.toString() ?? '',
          is_email_address_verified: userData.user.emailVerified,
          user_profile_picture: userData?.user?.photoURL || '',
          sign_up_provider_id: 1,
          gender_id: null,
          user_address: '',
          date_of_birth: '',
          phone_number: '',
          accessToken: accessToken,
        });
        console.log('after singup', {data});
        userFromApi = {
          ...data?.data?.data,
          creationTime: userData.user.metadata.creationTime,
          accessToken,
        };
      } else {
        // sign in
        // API register login
        console.log('***-----login run------------**');
        const data = await userGet({
          id: userData.user.uid.toString(),
          is_email_address_verified: Boolean(userData.user.emailVerified),
          accessToken: accessToken,
        });
        console.log('after login', {data});
        userFromApi = {
          ...data?.data,
          creationTime: userData.user.metadata.creationTime,
          accessToken,
        };
        if (!userFromApi?.email_address || !data?.data) {
          // I have written this coz some of the user data is not registered properly and no fields comes
          const data = await userRegister({
            id: userData.user.uid.toString(),
            user_name: userData?.user?.displayName ?? '',
            email_address: userData?.user?.email?.toString() ?? '',
            is_email_address_verified: userData.user.emailVerified,
            user_profile_picture: userData?.user?.photoURL || '',
            sign_up_provider_id: 1,
            gender_id: null,
            user_address: '',
            date_of_birth: '',
            phone_number: '',
            accessToken: accessToken,
          });
          console.log('after singin', {data});
          userFromApi = {
            ...data?.data?.data,
            creationTime: userData.user.metadata.creationTime,
            accessToken,
          };
        }
      }
      console.log({userFromApi});
      dispatch(userSliceActions.setUserProfile(userFromApi));
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

            // Mark as syned all to prevent loader show
            data: userReducerState,
          }),
        );
      }
      setTimeout(() => {
        dispatch(userSliceActions.init());
      }, 1000);

      signOutFirebase();
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
    }
  };

  return {
    authUser,

    signInOrSignUpByFirebase,
    handleSignOut,
  };
};
export default useAuth;
