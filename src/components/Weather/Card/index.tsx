import React, { useState } from "react";
import { SunSystem, WeatherDetailIcon } from "types/WeatherType";

const WeatherCard = ({ weatherInfo }: any) => {
  const [detail, setDetail] = useState<WeatherDetailIcon>(
    weatherInfo?.weather[0]
  );
  const [sunRiseSet, setSunRiseSet] = useState<SunSystem>(weatherInfo?.sys);

  const date = new Date();
  console.log(date);

  return (
    <div>
      <div>{date.getMonth() + 1 + "/" + date.getDate()}</div>
      <img
        src={`http://openweathermap.org/img/w/${detail?.icon}.png`}
        alt="weather-icon"
      />
      <div>detail: {detail.description}</div>
    </div>
  );
};

export default WeatherCard;
