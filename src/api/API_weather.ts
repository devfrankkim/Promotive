import axios from "axios";

export const WEATHER_GEO_API_KEY = process.env.REACT_APP_WEATHER_GEO_API_KEY;
export const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export type ISuccess = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

//  ====== API options =======
export const options = {
  maximumAge: 0,
  timeout: 10000,
  enableHighAccuracy: true,
};

//  ====== API error =======
export const error = (err: any) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};
// ====== GeoDB Cities =======

export const GEO_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const GEOOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": WEATHER_GEO_API_KEY as string,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const GEOHeaders = {
  "X-RapidAPI-Key": "", // enter your rapid api key here
  "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
};

export const getGeoCityAxios = axios.create({
  baseURL: GEO_URL,
  headers: GEOHeaders,
});
