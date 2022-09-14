import CQNA from "components/CQNA";
import { useOutletContext } from "react-router-dom";
import { POMODORO_LIST } from "utils/FAQList/pomodoro";

const QNAPomodoro = () => {
  const [defaultPrimary] = useOutletContext<any>();

  return (
    <div>
      {defaultPrimary.pomodoro && (
        <div>
          {POMODORO_LIST.map((section, index) => (
            <CQNA section={section} key={`PomodoroQNA${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QNAPomodoro;
