import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {HTTP_METHODS} from './api.config';
import Config from 'react-native-config';
import {Email} from '@models/mail/modelMail';

export const mailApi = createApi({
  reducerPath: 'mailApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Config.API_URL,
  }),
  endpoints: builder => ({
    getMail: builder.mutation<IGetMailResponse, IGetMailParams>({
      query: params => {
        return {
          url: `/gmail/retrieve_emails_v2`,
          method: HTTP_METHODS.POST,
          body: params,
        };
      },
      transformResponse: (res: any) => res?.data,
    }),
    moveToTrash: builder.mutation({
      query: (params: IMoveMailToTrashParams) => {
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

// Requests
export interface IMailAuth2Params {
  access_token: string;
  expiry_date: number;
  refresh_token: string;
}
export interface IGetMailParams extends IMailAuth2Params {
  start_date: string;
  end_date: string;
  max_results: number;
  next_page_token: string | null;

  // UI FIRST
  email_address: string;
}

export interface IMoveMailToTrashParams extends IMailAuth2Params {
  message_ids: string[];
}

// Responses
export interface IGetMailResponse {
  emails: Email[];
  next_page_token: string;
  token_info: IMailAuth2Params & {is_expired: boolean};
  total_number_of_emails: number;
}
