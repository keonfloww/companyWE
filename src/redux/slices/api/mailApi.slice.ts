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
    moveToTrash: builder.mutation({
      query: (params: IMoveMailToTrash) => {
        return {
          url: `/gmail/trash_emails`,
          method: HTTP_METHODS.POST,
          body: params,
        };
      },
    }),
  }),
});

export const {useGetMailMutation, useMoveToTrashMutation} = mailApi;

interface MailAuth2Data {
  access_token: string;
  expiry_date: number;
  refresh_token: string;
}
export interface IGetMailParams extends MailAuth2Data {
  start_date: string;
  end_date: string;

  // UI FIRST
  email_address: string;
}

export interface IMoveMailToTrash extends MailAuth2Data {
  message_ids: string[];
}
