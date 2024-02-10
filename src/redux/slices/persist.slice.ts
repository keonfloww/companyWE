import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IUserSliceState} from './user.slice';

const initialState: {
  [key in string]: IUserSliceState;
} = {};

export const persistSlice = createSlice({
  name: 'persistSlice',
  initialState,
  reducers: {
    setUserPersistData: (
      state,
      action: PayloadAction<{
        userCredentialUid: string;
        data: IUserSliceState;
      }>,
    ) => {
      const userCredentialUid = action.payload.userCredentialUid;
      return {
        ...state,
        [userCredentialUid]: action.payload.data,
      };
    },
  },
});

export const {setUserPersistData} = persistSlice.actions;
export const persistSliceActions = persistSlice.actions;

export const userReducer = persistSlice.reducer;
