import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Catalogue } from "../../App";

const URL = `https://startup-summer-2023-proxy.onrender.com/2.0`;
const key = `GEU4nvd3rej*jeh.eqp`;
const key2 = `v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948`;

export const pixemaApi = createApi({
  reducerPath: "pixemaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    headers: {
      "x-secret-key": `${key}`,
      "X-Api-App-Id": `${key2}`,
      accept: "application/json",
    },
  }),
  endpoints: (build) => ({
    getCatalogueData: build.query<Catalogue[], void>({
      query: () => `catalogues/`,
    }),
    getCatalogueByValue: build.query<any, any>({
      query: (value) => `catalogues/${value || " "}/`,
    }),
    getFavoriteCards: build.query({
      query: ({ query, limit }) =>
        `/movie?${query}&limit=${limit}&sortField=rating.kp&sortType=-1&selectFields=genres year name typeNumber id poster rating`,
    }),
  }),
});

export const {
  useGetCatalogueDataQuery,
  useGetFavoriteCardsQuery,
  useGetCatalogueByValueQuery,
} = pixemaApi;
