import CQNA from "components/CQNA";
import { useOutletContext } from "react-router-dom";
import { ABOUT_US_LIST } from "utils/FAQList/aboutus";

const QNAUs = () => {
  const [defaultPrimary] = useOutletContext<any>();

  return (
    <div>
      {defaultPrimary.us && (
        <div>
          {ABOUT_US_LIST.map((section, index) => (
            <CQNA section={section} key={`SchedulerQNA${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QNAUs;
