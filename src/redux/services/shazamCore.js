import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "d808a0d688msha8d5655b0754cc4p12132djsnd8e9a416b3de",
//     "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
//   },
// };

// fetch("https://shazam-core.p.rapidapi.com/v1/charts/world", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "d808a0d688msha8d5655b0754cc4p12132djsnd8e9a416b3de"
      );
      return headers;
    },
  }),
  endpoints: (builders) => ({
    getTopCharts: builders.query({ query: () => "/charts/world" }),
    getSongDetails: builders.query({
      query: ({ songid }) => `/tracks/details?track_id=${songid}`,
    }),
  }),
});

export const { useGetTopChartsQuery, useGetSongDetailsQuery } = shazamCoreApi;
