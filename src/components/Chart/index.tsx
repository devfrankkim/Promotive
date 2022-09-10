import ReactApexChart from "react-apexcharts";

const Chart = ({ chartData }: any) => {
  return (
    <ReactApexChart
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
          data: chartData?.list?.map((item: any) => `${item.main.temp}`) as [],
        },
        {
          name: "Humidity",
          data: chartData?.list?.map((item: any) => item.main.humidity) as [],
        },
      ]}
      options={{
        theme: {
          mode: "light",
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
          align: "center",
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
  );
};

export default Chart;
