import axios from "axios";

import React, { useState, useEffect, useCallback } from "react";

import { error, ISuccess, options, WEATHER_API_KEY } from "api/API_weather";

import ErrorBox from "components/ErrorBox";
import { getSkeletonCards } from "components/SkeletonCard";
import WeatherCard from "components/WeatherCard";

const WeatherMyLocation = () => {
  const [weatherInfo, setWeatherInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  //  ====== Fetch Weather API =======
  const fetchWeatherAPI = async (URL: string) => {
    try {
      const { data } = await axios.get(URL);

      setWeatherInfo(data);
      setIsLoading(false);
      setIsError(false);
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.log(err);
    }
  };

  //  ====== API success -> HIT API =======
  const success = useCallback((result: ISuccess) => {
    const { latitude, longitude } = result.coords;
    const WEATHER_BASE_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`;

    fetchWeatherAPI(WEATHER_BASE_URL);
  }, []);

  //  ====== get Location <ISuccess>  =======
  const fetchLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [success]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  //  ====== Skeleton  =======

  return (
    <div>
      {isError ? (
        <ErrorBox />
      ) : isLoading ? (
        [getSkeletonCards()]
      ) : (
        <WeatherCard weatherInfo={weatherInfo} />
      )}
    </div>
  );
};

export default WeatherMyLocation;
