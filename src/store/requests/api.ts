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

    const password = await baseQuery(
      "oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948&hr=0",
      api,
      extraOptions
    );
    console.log(password.data);

    api.dispatch(setTokens(password.data));
  }

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      "oauth2/refresh_token/",
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // api.dispatch(tokenUpdated({ accessToken: refreshResult.data as string }));

      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(logout());
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
    // console.log("token", token);

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

    getVacanciesData: build.query<any, any>({
      query: ({
        page,
        catalogueValue,
        vacanciesOnPage,
        salaryFrom,
        salaryTo,
      }) => ({
        // headers: { Authorization: `Bearer ${token}` },
        url: `vacancies/?page=${page}&count=${vacanciesOnPage}&keywords[0][srws]=1&keywords[0][skwc]=and&keywords[0][keys]=&order_field=payment&order_direction=desc&payment_from=${salaryFrom}&payment_to=${salaryTo}&no_agreement=1&limit=1&catalogues=${catalogueValue}`,
      }),
    }),
    createToken: build.query<any, void>({
      query: () => ({
        url: `oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948&hr=0`,
        headers: {},
      }),
    }),
  }),
});

// export const baseQueryWithReauth = async (
//   args: any,
//   api: any,
//   extraOptions: any
// ): Promise<any> => {
//   let result = await baseQuery(args, api, extraOptions);
//   if (result?.error?.status === 403) {
//   }
// };

// export const authApiSlice = apiSlice.injectEndpoints({
//   endpoints: (build) => ({
//     createToken: build.query({
//       query: () => ``,
//     }),
//   }),
// });

export const {
  useGetCatalogueDataQuery,
  useGetCatalogueByValueQuery,
  useGetVacanciesDataQuery,
  useGetFavoritesQuery,
} = apiSlice;
