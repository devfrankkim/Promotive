import CQNA from "components/CQNA";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { FORECAST_LIST } from "utils/FAQList/forecast";

const QNAForeCast = () => {
  const [defaultPrimary] = useOutletContext<any>();

  return (
    <div>
      {defaultPrimary.forecast && (
        <div>
          {FORECAST_LIST.map((section, index) => (
            <CQNA section={section} key={`ForecastQNA${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QNAForeCast;
