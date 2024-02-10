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
import {LocalUtils} from '@utils/localStorageUtils';
import BaseMailUtils from '@utils/baseMailUtils';

const useConnectMail = ({
  autoRedirectToHome = false,
}: {
  autoRedirectToHome: boolean;
}) => {
  const user = useSelector((state: BaseState) => state?.userReducer?.user);
  const connectedMails = useSelector(
    (state: BaseState) => state?.userReducer.connectedMails,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const firebaseAuth = auth();
    const currentUser = firebaseAuth.currentUser;
    console.log('firebaseAuth', currentUser);

    if (!currentUser?.uid) {
      return;
    }
    const unsubcribe = firestore()
      .collection(FireStoreCollection.MAIL)
      .doc(currentUser.uid)
      .onSnapshot(async QuerySnapshot => {
        if (
          await LocalUtils.isConnectedMail(
            BaseMailUtils.getValueForPersistMail(currentUser),
          )
        ) {
          console.info('useConnectMail RESTORE FROM PERSIST DATA');
          if (autoRedirectToHome) {
            navigationService.navigateAndReset(Screen.MainTabBar, {
              params: Screen.HomeScreen,
            });
          }
          return;
        }

        const newFirebaseMail: FireBaseMailCredentials =
          QuerySnapshot.data() as FireBaseMailCredentials;
        if (!newFirebaseMail) {
          console.info(
            'QuerySnapshot triggered with no mail credentials => User just sign in without connecting any mails',
          );

          return;
        }
        console.info('Connected new mail', newFirebaseMail.email);

        dispatch(userSliceActions.addNewConnectedMail(newFirebaseMail));
        LocalUtils.appendNewConnectedMailCrendentials(
          BaseMailUtils.getValueForPersistMail(currentUser),
        );

        if (autoRedirectToHome) {
          navigationService.navigateAndReset(Screen.MainTabBar, {
            params: Screen.HomeScreen,
          });
        }
        setTimeout(() => {
          InAppBrowser.close();

          // DELETE IT AFTER GOT TO PREVENT AUTO CONNECT ON OTHER SESSION
          QuerySnapshot.ref.delete();
        }, 2000);
      });

    return () => unsubcribe();
  }, [user]);

  return {connectedMails};
};
export default useConnectMail;
