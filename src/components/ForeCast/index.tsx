import WeatherCard from "components/WeatherCard";
import React from "react";

const ForeCast = ({ data }: any) => {
  console.log(data.list);
  return (
    <div>
      <div>
        {data.list.slice(0, 7).map((day: any, idx: number) => (
          <div key={idx + 1}>
            <WeatherCard weatherInfo={day} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForeCast;
