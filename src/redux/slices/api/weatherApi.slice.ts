import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {HTTP_METHODS} from './api.config';
import Config from 'react-native-config';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.weatherapi.com/v1/current.json',
  }),
  endpoints: builder => ({
    getWeather: builder.mutation({
      query: (params: IUserRegisterParams) => {
        console.log({params});
        return {
          url: `/users/register`,
          method: HTTP_METHODS.GET,
          body: params,
          headers: {
            authorization: '9507bd1a9e924c3cbca25550241303',
            'content-type': 'application/json',
          },
        };
      },
    }),
  }),
});

export interface IUserRegisterParams {
  params: any;
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
  gender_id: number | null;
  accessToken: string;
}

export const {
  // useUserUpdateMutation,
  // useUserDeleteMutation,
  // useUserCreateMutation,
} = weatherApi;
