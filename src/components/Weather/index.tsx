import axios from "axios";

import React, { useState, useEffect, useCallback } from "react";

import { error, ISuccess, options, WEATHER_API_KEY } from "api/weather";

import styled from "styled-components";

const Weather = () => {
  const [weatherInfo, setWeatherInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //  ====== Fetch Weather API =======
  const fetchWeatherAPI = async (URL: string) => {
    try {
      const { data } = await axios.get(URL);
      setWeatherInfo(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
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

  return <div>{isLoading ? <div>Loading....</div> : <div>yay</div>}</div>;
};

export default Weather;