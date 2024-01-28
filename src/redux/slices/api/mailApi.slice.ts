import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {HTTP_METHODS} from './api.config';
import Config from 'react-native-config';

export const mailApi = createApi({
  reducerPath: 'mailApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Config.API_URL,
  }),
  endpoints: builder => ({
    getMail: builder.mutation({
      query: (params: IGetMailParams) => {
        return {
          url: `/gmail/retrieve_emails`,
          method: HTTP_METHODS.POST,
          body: params,
        };
      },
    }),
    getMailV2: builder.mutation({
      query: (params: IGetMailParams) => {
        return {
          url: `/gmail/retrieve_emails_v2`,
          method: HTTP_METHODS.POST,
          body: params,
        };
      },
    }),
  }),
});

export const {useGetMailMutation} = mailApi;

export interface IGetMailParams {
  access_token: string;
  start_date: string;
  end_date: string;
  expiry_date: number;
  refresh_token: string;

  // UI FIRST
  email_address: string;
}
