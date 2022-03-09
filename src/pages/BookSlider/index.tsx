/* eslint-disable react-hooks/exhaustive-deps */

import { Splide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "./BookSlider.scss";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { BookInfoCard } from "../../components/BookInfoCard";
import bgImg from "../../assets/images/slider_bg.png";
import bgImgRotated from "../../assets/images/slider_bg_rotated.png";
import leftHero from "../../assets/images/left_hero_like.png";
import rightHero from "../../assets/images/right_hero_like.png";
import { RenderWorks } from "../../components/BookSlider/RenderWorks";
import { Route, useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "../../store/reducers";
import { getBook, getNextPrevIds } from "../../store/actions/book";
import { getCommentsByBookId } from "../../store/actions/comments";
import { getUserData } from "../../store/actions/registration";
import {
  checkSliderPosition,
  useCheckSliderPosition,
} from "../../shared/hooks/useCheckSliderPosition";
import {
  mainSlider,
  secondarySlider,
} from "../../components/BookSlider/options";
import previous_icon from "../../assets/images/Previous.svg";
import next_icon from "../../assets/images/NextFixed.svg";
import { userRoutes } from "../../shared/consts/url/routes";

export const BookSlider: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { book } = useSelector((state: IRootReducer) => state.book);
  const { search } = useLocation();
  const bookId: string | null = new URLSearchParams(search).get("bookId");
  const { transitionIds } = useSelector((state: IRootReducer) => state.book);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(getBook(bookId));
    dispatch(getCommentsByBookId(bookId));
    dispatch(getUserData());
    dispatch(getNextPrevIds(bookId));
    window.scrollTo({ top: 0 });
  }, [bookId, dispatch]);

  useEffect(() => {
    setIndex(transitionIds.lastIndexOf(Number(bookId)));
  }, []);

  const openBook = (imgClickLocation: string) => {
    if (imgClickLocation === "next" && index < transitionIds.length) {
      setIndex(index + 1);
      history.push(
        `${userRoutes.randomBook}?bookId=${transitionIds[index + 1]}`
      );
    }

    if (imgClickLocation === "prev" && index > 0) {
      setIndex(index - 1);
      history.push(
        `${userRoutes.randomBook}?bookId=${transitionIds[index - 1]}`
      );
    }
  };

  const mainSliderRef = useRef<any>(Fragment);
  const secondarySliderRef = useRef<any>(Fragment);

  useCheckSliderPosition(mainSliderRef, secondarySliderRef);

  return (
    <>
      <Navbar />
      <div className="slider container">
        <img src={bgImgRotated} alt="bg img" className="slider_bg" />
        <img src={bgImg} alt="bg img" className="slider_bg right" />

        <div className="main_slider">
          <Route exact path={userRoutes.randomBook}>
            <img
              src={previous_icon}
              alt="prev"
              onClick={() => openBook("prev")}
              className={
                index === 0 || transitionIds.length <= 1
                  ? "first-or-last-book"
                  : "prev-icon"
              }
            />
          </Route>

          <Splide
            onMoved={() => checkSliderPosition(mainSliderRef)}
            ref={mainSliderRef}
            options={mainSlider}
          >
            <RenderWorks books={book} />
          </Splide>

          <BookInfoCard book={book[0]} />
          <Route exact path={userRoutes.randomBook}>
            <img
              src={next_icon}
              alt="next"
              className={"next-icon"}
              onClick={() => openBook("next")}
            ></img>
          </Route>
        </div>

        <div className="preview">
          <img src={leftHero} alt="no left hero" className="left_hero" />

          <Splide on ref={secondarySliderRef} options={secondarySlider}>
            <RenderWorks books={book} />
          </Splide>

          <img src={rightHero} alt="no right hero" className="right_hero" />
        </div>

        <img src={bgImg} alt="bg img" className="slider_bg bottom" />
      </div>
    </>
  );
};
