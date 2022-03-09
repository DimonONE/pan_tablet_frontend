/** @format */

import "./Works.scss";
import { Work } from "../Work";
import { useSelector } from "react-redux";
import { IRootReducer } from "../../store/reducers";
import { Pagination } from "../Pagination";
import { IBook } from "../../store/reducers/book/interfaces";
import { Route, useLocation } from "react-router-dom";
import { userRoutes } from "../../shared/consts/url/routes";
import { IWork } from "../../store/reducers/works/interfaces";
import { If } from "../If";
import { getUrlParams } from "../../shared/features/getUrlParams";

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

export const Works = () => {
  const { pathname, search } = useLocation();
  const location = useLocation();
  const { currentPage, params } = getUrlParams(location);

  const { worksLoading, works, totalWorks, worksTotalPages } = useSelector(
    (state: IRootReducer) => state.works
  );

  const { loading, books, totalBooks, totalPages } = useSelector(
    (state: IRootReducer) => state.books
  );

  const {
    user: { role },
  } = useSelector((state: IRootReducer) => state.signUp);

  if (pathname === userRoutes.works) {
    pagesData.content = works;
    pagesData.totalElements = totalWorks;
    pagesData.totalPages = worksTotalPages;
  } else if (pathname === userRoutes.mainPage && works === null) {
    pagesData.content = books;
    pagesData.totalElements = totalBooks;
    pagesData.totalPages = totalPages;
  } else {
    pagesData.content = books;
    pagesData.totalElements = totalBooks + totalWorks;
    pagesData.totalPages = totalPages + worksTotalPages;
  }

  return (
    <div className="works_container">
      <div className="works">
        <div className="header">
          <div className="works_quantity">
            <Route exact path={userRoutes.works}>
              Liczba prac:
            </Route>
            <Route exact path={userRoutes.mainPage}>
              Liczba ksiąg:
            </Route>
            <span> {pagesData.totalElements}</span>
          </div>

          <Pagination totalPages={pagesData.totalPages} />
        </div>

        <If condition={loading || worksLoading}>
          <div className="loader">Trwa ładowanie prac...</div>
        </If>

        <Route exact path={userRoutes.mainPage}>
          {books &&
            books?.map((book: IBook, i: number) => (
              <Work
                key={book.id.toString()}
                userRole={role}
                book={book}
                index={i}
                isBook={true}
              />
            ))}

          {works &&
            works.map((work: IWork) => (
              <Work
                key={work.id.toString()}
                userRole={role}
                book={work}
                isBook={false}
              />
            ))}
        </Route>

        <Route exact path={userRoutes.works}>
          <If condition={!!works.length}>
            {works?.map((work: IWork) => (
              <Work
                key={work.id.toString()}
                userRole={role}
                book={work}
                isBook={false}
              />
            ))}
          </If>
        </Route>
      </div>

      <Pagination totalPages={pagesData.totalPages} />
    </div>
  );
};
