import { Dispatch } from "react";
import { Axios } from "../../../shared/axios";
import { apiUrl } from "../../../shared/consts/url/apiUrl";
import { IBook } from "../../reducers/book/interfaces";
import { booksActionsTypes } from "./interfaces";

export const getRandomBooks = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(booksSearching());

    const response = await Axios({
      method: "GET",
      url: apiUrl.randomBooks,
    });

    dispatch(randomBooksLoaded(response.data));
  } catch (error) {
    dispatch(booksSearchingFailed());
  }
};

export const getBooks =
  (selectedPage: number | string, params: string) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(booksSearching());

      const response = await Axios({
        method: "GET",
        url: `${apiUrl.books}?page=${selectedPage}&${params}`,
      });

      dispatch(booksGot(response.data));
    } catch (error) {
      dispatch(booksSearchingFailed());
    }
  };

export const getTopBooks =
  (selectedPage: number | string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(booksSearching());

      const response = await Axios({
        method: "GET",
        url: `${apiUrl.topBooks}page=${selectedPage}`,
      });

      dispatch(booksGot(response.data));
    } catch (error) {
      dispatch(booksSearchingFailed());
    }
  };

export const getCompetitionBooks =
  (page: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(booksSearching());

      const response = await Axios({
        method: "GET",
        url: `${apiUrl.competitionBooks}`,
        params: {
          page: page.replaceAll("+", " "),
        },
      });

      dispatch(competitionBooksGot(response.data));
    } catch (error) {
      dispatch(booksSearchingFailed());
    }
  };

const randomBooksLoaded = (booksData: IBook[]) => {
  return {
    type: booksActionsTypes.RANDOM_BOOKS_LOADED,
    payload: { content: booksData },
  };
};

const competitionBooksGot = (payload: any) => {
  return {
    type: booksActionsTypes.COMPETITION_BOOKS_GOT,
    payload: payload,
  };
};

export const booksSearching = () => {
  return {
    type: booksActionsTypes.BOOKS_SEARCHING,
    payload: {},
  };
};

export const booksGot = (booksData: IBook[]) => {
  return {
    type: booksActionsTypes.BOOKS_GOT,
    payload: booksData,
  };
};

export const topBooksGot = (booksData: IBook[]) => {
  return {
    type: booksActionsTypes.TOP_BOOKS_GOT,
    payload: booksData,
  };
};

export const booksFromFolders = (payload: any) => {
  return {
    type: booksActionsTypes.BOOKS_FROM_FOLDER,
    payload: payload,
  };
};

export const booksSearchingFailed = () => {
  return {
    type: booksActionsTypes.BOOKS_SEARCHING_FAILED,
    payload: {},
  };
};
