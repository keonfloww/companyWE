import {
  FireBaseMailCredentialUpdated,
  FireBaseMailCredentials,
} from '@models/firebaseModel';
import {
  IGetMailParams,
  IMailAuth2Params,
  useGetMailMutation,
  useMoveToTrashMutation,
} from '@redux/slices/api/mailApi.slice';
import {userSliceActions} from '@redux/slices/user.slice';
import {BaseState} from '@redux/stores';
import DateUtils from '@utils/dateUtils';
import moment, {Moment} from 'moment';
import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// Future this will be set by user setting
const MAIL_PER_PAGE = 25;

const useInboxScreen = () => {
  const dispatch = useDispatch();

  const [getMail] = useGetMailMutation();
  const [moveMailToTrash] = useMoveToTrashMutation();

  const userState = useSelector((state: BaseState) => state.userReducer);
  const persistData = useSelector((state: BaseState) => state.persistReducer);
  // console.log('persistData', persistData);
  // console.log('userState', {...userState, mailbox: userState?.mailbox?.length});
  const connectedMailsUnsynced = useMemo(() => {
    return userState?.connectedMails?.filter(
      (i: FireBaseMailCredentials) =>
        !userState?.syncedMailAddress?.includes(i?.email),
    );
  }, [userState?.connectedMails, userState?.syncedMailAddress]);

  const mailBoxFlatten = useMemo(
    () =>
      userState?.mailbox?.filter(
        mail => !userState.mailDeletedMetadataIds?.[mail?.metadata_id],
      ),
    [userState?.mailbox, userState.mailDeletedMetadataIds],
  );

  // MEMO ---------------------
  const mailCountUnread = useMemo(() => {
    const res =
      mailBoxFlatten?.length -
        Object.values(userState?.mailReadMetadataIds)?.length ?? 0;
    return res > 0 ? res : 0;
  }, [userState?.mailReadMetadataIds, mailBoxFlatten?.length]);

  const computedIsShowDeleteAfterSyncedMail = useMemo(
    () =>
      userState?.isAskedForDeleteMail
        ? false
        : connectedMailsUnsynced?.length == 0,
    [connectedMailsUnsynced?.length, userState?.isAskedForDeleteMail],
  );

  const computedIsSyncing = useMemo(() => {
    return (
      userState.syncedMailAddress?.length <= connectedMailsUnsynced?.length
    );
  }, [connectedMailsUnsynced?.length, userState.syncedMailAddress?.length]);

  // FUNCTIONS ---------------------
  // TODO: Handle the process when the sync is not done but app is killed
  const handleGetByFireBaseMail = async (
    targetMail: FireBaseMailCredentials & FireBaseMailCredentialUpdated,
  ) => {
    // console.log('handleGetByFireBaseMail', {
    //   address: targetMail.email,
    //   next_page_token: targetMail.next_page_token,
    // });
    let next_page_token = targetMail?.next_page_token || null;

    try {
      while (true) {
        let mailAuth: IMailAuth2Params = {
          access_token: targetMail?.access_token,
          expiry_date: targetMail.expiry_date,
          refresh_token: targetMail.refresh_token,
        };

        const startDate: Moment = moment()
          .subtract(2, 'week')
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0);

        const endDate: Moment = moment()
          .set('hour', 23)
          .set('minute', 59)
          .set('second', 59);

        const params: IGetMailParams = {
          ...mailAuth,

          email_address: targetMail.email,
          start_date: startDate.unix().toString(),
          end_date: endDate.unix().toString(),
          max_results: MAIL_PER_PAGE,
          next_page_token,

          // DEBUG
          start_date_string: startDate.format(
            DateUtils.FRONTEND_FORMAT_DEFAULT,
          ),
          end_date_string: endDate.format(DateUtils.FRONTEND_FORMAT_DEFAULT),
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

          dispatch(
            userSliceActions.connectedMailUpdateProgress({
              updatedConnectedMail: {
                ...targetMail,
                next_page_token,
                access_token: res.token_info.access_token,
                expiry_date: res.token_info.expiry_date,
              },
            }),
          );

          console.log(`${targetMail.email} trigger retry with refresh token`);
          continue;
        }

        const isEndOfMatchedMail = next_page_token == res.next_page_token;
        const isOufOfMail = !res.next_page_token;
        const isEnd = isEndOfMatchedMail || isOufOfMail;
        // End of sync the current address mail
        if (isEnd) {
          console.log(
            '---- SYNCED',
            `${targetMail.email}, from ${startDate.format(
              DateUtils.FRONTEND_FORMAT_DEFAULT,
            )} to ${endDate.format(DateUtils.FRONTEND_FORMAT_DEFAULT)}`,
          );

          dispatch(
            userSliceActions.connectedMailMarkAsSynced({
              mail: targetMail.email,
            }),
          );
          // TODO: If many mails is syncing. Wait to all syncing process done
          handleSetFlagAskForDelete({shouldAsk: true});
          global?.props?.showDeleteMailModal();

          // save latest token to pull to refresh
          dispatch(
            userSliceActions.connectedMailUpdateProgress({
              updatedConnectedMail: {
                ...targetMail,
                next_page_token: next_page_token,
              },
            }),
          );
          break;
        }

        // update next page to call
        dispatch(
          userSliceActions.connectedMailUpdateProgress({
            updatedConnectedMail: {
              ...targetMail,
              next_page_token: res.next_page_token,
            },
          }),
        );
        next_page_token = res.next_page_token;
      }
    } catch (error) {
      console.log('useinboxscreen error 158', error);
      global.props.showToast('Error in syncing mail', true);
      dispatch(
        userSliceActions.connectedMailMarkAsSynced({
          mail: targetMail.email,
        }),
      );
    }
  };
  // const handleGetAllMailInConnectedMails = async () => {
  //   console.log('connectedMailsUnsynced', connectedMailsUnsynced);
  //   try {
  //     connectedMailsUnsynced?.forEach(
  //       async (targetMail: FireBaseMailCredentials) =>
  //         handleGetByFireBaseMail(targetMail),
  //     );
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  /**
   * Description:
   * Refresh my inbox by pulling down on the screen,
   * Then sync the latest emails from the original inbox to the troove.
   */
  const handleInboxTriggerSyncNewItem = () => {
    if (computedIsSyncing) {
      console.info('In syncing process, skip pull to handleRefresh');
      return;
    }

    for (let mail of userState.connectedMails) {
      handleGetByFireBaseMail(mail);
    }
    dispatch(userSliceActions.connectedMailResetSync());
  };

  const handleSetFlagAskForDelete = ({
    shouldAsk = false,
  }: {
    shouldAsk: boolean;
  }) => dispatch(userSliceActions.setFlagAskForDelete({shouldAsk}));

  const handleMoveMailToTrash = () => {
    try {
      const endDate = moment().add(1, 'day');
      userState.connectedMails?.forEach((mail: FireBaseMailCredentials) => {
        moveMailToTrash({
          access_token: mail?.access_token,
          expiry_date: mail.expiry_date,
          refresh_token: mail.refresh_token,

          end_date: endDate.format(DateUtils.BACKEND_FORMAT),
          end_date_unix: endDate.unix().toString(),
          delete_historical_mails: true,
        }).unwrap();
      });
      handleSetFlagAskForDelete({shouldAsk: false});
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
    userState,
    mailBoxFlatten,
    mailCountUnread,
    computedIsShowDeleteAfterSyncedMail,
    handleMoveMailToTrash,
    // handleGetAllMailInConnectedMails,
    handleSetFlagAskForDelete,

    handleGetByFireBaseMail,
    handleInboxTriggerSyncNewItem,
  };
};

export default useInboxScreen;
