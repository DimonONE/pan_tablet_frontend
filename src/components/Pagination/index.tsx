import "./Pagination.scss";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { IRootReducer } from "../../store/reducers";
import { FC } from "react";
import { getUrlParams } from "../../shared/features/getUrlParams";
import { useHistory, useLocation } from "react-router";
import { userRoutes } from "../../shared/consts/url/routes";

export const Pagination: FC<{ totalPages: number }> = ({ totalPages }) => {
  const { currentPage } = useSelector((state: IRootReducer) => state.books);

  const { currentWorksPage } = useSelector(
    (state: IRootReducer) => state.works
  );

  const history = useHistory();
  const location = useLocation();

  const currPage =
    location.pathname === userRoutes.works ? currentWorksPage : currentPage;

  const handlePage = ({ selected }: any) => {
    if (currPage === selected) {
      return;
    }
    const { currCategory } = getUrlParams(location);

    history.push(
      `${
        location.pathname
      }?page=${selected},15&search=${currCategory.replaceAll(" ", "+")}`
    );
  };

  return (
    <ReactPaginate
      initialPage={+currPage}
      forcePage={+currPage}
      previousLabel={"«"}
      nextLabel={"»"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={totalPages}
      marginPagesDisplayed={3}
      pageRangeDisplayed={3}
      onPageChange={handlePage} // works in first render
      containerClassName={"pages"}
      activeClassName={"active"}
    />
  );
};
