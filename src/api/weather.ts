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
