import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Catalogue } from "../../App";
import { RootState } from "../store";
import { setTokens } from "../reducers/auth";
import { IObjectResponse } from "../../types/types";

const URL = `https://startup-summer-2023-proxy.onrender.com/2.0/`;
const X_SECRET_KEY = `GEU4nvd3rej*jeh.eqp`;
const X_API_APP_ID = `v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948`;

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const token = (api.getState() as RootState).auth.access_token;
  if (!token) {
    console.log("token is empty");

    const tokens = await baseQuery(
      {
        url: "oauth2/password/",
        params: {
          login: "sergei.stralenia@gmail.com",
          password: "paralect123",
          client_id: "2356",
          client_secret: X_API_APP_ID,
          hr: "0",
        },
      },
      api,
      extraOptions
    );

    api.dispatch(setTokens(tokens.data));
  }

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      { url: "oauth2/refresh_token/", params: {} },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
    }
  }
  return result;
};

const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  headers: {
    "x-secret-key": `${X_SECRET_KEY}`,
    "X-Api-App-Id": `${X_API_APP_ID}`,
    accept: "application/json",
  },
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.access_token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "vacanciesApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getCatalogueData: build.query<Catalogue[], void>({
      query: () => `catalogues/`,
    }),
    getFavorites: build.query<any, string>({
      query: (favorites) => `vacancies/?ids[]=${favorites}/`,
    }),
    getCatalogueByValue: build.query<any, any>({
      query: (value) => `catalogues/${value || " "}/`,
    }),
    getVacancyById: build.query<any, any>({
      query: (id) => `vacancies/${id}/`,
    }),

    getVacanciesData: build.query<IObjectResponse, any>({
      query: ({
        page,
        catalogueValue,
        vacanciesOnPage,
        salaryFrom,
        salaryTo,
        keyword = "",
      }) => ({
        url: `vacancies/`,
        params: {
          page,
          count: 4,
          no_agreement: 1,
          payment_to: salaryTo,
          catalogues: catalogueValue,
          payment_from: salaryFrom,
          keyword,
          published: 1,
        },
      }),
    }),
  }),
});

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createToken: build.query({
      query: () => ``,
    }),
  }),
});

export const {
  useGetCatalogueDataQuery,
  useGetCatalogueByValueQuery,
  useGetVacanciesDataQuery,
  useGetFavoritesQuery,
  useGetVacancyByIdQuery,
} = apiSlice;
