/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTimer } from "react-timer-hook";
import { competitionInfo } from "../../store/actions/competitions";
import { IRootReducer } from "../../store/reducers";
import "./Timer.scss";

export const Timer = () => {
  const { competition } = useSelector(
    (state: IRootReducer) => state.competition
  );
  const [expiryTimestamp, setExpiryTimestamp] = useState(0);

  const { seconds, minutes, hours, days, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called", expiryTimestamp),
  });

  const time = new Date();
  useEffect(() => {
    time.setSeconds((competition && competition.expTime) || 0);
    setExpiryTimestamp(time[Symbol.toPrimitive]("number"));
    restart(expiryTimestamp);
  }, [competition]);

  return (
    <>
      <div className="timer">
        <span className="days">{days}</span>
        <span>:</span>
        <span className="hours">{hours}</span>
        <span>:</span>
        <span className="minutes">{minutes}</span>
        <span>:</span>
        <span className="seconds">{seconds}</span>
      </div>

      <div className="time_text">
        <span className="days">DNI</span>
        <span className="hours">GODZINY</span>
        <span className="minutes">MINUT</span>
        <span className="seconds">SEKUND</span>
      </div>
    </>
  );
};
