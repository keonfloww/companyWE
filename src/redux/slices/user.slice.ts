import {IUser} from '@models/users/user.type';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState: {user: IUser; connectedMails: any[]} = {
  user: {},
  connectedMails: [],
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    addNewConnectedMail: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        connectedMails: state?.connectedMails?.concat(action.payload),
      };
    },
  },
});

export const {setUser} = userSlice.actions;
export const userSliceActions = userSlice.actions;

export const userReducer = userSlice.reducer;
