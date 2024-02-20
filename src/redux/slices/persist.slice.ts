import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IUserSliceState} from './user.slice';

const initialState: {
  [key in string]: IUserSliceState;
} = {};

export const persistSlice = createSlice({
  name: 'persistSlice',
  initialState,
  reducers: {
    init: () => initialState,
    setUserPersistData: (
      state,
      action: PayloadAction<{
        userCredentialUid: string;
        data: IUserSliceState;
      }>,
    ) => {
      const userCredentialUid = action.payload?.userCredentialUid;

      if (userCredentialUid || !action.payload?.data) {
        return state;
      }
      return {
        ...state,
        [userCredentialUid]: action.payload.data,
      };
    },
  },
});

export const {setUserPersistData} = persistSlice.actions;
export const persistSliceActions = persistSlice.actions;

export const persistReducer = persistSlice.reducer;
