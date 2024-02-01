import {FireBaseMailCredentials} from '@models/firebaseModel';
import {Email} from '@models/mail/modelMail';
import {
  IGetMailParams,
  IMailAuth2Params,
  useGetMailMutation,
  useMoveToTrashMutation,
} from '@redux/slices/api/mailApi.slice';
import {userSliceActions} from '@redux/slices/user.slice';
import {BaseState} from '@redux/stores';
import DateUtils from '@utils/dateUtils';
import moment from 'moment';
import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// Future this will be set by user setting
const MAIL_PER_PAGE = 5;

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
      connectedMailsUnsynced?.forEach(
        async (targetMail: FireBaseMailCredentials) => {
          let next_page_token = null;

          while (true) {
            let mailAuth: IMailAuth2Params = {
              access_token: targetMail?.access_token,
              expiry_date: targetMail.expiry_date,
              refresh_token: targetMail.refresh_token,
            };

            const params: IGetMailParams = {
              ...mailAuth,

              email_address: targetMail.email,
              start_date: moment()
                .subtract(2, 'week')
                .format(DateUtils.BACKEND_FORMAT),
              end_date: moment().format(DateUtils.BACKEND_FORMAT),
              max_results: MAIL_PER_PAGE,
              next_page_token,
            };
            const res = await getMail(params).unwrap();

            // handle refresh token and retry here
            const isNeedToRefreshToken = res.token_info.is_expired;
            if (isNeedToRefreshToken) {
              next_page_token = next_page_token;
              mailAuth = {
                ...mailAuth,
                access_token: res.token_info.access_token,
                expiry_date: res.token_info.expiry_date,
              };
              console.log(
                `${targetMail.email} trigger retry with refresh token`,
              );
              continue;
            }

            const isEndOfMatchedMail = next_page_token == res.next_page_token;
            const isOufOfMail = !res.next_page_token;
            const isEnd = isEndOfMatchedMail || isOufOfMail;
            // End of sync the current address mail
            if (isEnd) {
              console.log(
                '---- SYNCED',
                `${targetMail.email}, from ${params.start_date} to ${params.end_date}`,
              );

              dispatch(
                userSliceActions.connectedMailMarkAsSynced({
                  mail: targetMail.email,
                }),
              );
              break;
            }

            // update next page to call
            next_page_token = res.next_page_token;
          }
        },
      );
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

          end_date: moment().format(DateUtils.BACKEND_FORMAT),
          delete_historical_mails: true,
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
