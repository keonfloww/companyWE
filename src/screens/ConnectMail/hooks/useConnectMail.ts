import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FireStoreCollection} from '@services/firestoreService';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {useDispatch, useSelector} from 'react-redux';
import {BaseState, store} from '@redux/stores';
import auth from '@react-native-firebase/auth';
import {FireBaseMailCredentials} from '@models/firebaseModel';
import {userSliceActions} from '@redux/slices/user.slice';
import navigationService from '@services/navigationService';
import {Screen} from '@navigation/navigation.enums';
import {LocalUtils} from '@utils/localStorageUtils';
import BaseMailUtils from '@utils/baseMailUtils';
import {Email} from '@models/mail/modelMail';
import useInboxScreen from '@screens/Inbox/hooks/useInboxScreen';

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

  const handleCompleteConnectMailProcess = ({onCloseWebview = () => {}}) => {
    setTimeout(() => {
      InAppBrowser.close();
      onCloseWebview();
    }, 2000);
  };

  useEffect(() => {
    const firebaseAuth = auth();
    const currentUser = firebaseAuth.currentUser;
    console.log('firebaseAuth', currentUser);
    console.log('currentUser?.uid', currentUser?.uid);
    if (!currentUser?.uid) {
      return;
    }

    const unsubcribe = firestore()
      .collection(FireStoreCollection.MAIL)
      .doc(currentUser.uid)
      .onSnapshot(async QuerySnapshot => {
        const markAsDoneProcess = () => {
          handleCompleteConnectMailProcess({
            onCloseWebview: () => {
              QuerySnapshot.ref.delete();
            },
          });
        };

        const connectedMails = store.getState().userReducer.connectedMails;
        console.log('connectedMails', connectedMails);
        const newFirebaseMail: FireBaseMailCredentials =
          QuerySnapshot.data() as FireBaseMailCredentials;

        console.log(
          `------ RECOGNIZED new mail ${newFirebaseMail?.email}-------`,
        );
        if (
          newFirebaseMail?.email &&
          connectedMails?.some(
            (mail: FireBaseMailCredentials) =>
              mail.email == newFirebaseMail?.email,
          )
        ) {
          console.log('Connected this mail => do not sync again');
          markAsDoneProcess();
          return;
        }

        if (
          // Signed in credentials
          (await LocalUtils.isConnectedMail(
            BaseMailUtils.getValueForPersistMail(currentUser),
          )) &&
          // Connect new mail
          !connectedMails?.length
        ) {
          console.info('useConnectMail RESTORE FROM PERSIST DATA');
          if (autoRedirectToHome) {
            navigationService.navigateAndReset(Screen.MainTabBar, {
              params: Screen.HomeScreen,
            });
          }

          markAsDoneProcess();
          return;
        }

        if (!newFirebaseMail) {
          console.info(
            'QuerySnapshot triggered with no mail credentials => User just sign in without connecting any mails',
          );

          markAsDoneProcess();
          return;
        }

        console.info('Connected new mail', newFirebaseMail.email);

        dispatch(userSliceActions.addNewConnectedMail(newFirebaseMail));

        // CHECK once
        LocalUtils.appendNewConnectedMailCrendentials(
          BaseMailUtils.getValueForPersistMail(currentUser),
        );

        if (autoRedirectToHome) {
          navigationService.navigateAndReset(Screen.MainTabBar, {
            params: Screen.HomeScreen,
          });
        }

        markAsDoneProcess();
      });

    return () => unsubcribe();
  }, [user]);

  return {connectedMails};
};
export default useConnectMail;
