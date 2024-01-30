import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {HTTP_METHODS} from './api.config';
import Config from 'react-native-config';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Config.API_URL,
  }),
  endpoints: builder => ({
    userRegister: builder.mutation({
      query: (params: IUserRegisterParams) => {
        return {
          url: `/users/register`,
          method: HTTP_METHODS.POST,
          params,
        };
      },
    }),
    userVerify: builder.mutation({
      query: (params: IUserVerifyParams) => {
        return {
          url: `/users/verify`,
          method: HTTP_METHODS.POST,
          params,
        };
      },
      transformResponse: (res: any) => res.data,
    }),
  }),
});

export interface IUserRegisterParams {
  id: string;
  user_name: string;
  email_address: string;
  is_email_address_verified: boolean;
  sign_up_provider_id: string;
}
export interface IUserVerifyParams {
  id: string;
  is_email_address_verified: boolean;
}



export const {
  useUserRegisterMutation,
  useUserVerifyMutation,
  // useUserUpdateMutation,
  // useUserDeleteMutation,
  // useUserCreateMutation,
} = userApi;
