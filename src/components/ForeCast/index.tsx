import Chart from "components/Chart";

import React from "react";

const ForeCast = ({ data }: any) => {
  return <Chart chartData={data} />;
};

export default React.memo(ForeCast);
