import React, { useState } from "react";
import { SunSystem, WeatherDetailIcon, WeatherMain } from "types/WeatherType";
import { DAY, TODAY_DATE } from "utils/constants/weather";
import { TbTemperatureCelsius } from "react-icons/tb";
import styled from "styled-components";
import { boxShadow, FlexCenter } from "styles/styles";

const WeatherCard = ({ weatherInfo }: any) => {
  const [detail, setDetail] = useState<WeatherDetailIcon>(
    weatherInfo?.weather[0]
  );
  const [main, setMain] = useState<WeatherMain>(weatherInfo?.main);
  const [sunRiseSet, setSunRiseSet] = useState<SunSystem>(weatherInfo?.sys);

  console.log(weatherInfo);

  return (
    <FliperContainer>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <Wrapper>
              <WrapperDate>
                <div>
                  {TODAY_DATE} <span> ({DAY}) </span>
                </div>
              </WrapperDate>
              <WeatherDetail>
                <img
                  src={`http://openweathermap.org/img/w/${detail?.icon}.png`}
                  alt="weather-icon"
                />
                <div>{detail.description}</div>
                <div>
                  {main.temp} <TbTemperatureCelsius />
                </div>
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
                  {main.feels_like}
                  <TbTemperatureCelsius />
                </div>
                <div>
                  <strong> humidity </strong> : {main.humidity}%
                </div>
                <div>
                  <strong>visibility</strong>: {weatherInfo.visibility / 1000}km
                </div>
              </WeatherDetail>
            </Wrapper>
          </div>
        </div>
      </div>
    </FliperContainer>
  );
};

export default WeatherCard;

const FliperContainer = styled.div`
  cursor: pointer;
  text-align: center;

  .flip-card {
    background-color: transparent;
    height: 130px;
    width: 110px;
  }

  .flip-card-inner {
    transition: transform 1s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
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
  height: 150px;
  width: 130px;
  flex-direction: column;
  position: relative;
  top: 2rem;
  left: 2.5rem;
  gap: 3px;

  ${FlexCenter};
  ${boxShadow.type3};
`;

const WrapperDate = styled.div`
  ${FlexCenter}
  position: absolute;
  top: 10px;
`;

const WeatherDetail = styled.div`
  margin-top: 1rem;
  line-height: 1.4rem;
`;
