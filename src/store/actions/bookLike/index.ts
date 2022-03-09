import { Dispatch } from "react";
import { Axios } from "../../../shared/axios";
import { apiUrl } from "../../../shared/consts/url/apiUrl";
import { userRoutes } from "../../../shared/consts/url/routes";
import { IUrlParams } from "../../../shared/features/getUrlParams";
import { getBook } from "../book";

import {
  getBooks,
  getCompetitionBooks,
  getRandomBooks,
  getTopBooks,
} from "../books";
import { getBooksFromFolder } from "../folders";
import { bookLikeActionsType } from "./interfaces";

export const handleLikes =
  (
    bookId: number | string,
    urlParams: IUrlParams,
    isLiked: boolean,
    folderID?: number
  ) =>
  async (dispatch: Dispatch<any>) => {
    try {
      if (isLiked) {
        await Axios({
          method: "DELETE",
          url: `/books/${bookId}${apiUrl.bookLike}`,
        });
      } else {
        await Axios({
          method: "POST",
          url: `/books/${bookId}${apiUrl.bookLike}`,
        });
      }

      if (urlParams.pathname === userRoutes.mainPage) {
        dispatch(getBooks(urlParams.currentPage, urlParams.params));
        return;
      }

      if (urlParams.pathname === userRoutes.winners) {
        dispatch(getCompetitionBooks(urlParams.currentPage));
        return;
      }

      if (urlParams.pathname === userRoutes.competition) {
        dispatch(getTopBooks(urlParams.currentPage));
        return;
      }

      if (urlParams.pathname === userRoutes.randomBooks) {
        dispatch(getRandomBooks());
        dispatch(getLikes(bookId));
        // dispatch(getBook(bookId));
        return;
      }

      if (urlParams.pathname === userRoutes.randomBook) {
        // dispatch(getRandomBooks());
        dispatch(getLikes(bookId));
        return;
      }

      if (urlParams.pathname === userRoutes.folders) {
        dispatch(getBooksFromFolder(folderID));
        return;
      }

      if (urlParams.pathname === userRoutes.book) {
        dispatch(getLikes(bookId));
      }

      if (urlParams.pathname === userRoutes.works) {
        dispatch(getWorkLikes(bookId));
      }
    } catch (error: any) {
      console.log(error.response);
    }
  };

export const isBookLiked =
  (bookId: number | string, urlParams: IUrlParams, folderID?: number) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const res = await Axios({
        method: "GET",
        url: `/books/${bookId}${apiUrl.checkLike}`,
      });

      dispatch(handleLikes(bookId, urlParams, res.data.value, folderID));
    } catch (error) {}
  };

export const getLikes =
  (bookId: number | string | null) => async (dispatch: Dispatch<any>) => {
    try {
      const response = await Axios({
        method: "GET",
        url: `/books/${bookId}/likes`,
      });
      const totalLikes = response.data.totalElements;

      dispatch(likesLoaded(totalLikes));
    } catch (error) {}
  };

const likesLoaded = (likesQuantity: number) => {
  return {
    type: bookLikeActionsType.BOOK_LIKES_LOADED,
    payload: likesQuantity,
  };
};

export const getWorkLikes =
  (workId: number | string | null) => async (dispatch: Dispatch<any>) => {
    try {
      const response = await Axios({
        method: "GET",
        url: `/pictures/${workId}/likes`,
      });
      const totalLikes = response.data.totalElements;

      dispatch(workLikesLoaded(totalLikes));
    } catch (error) {}
  };

const workLikesLoaded = (likesQuantity: number) => {
  return {
    type: bookLikeActionsType.BOOK_LIKES_LOADED,
    payload: likesQuantity,
  };
};
