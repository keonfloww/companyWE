import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {HTTP_METHODS} from './api.config';
import {IBasePaginateParams} from '@models/pagination/paginationRequest.type';
import Config from 'react-native-config';

export const gmailApi = createApi({
  reducerPath: 'gmailApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Config.API_URL ?? 'https://troove-dev-385107.uc.r.appspot.com/api',
  }),
  endpoints: builder => ({
    getMail: builder.mutation({
      query: (params: IBasePaginateParams) => {
        return {
          url: `/v1/gmail/retrieve_emails`,
          method: HTTP_METHODS.GET,
          params,
        };
      },
    }),
    getMailV2: builder.mutation({
      query: (params: IBasePaginateParams) => {
        return {
          url: `/v1/gmail/retrieve_emails_v2`,
          method: HTTP_METHODS.GET,
          params,
        };
      },
    }),
  }),
});

export const {} = gmailApi;
