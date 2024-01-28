import {FireBaseMailCredentials} from '@models/firebaseModel';
import {Email} from '@models/mail/modelMail';
import {IUser} from '@models/users/user.type';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState: {
  user: IUser | null;
  connectedMails: any[];

  // Inbox
  syncedMailAddress: string[];
  mailbox: {[key in string]: Email[]};

  // mail status
  mailReadMetadataIds: {[key in string]: boolean};
  mailBookmarkMetadataIds: {[key in string]: boolean};
} = {
  user: {},
  connectedMails: [],
  syncedMailAddress: [],
  mailbox: {},

  mailReadMetadataIds: {},
  mailBookmarkMetadataIds: {},
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    addNewConnectedMail: (
      state,
      action: PayloadAction<FireBaseMailCredentials>,
    ) => {
      return {
        ...state,
        connectedMails: state?.connectedMails?.concat(action.payload),
      };
    },

    // Middleware triggered
    appendMailFromResponse: (
      state,
      action: PayloadAction<{targetMailAddress: string; emails: Email[]}>,
    ) => {
      const data = action.payload;

      const oldEmailFromTargetMailAddress =
        state?.mailbox?.[data.targetMailAddress] ?? [];

      return {
        ...state,
        mailbox: {
          [data.targetMailAddress]: oldEmailFromTargetMailAddress?.concat(
            _.orderBy(data?.emails, 'received_on_unix', 'desc'),
          ),
        },
        syncedMailAddress: _.uniq(
          state?.syncedMailAddress?.concat(data.targetMailAddress),
        ),
      };
    },

    mailMarkAsRead: (state, action: PayloadAction<{metadata_id: string}>) => {
      return {
        ...state,
        mailReadMetadataIds: {
          ...state?.mailBookmarkMetadataIds,
          [action.payload.metadata_id]: true,
        },
      };
    },
  },
});

export const {setUser} = userSlice.actions;
export const userSliceActions = userSlice.actions;

export const userReducer = userSlice.reducer;
