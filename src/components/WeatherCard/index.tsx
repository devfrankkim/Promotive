import React, { useState } from "react";

import { TbTemperatureCelsius } from "react-icons/tb";
import styled from "styled-components";
import { boxShadow, FlexCenter, palette } from "styles/styles";

import { useRecoilValue } from "recoil";
import { darkLightMode } from "recoil/DnDToDoAtom";
import { IoLocationSharp } from "react-icons/io5";
import { TABLET } from "utils/responsiveness";
import { handleDtText } from "utils/helpers";

import { DAY, TODAY_DATE } from "utils/constants/weather";

type TWeatherCard = {
  weatherInfo: any;
  currentWeatherActive?: boolean;
};

type TWeatherContainer = {
  darkMode?: boolean;
  currentWeatherActive?: boolean;
};

const WeatherCard = ({ weatherInfo, currentWeatherActive }: TWeatherCard) => {
  const isDarkMode = useRecoilValue(darkLightMode);

  return (
    <FliperContainer darkMode={isDarkMode}>
      {
        // =========== TOP CARD ===========
        currentWeatherActive ? (
          <CurrentWeatherContainer currentWeatherActive>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="wrapper">
                  <WeatherDetailCurrentWeather>
                    <div style={{ display: `${FlexCenter};` }}>
                      <div>Now</div>
                      <img
                        src={`http://openweathermap.org/img/w/${weatherInfo?.weather[0]?.icon}.png`}
                        alt="weather-icon"
                      />

                      <div>
                        {weatherInfo?.main?.temp} <TbTemperatureCelsius />
                      </div>
                      <div>
                        {" "}
                        <IoLocationSharp /> Near ({weatherInfo?.name},{" "}
                        {weatherInfo?.sys?.country})
                      </div>
                    </div>
                    <div>
                      <div>{weatherInfo?.weather[0]?.description}</div>
                      <div>
                        H: {weatherInfo?.main?.temp_max}
                        <TbTemperatureCelsius /> / L:{" "}
                        {weatherInfo?.main?.temp_min}
                        <TbTemperatureCelsius />
                      </div>
                    </div>
                  </WeatherDetailCurrentWeather>
                </div>
              </div>
              <div className="flip-card-back">
                <div className="wrapper">
                  <WeatherDetailBackCard>
                    <strong>
                      Feels like: {weatherInfo?.main?.feels_like}
                      <TbTemperatureCelsius />
                    </strong>
                    <div>
                      <strong> humidity </strong> :{" "}
                      {weatherInfo?.main?.humidity}%
                    </div>
                    <div>
                      <strong>visibility</strong>:{" "}
                      {weatherInfo?.visibility / 1000}
                      km
                    </div>
                  </WeatherDetailBackCard>
                </div>
              </div>
            </div>
          </CurrentWeatherContainer>
        ) : (
          // =========== BOTTOM CARDS ===========
          <div>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="wrapper">
                  <WeatherDetail>
                    <div>{handleDtText(weatherInfo?.dt_txt)}</div>
                    <div>
                      {weatherInfo?.dt_txt
                        ?.split(" ")[0]
                        ?.split("-")
                        .splice(1, 3)
                        .join("/")}
                    </div>
                    <img
                      src={`http://openweathermap.org/img/w/${weatherInfo?.weather[0]?.icon}.png`}
                      alt="weather-icon"
                    />
                    <div>{weatherInfo?.weather[0]?.description}</div>
                    <div>
                      {weatherInfo?.main?.temp} <TbTemperatureCelsius />
                    </div>
                    <div> {weatherInfo?.name}</div>
                  </WeatherDetail>
                </div>
              </div>
              <div className="flip-card-back">
                <div className="wrapper">
                  <WeatherDetailBackCard>
                    <strong>Feels like:</strong>
                    <div>
                      {weatherInfo?.main?.feels_like}
                      <TbTemperatureCelsius />
                    </div>
                    <div>
                      <strong> humidity </strong> :{" "}
                      {weatherInfo?.main?.humidity}%
                    </div>
                    <div>
                      <strong>visibility</strong>:{" "}
                      {weatherInfo?.visibility / 1000}
                      km
                    </div>
                  </WeatherDetailBackCard>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </FliperContainer>
  );
};

export default React.memo(WeatherCard);

const FliperContainer = styled.div<TWeatherContainer>`
  text-transform: capitalize;

  height: 170px;
  position: relative;
  /* background-color: transparent; */
  perspective: 1000px;
  border-radius: 15px;

  :hover .flip-card-inner {
    transform: rotateY(180deg);
    transition: 0.5s ease-in-out;
  }

  .flip-card-inner {
    border-radius: 15px;
    position: relative;
    width: 130px;
    height: 100%;

    text-align: center;
    transition: 0.5s ease-in-out;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .flip-card-front,
  .flip-card-back {
    width: 100%;

    cursor: pointer;
    position: absolute;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    transition: 0.5s ease-in-out;
    transform-style: preserve-3d;

    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -o-backface-visibility: hidden;

    backface-visibility: hidden;

    background-color: white;
    border-radius: 15px;

    user-select: none;
  }

  .flip-card-front {
    background-color: #bbb;
    color: black;
  }

  .flip-card-back {
    background-color: #2980b9;
    color: black;
    transform: rotateY(180deg);
    transition: 0.5s ease-in-out;
  }

  strong {
    font-weight: bold;
    font-size: 13px;
  }

  .wrapper {
    border-radius: 15px;
    background: ${(props) =>
      props.darkMode ? `${palette.purpleDND}` : `${palette.darkPurple}`};
    color: ${(props) =>
      props.darkMode ? `${palette.white}` : `${palette.white}`};
    height: 170px;

    width: 100%;
    flex-direction: column;

    top: 2rem;
    left: 2.5rem;
    gap: 3px;

    ${boxShadow.type3};
  }
`;

const CurrentWeatherContainer = styled.div<TWeatherContainer>`
  margin: 3rem 0;
  width: 100%;
  height: 100%;
  border-radius: 15px;

  .flip-card-inner {
    width: ${(props) => (props.currentWeatherActive ? "100%" : "130px")};
  }

  .wrapper {
    height: 250px;
  }

  :hover .flip-card-inner {
    transform: rotateY(180deg);
    transition: 1s ease-in-out;
  }
`;

const WeatherDetail = styled.div`
  line-height: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  align-items: center;
  padding: 1rem;
  margin: auto;
`;

const WeatherDetailCurrentWeather = styled(WeatherDetail)`
  @media ${TABLET} {
    flex-direction: row;
    width: 50%;
  }
`;

const WeatherDetailBackCard = styled(WeatherDetail)`
  justify-content: center;
  flex-direction: column;
`;
