import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {HTTP_METHODS} from './api.config';
import {IBasePaginateParams} from '@models/pagination/paginationRequest.type';
import {IUpdateUserParams} from '@models/users/request/userRequests.type';
import Config from 'react-native-config';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Config.API_URL ?? 'https://jointly-full-ghoul.ngrok-free.app/api',
    headers: new Headers({
      'ngrok-skip-browser-warning': '69420',
    }),
  }),
  endpoints: builder => ({
    userPaginate: builder.mutation({
      query: (params: IBasePaginateParams) => {
        return {
          url: `/users`,
          method: HTTP_METHODS.GET,
          params,
        };
      },
    }),
    userDetail: builder.mutation({
      query: ({userId}: {userId: number}) => {
        return {
          url: `/users/${userId}`,
          method: HTTP_METHODS.GET,
        };
      },
      transformResponse: (res: any) => res.data,
    }),
    userUpdate: builder.mutation({
      query: ({
        params,
        userId,
      }: {
        params: IUpdateUserParams;
        userId: number;
      }) => {
        return {
          url: `/users/${userId}`,
          method: HTTP_METHODS.PUT,
          params: params,
        };
      },
    }),
    userDelete: builder.mutation({
      query: ({userId}: {userId: number}) => {
        return {
          url: `/users/${userId}`,
          method: HTTP_METHODS.DELETE,
        };
      },
    }),
    userCreate: builder.mutation({
      query: ({params}: {params: IUpdateUserParams}) => {
        return {
          url: `/users`,
          method: HTTP_METHODS.POST,
          params: params,
        };
      },
      transformResponse: (res: any) => res?.data,
    }),
  }),
});

export const {
  useUserPaginateMutation,

  useUserDetailMutation,
  useUserUpdateMutation,
  useUserDeleteMutation,
  useUserCreateMutation,
} = userApi;
