import "./CompetitionDate.scss";
import contestImg from "../../assets/images/competition.png";
import { Timer } from "../Timer";
import cupImg from "../../assets/images/cup.png";
import { useDispatch, useSelector } from "react-redux";
import { competitionInfo } from "../../store/actions/competitions";
import { IRootReducer } from "../../store/reducers";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { userRoutes } from "../../shared/consts/url/routes";
import { getUrlParams } from "../../shared/features/getUrlParams";

export const CompetitionDate = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(competitionInfo());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultCategory = "Animacje plastelinowe";

  const location = useLocation();
  const { currCategory } = getUrlParams(location);
  const params = currCategory.split("=");

  return (
    <div className="competition_container container">
      <div className="competition_section">
        <div className="content">
          <div className="competition_img">
            <img src={contestImg} alt="No Competition" />

            <Link
              to={`${userRoutes.winners}?search=${(
                params[1] || defaultCategory
              ).replaceAll(" ", "+")}`}
            >
              Sprawdź
            </Link>
          </div>

          <div className="timer_container">
            <div className="remaining">Pozostało do końca:</div>

            <Timer />
          </div>
        </div>

        <div className="rating">
          <div className="cup_img">
            <img src={cupImg} alt="No Cup" />
          </div>

          <div className="join_rating">
            <div>Zobacz top wszechczasów</div>
            <Link to={`${userRoutes.competition}`}>Dołącz do nich!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
