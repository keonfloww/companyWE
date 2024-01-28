import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FireStoreCollection} from '@services/firestoreService';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {useDispatch, useSelector} from 'react-redux';
import {BaseState} from '@redux/stores';
import auth from '@react-native-firebase/auth';
import {FireBaseMailCredentials} from '@models/firebaseModel';
import {userSliceActions} from '@redux/slices/user.slice';

const useConnectMail = () => {
  const user = useSelector((state: BaseState) => state?.userReducer?.user?.id);
  const dispatch = useDispatch();

  useEffect(() => {
    const firebaseAuth = auth()!.currentUser;
    if (!firebaseAuth!.uid) {
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
        setTimeout(() => {
          InAppBrowser.close();
        }, 1500);
      });

    return () => unsubcribe();
  }, [user]);

  return {};
};
export default useConnectMail;
