import {BaseState} from '@redux/stores';
import {useSelector} from 'react-redux';

const useProfileConnectedMail = () => {
  const connectedMails = useSelector(
    (state: BaseState) => state.userReducer.connectedMails,
  );

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const firebaseAuth = auth()!.currentUser;
  //   if (!firebaseAuth?.uid) {
  //     return;
  //   }
  //   const unsubcribe = firestore()
  //     .collection(FireStoreCollection.MAIL)
  //     .doc(firebaseAuth!.uid)
  //     .onSnapshot(QuerySnapshot => {
  //       console.log('QuerySnapshot');
  //       const newFirebaseMail: FireBaseMailCredentials =
  //         QuerySnapshot.data() as FireBaseMailCredentials;
  //       console.log('newFirebaseMail', newFirebaseMail);
  //       if (!newFirebaseMail) {
  //         console.log(
  //           'QuerySnapshot triggered with no mail credentials => User just sign in without connecting any mails',
  //         );
  //         return;
  //       }

  //       dispatch(userSliceActions.addNewConnectedMail(newFirebaseMail));
  //       AsyncStorage.setItem(LOCAL_STORAGE_KEYS.IS_CONNECTED_MAILS, 'true');
  //       setTimeout(() => {
  //         InAppBrowser.close();
  //       }, 1500);
  //     });

  //   return () => unsubcribe();
  // }, []);

  return {connectedMails};
};

export default useProfileConnectedMail;
