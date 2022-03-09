import { Dispatch } from "react";
import { Axios } from "../../../shared/axios";
import { apiUrl } from "../../../shared/consts/url/apiUrl";
import { IBook } from "../../reducers/book/interfaces";
import { bookActionsTypes } from "./interfaces";

export const getBook =
  (bookId: number | string | null) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(loading());

      const response = await Axios({
        method: "GET",
        url: `${apiUrl.book}${bookId}`,
      });

      seenBook(bookId);
      dispatch(bookLoaded(response.data));
    } catch (error) {
      dispatch(loadingFailed());
    }
  };

export const getWork =
  (bookId: number | string | null) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(loading());

      const response = await Axios({
        method: "GET",
        url: `${apiUrl.works}/${bookId}`,
      });

      seenWork(bookId);
      dispatch(bookLoaded(response.data));
    } catch (error) {
      dispatch(loadingFailed());
    }
  };

export const getNextPrevIds =
  (bookId: number | string | null) => async (dispatch: Dispatch<any>) => {
    try {
      const response = await Axios({
        method: "POST",
        url: `${apiUrl.nextPrevBook}${bookId}`,
      });

      dispatch(idsLoaded(response.data));
    } catch (error) {}
  };

const seenBook = async (bookId: number | string | null) => {
  try {
    await Axios({
      method: "POST",
      url: `${apiUrl.books}/${bookId}/view`,
    });
  } catch (error) {}
};

const seenWork = async (bookId: number | string | null) => {
  try {
    await Axios({
      method: "POST",
      url: `${apiUrl.works}/${bookId}/view`,
    });
  } catch (error) {}
};

const loading = () => {
  return {
    type: bookActionsTypes.LOADING_BOOK,
    payload: {},
  };
};

const bookLoaded = (bookData: IBook[]) => {
  return {
    type: bookActionsTypes.LOADED_BOOK,
    payload: bookData,
  };
};

const loadingFailed = () => {
  return {
    type: bookActionsTypes.LOADING_BOOK_FAILED,
    payload: {},
  };
};

const idsLoaded = (idData: number[]) => {
  return {
    type: bookActionsTypes.LOADED_IDS,
    payload: idData,
  };
};
