import "./Competition.scss";
import "../../components/Works/Works.scss";
import bgImg from "../../assets/images/slider_bg.png";
import bgImgRotated from "../../assets/images/slider_bg_rotated.png";
import { Navbar } from "../../components/Navbar";
import { IBook } from "../../store/reducers/book/interfaces";
import { IRootReducer } from "../../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import leftHero from "../../assets/images/left_hero_like.png";
import rightHero from "../../assets/images/right_hero_like.png";
import { useEffect } from "react";
import { getCompetitionBooks } from "../../store/actions/books";
import { competitionInfo } from "../../store/actions/competitions";
import { useHistory, useLocation } from "react-router";
import { getUrlParams } from "../../shared/features/getUrlParams";
import { If } from "../../components/If";
import { Timer } from "../../components/Timer";
import contestImg from "../../assets/images/competition.png";
import docReg from "../../assets/docs/Regulamin (konkurs kreatywny).pdf";
import { CompetitionBooks } from "../../components/CompetitionBooks";
import { Pagination } from "../../components/Pagination";
import { IWork } from "../../store/reducers/works/interfaces";

export const Competition = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentPage } = getUrlParams(location);

  const { competition } = useSelector(
    (state: IRootReducer) => state.competition
  );

  const {
    user: { role },
  } = useSelector((state: IRootReducer) => state.signUp);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    history.push(
      `${location.pathname}?&page=${currentPage.replaceAll(" ", "+")}`
    );

    dispatch(getCompetitionBooks(currentPage));
    dispatch(competitionInfo());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  const { books, error } = useSelector((state: IRootReducer) => state.books);

  interface IPagesData {
    totalElements: number;
    totalPages: number;
    content: IWork[] | IBook[] | null;
  }

  const pagesData: IPagesData = {
    totalElements: 0,
    totalPages: 0,
    content: [],
  };

  pagesData.content = books;

  if (error) {
    return <>{error}</>;
  }

  return (
    <div className="competiton_page">
      <Navbar />
      <div className="winners container">
        <img src={bgImgRotated} alt="bg img" className="slider_bg" />
        <img src={bgImg} alt="bg img" className="slider_bg right" />

        <div className="awards_info">
          <div className="header">NAGRODY</div>

          <div className="awards">
            {competition?.rewards.map((item, index) => (
              <div className="award">
                <div className="place">
                  {item.place === 1
                    ? "I"
                    : item.place === 2
                    ? "II"
                    : item.place === 3
                    ? "III"
                    : ""}{" "}
                  miejsce
                </div>
                <div className="img_container">
                  <If condition={!!competition?.rewards[index]?.pictureUrl}>
                    <img
                      src={"https://api.pan-tablet.pl" + item.pictureUrl}
                      alt="no award"
                    />
                  </If>
                </div>
              </div>
            ))}
          </div>

          <div className="awards-bottom-part">
            <div className="competition_img">
              <img src={contestImg} alt="No Competition" />

              <button onClick={() => window.open(docReg, "")}>
                Regulamin konkursu
              </button>
            </div>
            <div className="timer_container">
              <div className="remaining">Pozostało do końca:</div>

              <Timer />
            </div>
          </div>
        </div>

        <div className="works_container">
          <div className="works">
            <If
              condition={
                books !== null && books?.length > 0 && competition != null
              }
            >
              <h1 className="competition_title">Aktualne Wyniki</h1>
            </If>

            {competition != null &&
              books?.map((book: IBook, index) => (
                <div className="winner_books">
                  <span className="number">{index + 1}.</span>
                  <CompetitionBooks
                    key={book.id}
                    userRole={role}
                    book={book}
                    rewardIndex={index}
                  />
                </div>
              ))}
          </div>
        </div>
        <If condition={books !== null && books?.length > 0}>
          <img src={leftHero} alt="no left hero" className="left_hero" />
          <img src={rightHero} alt="no right hero" className="right_hero" />
        </If>
        <div className="competition_pagination">
          <If condition={competition != null}>
            <Pagination totalPages={pagesData.totalPages} />
          </If>
        </div>
      </div>
    </div>
  );
};
