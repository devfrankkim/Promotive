import axios from "axios";

import React, { useState } from "react";

import { WEATHER_API_KEY } from "api/API_weather";

import WeatherCard from "components/WeatherCard";
import WeatherSearch from "components/WeatherSearch";
import ForeCast from "components/ForeCast";

const WeatherForeCast = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  const [forecastData, setForecastData] = useState<any>({});

  const [currentIsLoading, setCurrentIsLoading] = useState(false);
  const [roreCastIsLoading, setForeCastIsLoading] = useState(false);

  const searchCity = async (searchInput: { label: string; value: string }) => {
    const [city, countryCode] = searchInput.label.split(",");

    setCurrentIsLoading(true);
    setForeCastIsLoading(true);

    try {
      const { data: currentWeatherData } = await axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );

      const { data: foreCastData } = await axios(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );

      // -------- Wait for the other data to load --------
      await Promise.allSettled([currentWeatherData, foreCastData]).then(() => {
        setCurrentWeatherData(currentWeatherData);
        setForecastData(foreCastData);
      });

      setCurrentIsLoading(false);
      setForeCastIsLoading(false);
    } catch (err: any) {
      alert("City information not found. Try different cities");
    }
  };

  return (
    <>
      {/* ==== Search Weather ==== */}
      <WeatherSearch onSearchChange={searchCity} />

      {/* ==== Current Weather ==== */}
      {Object.keys(currentWeatherData).length > 0 && (
        <WeatherCard weatherInfo={currentWeatherData} />
      )}
      {/* ==== Forecast ==== */}
      {Object.keys(forecastData).length !== 0 && (
        <ForeCast data={forecastData} />
      )}
    </>
  );
};

export default WeatherForeCast;
