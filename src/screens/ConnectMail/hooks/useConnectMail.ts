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
          return;
        }

        dispatch(userSliceActions.addNewConnectedMail(newFirebaseMail));
        if (autoRedirectToHome) {
          navigationService.navigate(Screen.MainTabBar);
        }
        setTimeout(() => {
          InAppBrowser.close();
        }, 1500);
      });

    return () => unsubcribe();
  }, [user]);

  return {connectedMails};
};
export default useConnectMail;
