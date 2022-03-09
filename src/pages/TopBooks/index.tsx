import "./TopBooks.scss";
import bgImg from "../../assets/images/slider_bg.png";
import bgImgRotated from "../../assets/images/slider_bg_rotated.png";
import { Navbar } from "../../components/Navbar";
import leftHero from "../../assets/images/left_hero_like.png";
import rightHero from "../../assets/images/right_hero_like.png";
import { useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "../../store/reducers";
import { Work } from "../../components/Work";
import { IBook } from "../../store/reducers/book/interfaces";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { getUrlParams } from "../../shared/features/getUrlParams";
import { getTopBooks } from "../../store/actions/books";
import { Pagination } from "../../components/Pagination";
import { If } from "../../components/If";

export const TopBooks = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { books, loading, error, totalPages } = useSelector(
    (state: IRootReducer) => state.books
  );

  const {
    user: { role },
  } = useSelector((state: IRootReducer) => state.signUp);

  useEffect(() => {
    const { currentPage, currCategory } = getUrlParams(location);
    history.push(
      `${location.pathname}?&page=${currentPage.replaceAll(" ", "+")}`
    );

    dispatch(getTopBooks(currentPage));
    window.scrollTo({ top: 0 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (error) {
    return <>{error}</>;
  }

  return (
    <div className="top__books">
      <Navbar />
      <If condition={loading}>
        <div className="loader">Trwa ładowanie prac...</div>
      </If>
      <div className="top_books container">
        <img src={bgImgRotated} alt="bg img" className="slider_bg" />
        <img src={bgImg} alt="bg img" className="slider_bg right" />

        <div className="header">TOP WSZECHCZASÓW</div>

        <div className="works_container">
          <div className="works">
            {books &&
              books.map((book: IBook) => (
                <Work key={book.id} userRole={role} book={book} isBook={true} />
              ))}
          </div>
        </div>
        <If condition={!!books?.length}>
          <img src={leftHero} alt="no left hero" className="left_hero" />
          <img src={rightHero} alt="no right hero" className="right_hero" />
        </If>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};
