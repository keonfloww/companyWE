import {Screen} from '@navigation/navigation.enums';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistSliceActions} from '@redux/slices/persist.slice';
import {userSliceActions} from '@redux/slices/user.slice';
import {BaseState} from '@redux/stores';
import navigationService from '@services/navigationService';
import BaseMailUtils from '@utils/baseMailUtils';
import {LOCAL_STORAGE_KEYS} from '@utils/localStorageUtils';
import {useDispatch, useSelector} from 'react-redux';

const useAuth = () => {
  const dispatch = useDispatch();

  const userReducerState = useSelector((state: BaseState) => state.userReducer);
  const persistReducerState = useSelector(
    (state: BaseState) => state.persistReducer,
  );
  const authUser = useSelector((state: BaseState) => state.userReducer.user);
  const signInOrSignUpByFirebase = async ({isSignUp = false}) => {
    try {
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
    } catch (error) {
      console.log('error handleSignOut', error);
    } finally {
      // Dont clear on sign out anymore.
      // Because once user resign in with same credentials => keep data without sync
      // If the credentials is difference => remove and sync

      AsyncStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      // AsyncStorage.removeItem(LOCAL_STORAGE_KEYS.IS_CONNECTED_MAILS);
      navigationService.navigateAndReset(Screen.Login, {isShowBack: false});
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
