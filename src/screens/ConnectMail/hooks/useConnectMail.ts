import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FireStoreCollection} from '@services/firestoreService';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {useDispatch, useSelector} from 'react-redux';
import {BaseState} from '@redux/stores';
import auth from '@react-native-firebase/auth';
import {FireBaseMailCredentials} from '@models/firebaseModel';
import {userSliceActions} from '@redux/slices/user.slice';
import navigationService from '@services/navigationService';
import {Screen} from '@navigation/navigation.enums';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOCAL_STORAGE_KEYS} from '@utils/localStorageUtils';

const useConnectMail = ({
  autoRedirectToHome = false,
}: {
  autoRedirectToHome: boolean;
}) => {
  const user = useSelector((state: BaseState) => state?.userReducer?.user?.id);
  const connectedMails = useSelector(
    (state: BaseState) => state?.userReducer.connectedMails,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const firebaseAuth = auth()!.currentUser;
    console.log('firebaseAuth', {
      email: firebaseAuth?.email,
      udi: firebaseAuth?.uid,
    });

    if (!firebaseAuth?.uid) {
      return;
    }
    const unsubcribe = firestore()
      .collection(FireStoreCollection.MAIL)
      .doc(firebaseAuth!.uid)
      .onSnapshot(QuerySnapshot => {
        console.log('QuerySnapshot');
        const newFirebaseMail: FireBaseMailCredentials =
          QuerySnapshot.data() as FireBaseMailCredentials;

        if (!newFirebaseMail) {
          console.log(
            'QuerySnapshot triggered with no mail credentials => User just sign in without connecting any mails',
          );
          return;
        }
        console.log('Connected new mail', newFirebaseMail.email);
        dispatch(userSliceActions.addNewConnectedMail(newFirebaseMail));
        AsyncStorage.setItem(LOCAL_STORAGE_KEYS.IS_CONNECTED_MAILS, 'true');
        if (autoRedirectToHome) {
          navigationService.navigateAndReset(Screen.MainTabBar, {
            params: Screen.HomeScreen,
          });
        }
        setTimeout(() => {
          InAppBrowser.close();
        }, 2000);
      });

    return () => unsubcribe();
  }, [user]);

  return {connectedMails};
};
export default useConnectMail;
