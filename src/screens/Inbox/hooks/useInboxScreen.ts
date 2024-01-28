import {FireBaseMailCredentials} from '@models/firebaseModel';
import {useGetMailMutation} from '@redux/slices/api/mailApi.slice';
import {BaseState} from '@redux/stores';
import DateUtils from '@utils/dateUtils';
import moment from 'moment';
import {useSelector} from 'react-redux';

const useInboxScreen = () => {
  const [getMail] = useGetMailMutation();

  const connectedMailsUnsynced = useSelector((state: BaseState) => {
    console.log(state.userReducer?.syncedMailAddress);
    return state.userReducer?.connectedMails?.filter(
      (i: FireBaseMailCredentials) =>
        !state.userReducer?.syncedMailAddress?.includes(i?.email),
    );
  });
  const mailBoxFlatten = useSelector((state: BaseState) =>
    Object.values(state.userReducer.mailbox).flat(),
  );

  // TEST log mail
  // console.log(
  //   'mailBox',
  //   mailBoxFlatten?.map((mail: Mail) => {
  //     return {...mail, body: {}};
  //   }),
  // );

  const handleGetAllMailInConnectedMails = async () => {
    try {
      connectedMailsUnsynced?.forEach((mail: FireBaseMailCredentials) => {
        getMail({
          email_address: mail.email,
          access_token: mail?.access_token,
          start_date: moment()
            .subtract(2, 'week')
            .format(DateUtils.BACKEND_FORMAT),
          end_date: moment().format(DateUtils.BACKEND_FORMAT),
          expiry_date: mail.expiry_date,
          refresh_token: mail.refresh_token,
        }).unwrap();
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  return {
    mailBoxFlatten,

    handleGetAllMailInConnectedMails,
  };
};

export default useInboxScreen;
