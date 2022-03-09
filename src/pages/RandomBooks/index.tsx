import { Navbar } from "../../components/Navbar";
import "./RandomBook.scss";
import bgImg from "../../assets/images/slider_bg.png";
import bgImgRotated from "../../assets/images/slider_bg_rotated.png";
import leftHero from "../../assets/images/left_hero_like.png";
import rightHero from "../../assets/images/right_hero_like.png";
import { IBook } from "../../store/reducers/book/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "../../store/reducers";
import { Work } from "../../components/Work";
import { useEffect } from "react";
import { getRandomBooks } from "../../store/actions/books";
import { If } from "../../components/If";
import { BookSlider } from "../BookSlider";
import { useHistory } from "react-router";
import { userRoutes } from "../../shared/consts/url/routes";
import { getNextPrevIds } from "../../store/actions/book";

export const RandomBooks = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    user: { role },
  } = useSelector((state: IRootReducer) => state.signUp);

  const { books, loading, error } = useSelector(
    (state: IRootReducer) => state.books
  );

  const { transitionIds } = useSelector((state: IRootReducer) => state.book);

  useEffect(() => {
    dispatch(getNextPrevIds(-1));
    window.scrollTo({ top: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (transitionIds.length > 0) {
      history.push(`${userRoutes.randomBook}?bookId=${transitionIds[0]}`);
    }
  }, [transitionIds]);

  if (error) {
    return <>{error}</>;
  }

  return (
    <>
      <Navbar />
      <If condition={loading}>
        <div className="loader">Trwa ładowanie prac...</div>
      </If>
      <div className="top_books container">
        <img src={bgImgRotated} alt="bg img" className="slider_bg" />
        <img src={bgImg} alt="bg img" className="slider_bg right" />

        <div className="works_container">
          <div className="works"></div>
        </div>
        <img src={leftHero} alt="no left hero" className="left_hero" />
        <img src={rightHero} alt="no right hero" className="right_hero" />
      </div>
    </>
  );
};
