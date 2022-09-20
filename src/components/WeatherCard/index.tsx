import { DAY, TODAY_DATE } from "utils/constants/weather";
import { TbTemperatureCelsius } from "react-icons/tb";
import styled from "styled-components";
import { boxShadow, FlexCenter } from "styles/styles";
import React, { useState } from "react";

const WeatherCard = ({ weatherInfo, currentWeatherActive }: any) => {
  return (
    <FliperContainer>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <Wrapper>
            <WeatherDetail>
              {currentWeatherActive && <div>Right now</div>}
              <div>{weatherInfo?.dt_txt?.split(" ")[0]}</div>
              <div>{weatherInfo?.dt_txt?.split(" ")[1]}</div>
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
          </Wrapper>
        </div>
        <div className="flip-card-back">
          <Wrapper>
            <WrapperDate>
              <div>
                {TODAY_DATE} <span> ({DAY}) </span>
              </div>
            </WrapperDate>

            <WeatherDetail>
              <strong>Feels like:</strong>
              <div>
                {weatherInfo?.main?.feels_like}
                <TbTemperatureCelsius />
              </div>
              <div>
                <strong> humidity </strong> : {weatherInfo?.main?.humidity}%
              </div>
              <div>
                <strong>visibility</strong>: {weatherInfo?.visibility / 1000}
                km
              </div>
            </WeatherDetail>
          </Wrapper>
        </div>
      </div>
    </FliperContainer>
  );
};

export default React.memo(WeatherCard);

const FliperContainer = styled.div`
  height: 170px;
  width: 130px;
  background-color: transparent;
  perspective: 1000px;

  :hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .flip-card-front,
  .flip-card-back {
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
    border-radius: 5px;

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
  }

  strong {
    font-weight: bold;
    font-size: 13px;
  }
`;

const Wrapper = styled.div`
  background: white;
  height: 170px;
  width: 130px;
  flex-direction: column;

  top: 2rem;
  left: 2.5rem;
  gap: 3px;

  // ${FlexCenter};
  ${boxShadow.type3};
`;

const WrapperDate = styled.div`
  ${FlexCenter};
  position: absolute;
  top: 10px;
`;

const WeatherDetail = styled.div`
  margin-top: 1rem;
  line-height: 1.4rem;
`;
