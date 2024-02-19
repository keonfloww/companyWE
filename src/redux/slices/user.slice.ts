import {
  FireBaseMailCredentialUpdated,
  FireBaseMailCredentials,
} from '@models/firebaseModel';
import {Email} from '@models/mail/modelMail';
import {IUser} from '@models/users/user.type';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
import moment from 'moment';

const initialState: {
  user: FirebaseAuthTypes.UserCredential | null;
  userProfile: IUser | null;
  connectedMails: FireBaseMailCredentials[];

  // Inbox
  syncedMailAddress: string[];
  mailbox: Email[];

  // mail status
  mailReadMetadataIds: {[key in string]: boolean};
  mailBookmarkMetadataIds: {[key in string]: boolean};
  mailDeletedMetadataIds: {[key in string]: boolean};

  // Action marker
  isAskedForDeleteMail?: boolean;
} = {
  user: null,
  userProfile: null,
  connectedMails: [],
  syncedMailAddress: [],
  mailbox: [],

  mailReadMetadataIds: {},
  mailBookmarkMetadataIds: {},
  mailDeletedMetadataIds: {},

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
    setUserProfile: (state, action: PayloadAction<IUser | null>) => {
      state.userProfile = action.payload;
    },
    restoreFromPersistStore: (
      state,
      action: PayloadAction<IUserSliceState>,
    ) => {
      return {...state, ...action.payload, user: state.user};
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

      let oldEmailFromTargetMailAddress = state?.mailbox ?? [];

      oldEmailFromTargetMailAddress?.filter((mail: Email) => {
        return mail?.received_on_unix >= moment().subtract(2, 'week').unix();
      });

      return {
        ...state,
        mailbox: _.orderBy(
          _.uniqBy(
            data?.emails.concat(oldEmailFromTargetMailAddress),
            'metadata_id',
          ),
          'received_on_unix',
          'desc',
        ),
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
    connectedMailResetSync: state => {
      return {...state, syncedMailAddress: []};
    },
    connectedMailUpdateProgress: (
      state,
      action: PayloadAction<{
        updatedConnectedMail: FireBaseMailCredentialUpdated;
      }>,
    ) => {
      const updatedMailCredential = action.payload.updatedConnectedMail;
      return {
        ...state,
        connectedMails: state.connectedMails?.map(
          (mail: FireBaseMailCredentialUpdated) => {
            if (mail.email == updatedMailCredential?.email) {
              return updatedMailCredential;
            }
            return mail;
          },
        ),
      };
    },

    // UI State
    mailMarkAsRead: (state, action: PayloadAction<{metadata_id: string}>) => {
      const itemUid = action.payload.metadata_id;

      return {
        ...state,
        mailReadMetadataIds: {
          ...state?.mailReadMetadataIds,
          [itemUid]: !state?.mailReadMetadataIds?.[itemUid],
        },
      };
    },
    mailMarkBookmark: (state, action: PayloadAction<{metadata_id: string}>) => {
      const itemUid = action.payload.metadata_id;
      return {
        ...state,
        mailBookmarkMetadataIds: {
          ...state?.mailBookmarkMetadataIds,
          [itemUid]: !state?.mailBookmarkMetadataIds[itemUid],
        },
      };
    },
    mailMarkDeleted: (state, action: PayloadAction<{metadata_id: string}>) => {
      const itemUid = action.payload.metadata_id;
      return {
        ...state,
        mailDeletedMetadataIds: {
          ...state?.mailDeletedMetadataIds,
          [itemUid]: true,
        },
      };
    },
    mailMarkDeletedMany: (
      state,
      action: PayloadAction<{metadata_ids: string[]}>,
    ) => {
      const itemUids = action.payload.metadata_ids;

      const newMailDeletedMetadataIds = {...state?.mailDeletedMetadataIds};

      itemUids?.forEach((id: string) => {
        Object.assign(newMailDeletedMetadataIds, {[id]: true});
      });

      return {
        ...state,
        mailDeletedMetadataIds: newMailDeletedMetadataIds,
      };
    },

    // Sync status
    setFlagAskForDelete: (
      state,
      action: PayloadAction<{shouldAsk: boolean}>,
    ) => {
      return {
        ...state,
        isAskedForDeleteMail: action.payload.shouldAsk ?? false,
      };
    },
  },
});

export const {setUser} = userSlice.actions;
export const userSliceActions = userSlice.actions;
export type IUserSliceState = typeof initialState;
export const userReducer = userSlice.reducer;
