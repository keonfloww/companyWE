import {FireBaseMailCredentials} from '@models/firebaseModel';
import {Email} from '@models/mail/modelMail';
import {
  useGetMailMutation,
  useMoveToTrashMutation,
} from '@redux/slices/api/mailApi.slice';
import {userSliceActions} from '@redux/slices/user.slice';
import {BaseState} from '@redux/stores';
import DateUtils from '@utils/dateUtils';
import moment from 'moment';
import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const useInboxScreen = () => {
  const dispatch = useDispatch();

  const [getMail] = useGetMailMutation();
  const [moveMailToTrash] = useMoveToTrashMutation();

  const userState = useSelector((state: BaseState) => state.userReducer);
  const mailState = useSelector((state: BaseState) => state.mailReducer);

  const connectedMailsUnsynced = useMemo(() => {
    return userState?.connectedMails?.filter(
      (i: FireBaseMailCredentials) =>
        !userState?.syncedMailAddress?.includes(i?.email),
    );
  }, [userState?.connectedMails, userState?.syncedMailAddress]);

  const mailBoxFlatten = useMemo(
    () => Object.values(userState?.mailbox).flat(),
    [userState?.mailbox],
  );

  // MEMO ---------------------
  const mailCountUnread = useMemo(() => {
    const res =
      mailBoxFlatten?.length -
        Object.values(mailState?.mailReadMetadataIds)?.length ?? 0;
    return res > 0 ? res : 0;
  }, [mailState?.mailReadMetadataIds, mailBoxFlatten?.length]);

  const computedIsShowDeleteAfterSyncedMail = useMemo(
    () =>
      userState?.isAskedForDeleteMail
        ? false
        : connectedMailsUnsynced?.length == 0,
    [connectedMailsUnsynced?.length, userState?.isAskedForDeleteMail],
  );

  // FUNCTIONS ---------------------
  const handleGetAllMailInConnectedMails = async () => {
    try {
      connectedMailsUnsynced?.forEach((mail: FireBaseMailCredentials) => {
        getMail({
          access_token: mail?.access_token,
          expiry_date: mail.expiry_date,
          refresh_token: mail.refresh_token,

          email_address: mail.email,
          start_date: moment()
            .subtract(2, 'week')
            .format(DateUtils.BACKEND_FORMAT),
          end_date: moment().format(DateUtils.BACKEND_FORMAT),
        }).unwrap();
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleMarkAsAskedDelete = () =>
    dispatch(userSliceActions.markAsAskedDelete());

  const handleMoveMailToTrash = () => {
    try {
      userState.connectedMails?.forEach((mail: FireBaseMailCredentials) => {
        moveMailToTrash({
          access_token: mail?.access_token,
          expiry_date: mail.expiry_date,
          refresh_token: mail.refresh_token,
          message_ids: userState.mailbox[mail.email]?.map(
            (mail: Email) => mail.metadata_id,
          ),
        }).unwrap();
      });
      handleMarkAsAskedDelete();
    } catch (error) {
      console.log('error', error);
    }
  };

  // EFFECT ---------------------

  // TEST log mail
  // console.log(
  //   'mailBox',
  //   mailBoxFlatten?.map((mail: Mail) => {
  //     return {...mail, body: {}};
  //   }),
  // );
  return {
    mailBoxFlatten,
    mailCountUnread,
    computedIsShowDeleteAfterSyncedMail,
    handleMoveMailToTrash,
    handleGetAllMailInConnectedMails,
    handleMarkAsAskedDelete,
  };
};

export default useInboxScreen;
