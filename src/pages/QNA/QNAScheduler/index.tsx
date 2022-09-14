import React from "react";
import { useOutletContext } from "react-router-dom";

import CQNA from "components/CQNA";

import { SCHEDULER_LIST } from "utils/FAQList/scheduler";

const QNAScheduler = () => {
  const [defaultPrimary] = useOutletContext<any>();

  return (
    <div>
      {defaultPrimary.scheduler && (
        <div>
          {SCHEDULER_LIST.map((section, index) => (
            <CQNA section={section} key={`SchedulerQNA${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QNAScheduler;
