import "./MainPage.scss";
import { AddPortfolio } from "../../components/AddPortfolio";
import { Categories } from "../../components/Categories";
import { CompetitionDate } from "../../components/CompetitionDate";
import { Header } from "../../components/Header";
import { Works } from "../../components/Works";
import { Footer } from "../../components/Footer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { userRoutes } from "../../shared/consts/url/routes";
import { getBooks } from "../../store/actions/books";
import { getCategories } from "../../store/actions/categories";
import { getUrlParams } from "../../shared/features/getUrlParams";
import { getWorks, resetWorks } from "../../store/actions/works";
import { PopupCookie } from "../../components/PopupCookie";
import { If } from "../../components/If";
import { AcceptCookieContent } from "../../components/AcceptCookieContent";
import { getCookieData } from "../../shared/cookieData";
import { getUserData } from "../../store/actions/registration";
import { getWorkCategories } from "../../store/actions/workCategories";

export const MainPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isPopupCookieOpened, setIsPopupCookieOpened] = useState(true);
  const [isCookieInfoOpened, setIsCookieInfoOpened] = useState(false);
  const isAcceptedCookie = getCookieData() === null;

  useEffect(() => {
    const { currentPage, params } = getUrlParams(location);

    if (location.pathname === userRoutes.mainPage) {
      dispatch(getCategories());
    } else if (location.pathname === userRoutes.works) {
      dispatch(getWorkCategories());
    }

    dispatch(getUserData());

    if (location.pathname === userRoutes.mainPage) {
      dispatch(getBooks(currentPage, params));
      dispatch(resetWorks());
      return;
    }
    dispatch(getWorks(currentPage, params));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="main_page_container">
      <If condition={isPopupCookieOpened && isAcceptedCookie}>
        <PopupCookie
          setIsPopupCookieOpened={setIsPopupCookieOpened}
          setIsCookieInfoOpened={setIsCookieInfoOpened}
        />
      </If>

      <If condition={isCookieInfoOpened}>
        <AcceptCookieContent setIsCookieInfoOpened={setIsCookieInfoOpened} />
      </If>

      <Header />
      <AddPortfolio />

      <CompetitionDate />

      <div className="main_content container">
        <Categories />
        <Works />
      </div>

      <CompetitionDate />
      <Footer />
    </div>
  );
};
