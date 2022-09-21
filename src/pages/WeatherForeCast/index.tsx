import axios from "axios";

import React, { useState } from "react";

import { WEATHER_API_KEY } from "api/API_weather";

import WeatherCard from "components/WeatherCard";
import WeatherSearch from "components/WeatherSearch";
import ForeCast from "components/ForeCast";
import styled from "styled-components";
import { LAPTOP, TABLET } from "utils/responsiveness";

import Loader from "components/Loader";

const WeatherForeCast = () => {
  const [animationRunning, setAnimationRunning] = useState(true);

  const onMouseOverHandler = () => {
    setAnimationRunning(false);
  };
  const onMouseOutHandler = () => {
    setAnimationRunning(true);
  };

  const [currentWeatherData, setCurrentWeatherData] = useState<any>({});
  const [forecastChartData, setForecastChartData] = useState<any>({});

  const [currentIsLoading, setCurrentIsLoading] = useState(false);
  const [foreCastChartIsLoading, setForeCastChartIsLoading] = useState(false);

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
        `https://api.openweathermap.org/data/2.5/weather?lat=${Number(
          lat
        )}&lon=${Number(lon)}&appid=${WEATHER_API_KEY}&units=metric`
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
      {/*  ==== Search Weather & Current Weather ==== */}
      <WrapperSearch>
        {/* ==== Search Weather Component ==== */}
        <WeatherSearch onSearchChange={onSearchChange} />

        {/* ==== Current Weather ==== */}
        {!currentIsLoading &&
          !foreCastChartIsLoading &&
          Object.keys(currentWeatherData)?.length > 0 && (
            <WeatherCard
              weatherInfo={currentWeatherData}
              currentWeatherActive
            />
          )}
      </WrapperSearch>

      {/* ==== Forecast Card ==== */}
      <WrapperForecastCards
        active={animationRunning}
        onMouseOver={onMouseOverHandler}
        onMouseOut={onMouseOutHandler}
        className="WrapperForecastCards"
      >
        {currentIsLoading || foreCastChartIsLoading ? (
          <Loader />
        ) : (
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
        )}
      </WrapperForecastCards>

      {/* ==== Forecast Chart ==== */}
      {!currentIsLoading && !foreCastChartIsLoading && (
        <WrapperChart>
          {Object.keys(forecastChartData)?.length !== 0 && (
            <ForeCast data={forecastChartData} />
          )}
        </WrapperChart>
      )}
    </WrapperForecast>
  );
};

export default WeatherForeCast;

const WrapperChart = styled.div`
  margin-top: 10rem;
  margin-bottom: 1rem;
`;

// ========= Component Container =========
const WrapperForecast = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  /* padding: 1rem; */
  overflow-x: hidden;
  padding: 3rem;

  @media ${TABLET} {
    position: relative;
    width: 80%;
    margin: auto;
    overflow: hidden;
  }

  @media ${LAPTOP} {
    /* width: 100%; */
  }
`;

const WrapperSearch = styled.div`
  position: relative;
  top: 5rem;
`;

const WrapperForecastCards = styled.div<{ active: boolean }>`
  position: relative;
  width: 100%;
  margin-bottom: 5rem;

  top: 8rem;
`;

const ContainerForecastCards = styled.div`
  margin-top: 2rem;

  position: relative;
  display: flex;
  justify-content: start;
  overflow: hidden;
`;

const CardsWrapper = styled.div<{ active: boolean }>`
  position: relative;

  width: 400px;
  margin: 5rem 5rem 5rem 0;

  // Animation
  animation: carousel 40s linear infinite;
  animation-play-state: ${(props) => (props.active ? "running" : "paused")};
  animation-delay: 0.7s;

  @keyframes carousel {
    0% {
      transform: translateX(0%);
    }

    100% {
      transform: translateX(calc(-40px * 40));
    }
  }
`;
