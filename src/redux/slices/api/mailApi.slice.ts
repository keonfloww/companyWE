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
  start_date: string; // unix timestamp
  end_date: string; // unix timestamp
  max_results: number;
  next_page_token: string | null;

  // UI FIRST
  email_address: string;
}

/*
If you want to delete emails from 1 Jan, 2024 to 2 Feb, 2024 
then
Pass "start_date": "2022/01/01", "end_date": "2024/02/01", "delete_historical_mails": false 

If you want to delete all existing emails till 2 Feb, 2024  
then 
pass "end_date": "2024/02/01", "delete_historical_mails": true
*/
export interface IMoveMailToTrashParams extends IMailAuth2Params {
  start_date?: string;
  end_date: string;
  end_date_unix?: string;
  delete_historical_mails: boolean;
}

// Responses
export interface IGetMailResponse {
  emails: Email[];
  next_page_token: string;
  token_info: IMailAuth2Params & {is_expired: boolean};
  total_number_of_emails: number;
}
