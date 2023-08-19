import {IUser} from '@models/users/user.type';
import {useDispatch, useSelector} from 'react-redux';
import {IBasePaginateParams} from '@models/pagination/paginationRequest.type';
import {
  useUserCreateMutation,
  useUserDeleteMutation,
  useUserDetailMutation,
  useUserPaginateMutation,
  useUserUpdateMutation,
} from '@redux/slices/api/userApi.slice';
import {useCallback, useMemo} from 'react';
import {userSliceActions} from '@redux/slices/user.slice';
import {RootState} from '@redux/stores';
import {HookHandleFncBasic, HookHandleFncBasicDefault} from './hook.type';
import {IUpdateUserParams} from '@models/users/request/userRequests.type';

const useUserViewModel = () => {
  const dispatch = useDispatch();

  const [getUserPaginate, getUserPaginateData] = useUserPaginateMutation();
  const [getUserDetail, getUserDetailData] = useUserDetailMutation();
  const [updateUser, updateUserData] = useUserUpdateMutation();
  const [deleteUser, deleteUserData] = useUserDeleteMutation();
  const [createUser, createUserData] = useUserCreateMutation();

  const userPaginateData = useSelector(
    (state: RootState) => state.userReducer.userPaginate,
  );

  const computedIsEnd = useMemo(
    () =>
      userPaginateData?.meta?.current_page >= userPaginateData?.meta?.last_page,
    [userPaginateData?.meta?.current_page],
  );

  const handleGetUserPaginate = useCallback(
    async (params: IBasePaginateParams) => {
      try {
        const paginateData = await getUserPaginate(params).unwrap();
        dispatch(userSliceActions.setPaginate(paginateData));
      } catch (e) {
        console.log('e', e);
      }
    },
    [],
  );
  const handleDeleteUser = useCallback(
    async (
      userId: number,
      handler: HookHandleFncBasic = HookHandleFncBasicDefault,
    ) => {
      try {
        await deleteUser({userId}).unwrap();
        dispatch(userSliceActions.deleteUser({id: userId}));

        handler.onSuccess && handler.onSuccess();
      } catch (error) {
        handler.onError && handler.onError();
      }
    },
    [],
  );

  const handleUpdateUser = useCallback(
    async (
      userId: number,
      params: IUpdateUserParams,
      handler: HookHandleFncBasic = HookHandleFncBasicDefault,
    ) => {
      try {
        await updateUser({userId, params}).unwrap();
        dispatch(userSliceActions.updateUser({id: userId, newData: params}));

        handler.onSuccess();
      } catch (error) {
        handler.onError(error?.data?.message);
      }
    },
    [],
  );
  const handleCreateUser = useCallback(
    async (
      params: IUpdateUserParams,
      handler: HookHandleFncBasic = HookHandleFncBasicDefault,
    ) => {
      try {
        const user: IUser = await createUser({params}).unwrap();
        dispatch(userSliceActions.createUser({newItem: user}));

        handler.onSuccess();
      } catch (error) {
        handler.onError(error?.data?.message);
      }
    },
    [],
  );

  const computedLoading =
    getUserPaginateData?.isLoading ||
    getUserDetailData?.isLoading ||
    updateUserData?.isLoading ||
    deleteUserData?.isLoading ||
    createUserData?.isLoading;

  return {
    computedLoading,
    computedIsEnd,

    userPaginateData,
    userDetail: getUserDetailData?.data as IUser,

    handleGetUserPaginate,
    handleGetUserDetail: getUserDetail,
    handleUpdateUser,
    handleDeleteUser,
    handleCreateUser,
  };
};

export default useUserViewModel;
