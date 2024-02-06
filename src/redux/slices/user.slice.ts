import {FireBaseMailCredentials} from '@models/firebaseModel';
import {Email} from '@models/mail/modelMail';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
import moment from 'moment';

const initialState: {
  user: FirebaseAuthTypes.UserCredential | null;
  connectedMails: FireBaseMailCredentials[];

  // Inbox
  syncedMailAddress: string[];
  mailbox: {[key in string]: Email[]};

  // mail status
  mailReadMetadataIds: {[key in string]: boolean};
  mailBookmarkMetadataIds: {[key in string]: boolean};

  // Action marker
  isAskedForDeleteMail?: boolean;
} = {
  user: null,
  connectedMails: [],
  syncedMailAddress: [],
  mailbox: {},

  mailReadMetadataIds: {},
  mailBookmarkMetadataIds: {},

  isAskedForDeleteMail: false,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<FirebaseAuthTypes.UserCredential | null>,
    ) => {
      state.user = action.payload;
    },

    init: () => {
      return initialState;
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

      let oldEmailFromTargetMailAddress =
        state?.mailbox?.[data.targetMailAddress] ?? [];

      oldEmailFromTargetMailAddress?.filter((mail: Email) => {
        return mail?.received_on_unix >= moment().subtract(2, 'week').unix();
      });
      return {
        ...state,
        mailbox: {
          [data.targetMailAddress]: _.orderBy(
            _.uniq(
              data?.emails.concat(oldEmailFromTargetMailAddress),
              'metadata_id',
            ),
            'received_on_unix',
            'desc',
          ),
        },
      };
    },
    connectedMailMarkAsSynced: (
      state,
      action: PayloadAction<{mail: string}>,
    ) => {
      return {
        ...state,
        syncedMailAddress: _.uniq(
          state?.syncedMailAddress?.concat(action.payload.mail),
        ),
      };
    },

    // UI State
    mailMarkAsRead: (state, action: PayloadAction<{metadata_id: string}>) => {
      return {
        ...state,
        mailReadMetadataIds: {
          ...state?.mailBookmarkMetadataIds,
          [action.payload.metadata_id]: true,
        },
      };
    },

    markAsAskedDelete: state => {
      return {
        ...state,
        isAskedForDeleteMail: true,
      };
    },
  },
});

export const {setUser} = userSlice.actions;
export const userSliceActions = userSlice.actions;

export const userReducer = userSlice.reducer;
