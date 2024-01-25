import {IBasePaginateData} from '@models/pagination/pagination.type';
import {IUser} from '@models/users/user.type';
import {AnyAction, PayloadAction, createSlice} from '@reduxjs/toolkit';
import {SliceUtils} from '@utils/sliceUtils';

// const initialState: {userPaginate: IBasePaginateData<IUser>; UIState: any} = {
const initialState: {user: IUser;} = {
  user: {},
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    // setPaginate: (state, action: AnyAction) =>
    //   SliceUtils.setReducerPaginateByKey('userPaginate', state, action),
    // refreshPaginate: (state, _action: AnyAction) => ({
    //   ...state,
    //   UIState: {
    //     addedIds: [],
    //   },
    // }),
    // deleteUser: (state, action: AnyAction) =>
    //   SliceUtils.setDataAfterDelete(state, action, state.userPaginate?.data),
    // updateUser: (state, action: {payload: any}) =>
    //   SliceUtils.setDataAfterUpdate(
    //     'userPaginate',
    //     state,
    //     action,
    //     state.userPaginate?.data,
    //   ),
    // createUser: (state, action: {payload: {newItem: IUser}}) =>
    //   SliceUtils.setDataAfterCreate('userPaginate', state, action),
  },
});

export const {setUser} = userSlice.actions;

export const userReducer = userSlice.reducer;
