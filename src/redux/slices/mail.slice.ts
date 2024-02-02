import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState: {
  // mail status
  mailReadMetadataIds: {[key in string]: boolean};
  mailBookmarkMetadataIds: {[key in string]: boolean};
} = {
  mailReadMetadataIds: {},
  mailBookmarkMetadataIds: {},
};

export const mailSlice = createSlice({
  name: 'mailSlice',
  initialState,
  reducers: {
    mailMarkAsRead: (state, action: PayloadAction<{metadata_id: string}>) => {
      return {
        ...state,
        mailReadMetadataIds: {
          ...state?.mailReadMetadataIds,
          [action.payload.metadata_id]: true,
        },
      };
    },
    mailMarkBookmark: (state, action: PayloadAction<{metadata_id: string}>) => {
      return {
        ...state,
        mailBookmarkMetadataIds: {
          ...state?.mailBookmarkMetadataIds,
          [action.payload.metadata_id]: state?.mailBookmarkMetadataIds[
            action.payload.metadata_id
          ]
            ? false
            : true,
        },
      };
    },
    clear: () => initialState,
  },
});

export const mailSliceActions = mailSlice.actions;

export const userReducer = mailSlice.reducer;
