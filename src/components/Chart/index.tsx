import ReactApexChart from "react-apexcharts";

import { useRecoilValue } from "recoil";
import { darkLightMode } from "recoil/DnDToDoAtom";

import styled from "styled-components";

const Chart = ({ chartData }: any) => {
  const isDarkMode = useRecoilValue(darkLightMode);

  return (
    <ContainerChart>
      <ReactApexChart
        className="test apexcharts-canvas"
        type="area"
        height={350}
        series={[
          {
            name: "Feels_like",
            data: chartData?.list?.map(
              (item: any) => `${item.main.feels_like}`
            ) as [],
          },
          {
            name: "Temperature",
            data: chartData?.list?.map(
              (item: any) => `${item.main.temp}`
            ) as [],
          },
          {
            name: "Humidity",
            data: chartData?.list?.map((item: any) => item.main.humidity) as [],
          },
        ]}
        options={{
          theme: {
            mode: isDarkMode ? "dark" : "light",
          },
          chart: {
            type: "area",
            height: 350,
          },

          stroke: {
            curve: "smooth",
          },

          title: {
            text: "Weather(°C)",
            align: "left",
          },
          dataLabels: {
            enabled: true,
          },
          labels: chartData?.list?.map((item: any) => item.dt_txt) as [],
          xaxis: {
            type: "datetime",
            categories: chartData?.list?.map((item: any) => item.dt_txt) as [],
          },
          yaxis: {
            opposite: true,
          },
          legend: {
            horizontalAlign: "center",
          },
          grid: { show: true },

          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm",
            },
          },
        }}
      />
    </ContainerChart>
  );
};

export default Chart;

const ContainerChart = styled.div`
  .apexcharts-canvas > svg {
    background-color: transparent !important;
  }
`;
