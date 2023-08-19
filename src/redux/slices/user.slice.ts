import {IBasePaginateData} from '@models/pagination/pagination.type';
import {IUser} from '@models/users/user.type';
import {AnyAction, createSlice} from '@reduxjs/toolkit';
import {SliceUtils} from '@utils/sliceUtils';

const initialState: {userPaginate: IBasePaginateData<IUser>; UIState: any} = {
  userPaginate: {
    meta: {
      current_page: -1,
      from: 0,
      last_page: 0,
      links: [],
      path: '',
      per_page: 0,
      to: 0,
      total: 0, // init TODO: bring it to enums
    },
  },
  UIState: {
    addedIds: [],
  },
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setPaginate: (state, action: AnyAction) =>
      SliceUtils.setReducerPaginateByKey('userPaginate', state, action),
    refreshPaginate: (state, _action: AnyAction) => ({
      ...state,
      UIState: {
        addedIds: [],
      },
    }),
    deleteUser: (state, action: AnyAction) =>
      SliceUtils.setDataAfterDelete(state, action, state.userPaginate?.data),
    updateUser: (state, action: {payload: any}) =>
      SliceUtils.setDataAfterUpdate(
        'userPaginate',
        state,
        action,
        state.userPaginate?.data,
      ),
    createUser: (state, action: {payload: {newItem: IUser}}) =>
      SliceUtils.setDataAfterCreate('userPaginate', state, action),
  },
});

export const userSliceActions = userSlice.actions;

export const userReducer = userSlice.reducer;
