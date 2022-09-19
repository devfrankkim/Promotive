import axios from "axios";

import React, { useState } from "react";

import { WEATHER_API_KEY } from "api/API_weather";

import WeatherCard from "components/WeatherCard";
import WeatherSearch from "components/WeatherSearch";
import ForeCast from "components/ForeCast";
import styled from "styled-components";
import { TABLET } from "utils/responsiveness";
import { FlexCenter } from "styles/styles";

const WeatherForeCast = () => {
  const [animationRunning, setAnimationRunning] = useState(true);

  const onMouseOverHandler = () => {
    setAnimationRunning(false);
  };
  const onMouseOutHandler = () => {
    setAnimationRunning(true);
  };

  console.log(animationRunning);
  const [currentWeatherData, setCurrentWeatherData] = useState<any>({});
  const [forecastChartData, setForecastChartData] = useState<any>({});
  const [forecastData, setForecastData] = useState<any>({});

  const [currentIsLoading, setCurrentIsLoading] = useState(false);
  const [foreCastChartIsLoading, setForeCastChartIsLoading] = useState(false);
  const [foreCastIsLoading, setForeCastIsLoading] = useState(false);

  const onSearchChange = async (searchInput: {
    latLong: string;
    label: string;
  }) => {
    const [lat, lon] = searchInput.latLong.split(",");
    const [city, countryCode] = searchInput.label.split(",");

    setCurrentIsLoading(true);
    setForeCastChartIsLoading(true);

    try {
      const { data: currentWeatherData } = await axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );

      const { data: foreCastChartData } = await axios(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );

      // -------- Wait for the other data to load --------
      await Promise.allSettled([currentWeatherData, foreCastChartData]).then(
        () => {
          setCurrentWeatherData(currentWeatherData);
          setForecastChartData(foreCastChartData);
        }
      );

      setCurrentIsLoading(false);
      setForeCastChartIsLoading(false);
    } catch (err: any) {
      alert("City information not found. Try different cities");
    }
  };

  return (
    <WrapperForecast>
      {/* ==== Search Weather Component ==== */}
      <WrapperSearch>
        <WeatherSearch onSearchChange={onSearchChange} />
      </WrapperSearch>

      {/* ==== Current Weather ==== */}
      {Object.keys(currentWeatherData)?.length > 0 && (
        <WeatherCard weatherInfo={currentWeatherData} />
      )}

      {/* ==== Forecast Chart ==== */}
      <WrapperChart>
        {Object.keys(forecastChartData)?.length !== 0 && (
          <ForeCast data={forecastChartData} />
        )}
      </WrapperChart>

      {/* ==== Forecast Card ==== */}
      <WrapperForecastCards
        active={animationRunning}
        onMouseOver={onMouseOverHandler}
        onMouseOut={onMouseOutHandler}
        className="WrapperForecastCards"
      >
        <ContainerForecastCards className="ContainerForecastCards">
          {forecastChartData?.list?.map((card: any, index: number) => (
            <CardsWrapper
              className="CardsWrapper"
              key={`forecastCard${index + 1}`}
              active={animationRunning}
            >
              <WeatherCard weatherInfo={card} />
            </CardsWrapper>
          ))}
        </ContainerForecastCards>
      </WrapperForecastCards>
    </WrapperForecast>
  );
};

export default WeatherForeCast;

const WrapperChart = styled.div`
  margin-bottom: 1rem;
`;

const WrapperForecast = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 1rem;
  overflow-x: hidden;
`;

const WrapperSearch = styled.div`
  position: relative;
  top: 5rem;
  /* padding: 3rem; */

  @media ${TABLET} {
    padding: 5rem;
  }
`;

const WrapperForecastCards = styled.div<{ active: boolean }>`
  position: relative;
  width: 100%;
  margin-bottom: 5rem;
  padding: 0rem 2rem;
`;

const ContainerForecastCards = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  /* width: calc(110px * 14); */
  overflow: hidden;
`;

const CardsWrapper = styled.div<{ active: boolean }>`
  padding: 5rem;
  position: relative;
  padding: 2rem;
  margin-right: 0.5rem;

  width: 400px;

  // Animation
  animation: carousel 40s linear infinite;
  animation-play-state: ${(props) => (props.active ? "running" : "paused")};
  animation-delay: 1.5s;

  @keyframes carousel {
    0% {
      transform: translateX(0%);
    }

    100% {
      transform: translateX(calc(-50px * 40));
    }
  }
`;
