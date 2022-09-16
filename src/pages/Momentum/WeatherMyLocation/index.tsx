import axios from "axios";

import React, { useState, useEffect, useCallback } from "react";

import { error, ISuccess, options, WEATHER_API_KEY } from "api/API_weather";

import ErrorBox from "components/ErrorBox";
import { getSkeletonCards } from "components/SkeletonCard";

import styled from "styled-components";
import { FlexCenter } from "pages/DND/styles";
import { TbTemperatureCelsius } from "react-icons/tb";
import { useRecoilValue } from "recoil";
import { darkLightMode } from "recoil/DnDToDoAtom";
import { TDarkMode } from "types";

const skeletonStyles = {
  position: "fixed",
  right: "1rem",
  top: "6rem",
  width: "150px",
  height: "60px",
};

const WeatherMyLocation = () => {
  const isDark = useRecoilValue(darkLightMode);

  const [weatherInfo, setWeatherInfo] = useState<any>();
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
        [getSkeletonCards(1, skeletonStyles)]
      ) : (
        <WeatherContainer darkMode={isDark}>
          <img
            src={`http://openweathermap.org/img/w/${weatherInfo?.weather[0]?.icon}.png`}
            alt="weather-icon"
          />
          <div className="city-name-temp">
            <div>
              {weatherInfo?.main?.temp} <TbTemperatureCelsius />
            </div>
            <div>{weatherInfo?.name}</div>
          </div>
        </WeatherContainer>
      )}
    </div>
  );
};

export default WeatherMyLocation;

const WeatherContainer = styled.div<TDarkMode>`
  color: ${(props) => props.theme.darkBG};
  display: flex;
  position: absolute;
  width: 150px;
  height: 60px;
  right: 2rem;
  top: 6rem;
  font-weight: bold;

  .city-name-temp {
    margin-left: 1rem;
    ${FlexCenter};
    flex-direction: column;
  }
`;
