import {IGetMailResponse} from '@models/mail/modelMail';
import {mailApi} from '@redux/slices/api/mailApi.slice';
import {userSliceActions} from '@redux/slices/user.slice';
import {ListenerMiddlewareInstance} from '@reduxjs/toolkit';

const start = (listenerMiddleware: ListenerMiddlewareInstance) => {
  listenerMiddleware.startListening({
    matcher: mailApi.endpoints.getMail.matchFulfilled,
    effect: async (action, listenerApi) => {
      const arg = action?.meta?.arg?.originalArgs;
      const data: IGetMailResponse = action.payload?.data;

      listenerApi.dispatch(
        userSliceActions.appendMailFromResponse({
          targetMailAddress: arg?.email_address,
          emails: data?.emails,
        }),
      );
      listenerApi.cancelActiveListeners();
    },
  });
};

export const MailApiMiddleware = {start};
