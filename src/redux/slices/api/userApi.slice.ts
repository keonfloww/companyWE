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
        console.log({params});
        return {
          url: `/users/register`,
          method: HTTP_METHODS.POST,
          body: params,
          headers: {
            authorization: params.accessToken,
            'content-type': 'application/json',
          },
        };
      },
    }),
    userVerify: builder.mutation({
      query: (params: IUserVerifyParams) => {
        return {
          url: `/users/verify`,
          method: HTTP_METHODS.POST,
          body: params,
          headers: {
            authorization: params.accessToken,
            'content-type': 'application/json',
          },
        };
      },
      transformResponse: (res: any) => res.data,
    }),
    userUpdate: builder.mutation({
      query: (params: IUserUpdateParams) => {
        return {
          url: `/users/update`,
          method: HTTP_METHODS.POST,
          body: params,
          headers: {
            authorization: params.accessToken,
            'content-type': 'application/json',
          },
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
  sign_up_provider_id: number;
  accessToken: string;
}
export interface IUserVerifyParams {
  id: string;
  is_email_address_verified: boolean;
  accessToken: string;
}

export interface IUserUpdateParams {
  id: string;
  user_name: string;
  email_address: string;
  user_address: string;
  user_profile_picture: string;
  date_of_birth: string;
  phone_number: string;
  accessToken: string;
}

export const {
  useUserRegisterMutation,
  useUserVerifyMutation,
  useUserUpdateMutation,
  // useUserUpdateMutation,
  // useUserDeleteMutation,
  // useUserCreateMutation,
} = userApi;
