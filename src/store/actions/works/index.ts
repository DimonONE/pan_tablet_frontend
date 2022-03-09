import { Dispatch } from "react";
import { IApplicationField } from "../../../components/AddWork";
import { Axios } from "../../../shared/axios";
import { apiUrl } from "../../../shared/consts/url/apiUrl";
import { IUrlParams } from "../../../shared/features/getUrlParams";
import { IComment } from "../../reducers/comments/interface";
import { IWorksInfo } from "../../reducers/works/interfaces";
import { getWorkLikes } from "../bookLike";
import { commentsActionsType } from "../comments/interfaces";
import { IWorkCommentData, worksActionsType } from "./interfaces";

export const applyForAddingWork =
  (applicationData: IApplicationField) => async (dispatch: Dispatch<any>) => {
    try {
      await Axios({
        method: "GET",
        url: apiUrl.application,
        params: {
          email: applicationData.email,
          phone: applicationData.phone,
        },
      });
    } catch (error) {}
  };

export const addCommentToWork =
  (
    workId: string | number | null,
    commentData: IWorkCommentData,
    { currentPage, params }: IUrlParams
  ) =>
  async (dispatch: Dispatch<any>) => {
    try {
      await Axios({
        method: "POST",
        url: `${apiUrl.works}/${workId}/comments`,
        data: commentData,
      });

      dispatch(getCommentsByWorkId(workId));
    } catch (error) {}
  };

export const getCommentsByWorkId =
  (workId: string | number | null) => async (dispatch: Dispatch<any>) => {
    try {
      const res = await Axios({
        method: "GET",
        url: `/pictures/${workId}/comments`,
      });

      dispatch(getCommentsSuccess(res.data.content));
    } catch (error) {}
  };

export const getCommentsSuccess = (comments?: IComment[]) => {
  return {
    type: commentsActionsType.WORK_COMMENTS,
    payload: comments,
  };
};

export const getWorks =
  (selectedPage: number | string, params: string) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(worksLoading());

      const res = await Axios({
        method: "GET",
        url: `${apiUrl.works}?page=${selectedPage}&${params}`,
      });

      dispatch(worksLoaded(res.data));
    } catch (error) {
      dispatch(worksLoadingFailed());
    }
  };

const setWorkLike =
  (bookId: number | string, urlParams: IUrlParams, isLiked: boolean) =>
  async (dispatch: Dispatch<any>) => {
    try {
      if (isLiked) {
        await Axios({
          method: "DELETE",
          url: `/pictures/${bookId}${apiUrl.bookLike}`,
        });
      } else {
        await Axios({
          method: "POST",
          url: `/pictures/${bookId}${apiUrl.bookLike}`,
        });
      }

      // dispatch(getWorks(urlParams.currentPage, urlParams.params));
      dispatch(getWorkLikes(bookId));
    } catch (error) {}
  };

export const isWorkLiked =
  (workId: number | string, urlParams: IUrlParams) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const res = await Axios({
        method: "GET",
        url: `/pictures/${workId}${apiUrl.checkLike}`,
      });

      dispatch(setWorkLike(workId, urlParams, res.data.value));
    } catch (error) {}
  };

const worksLoading = () => {
  return {
    type: worksActionsType.WORKS_LOADING,
    payload: {},
  };
};
export const resetWorks = () => {
  return {
    type: worksActionsType.RESET_WORKS,
    payload: {},
  };
};

const worksLoaded = (works: IWorksInfo) => {
  return {
    type: worksActionsType.WORKS_LOADED,
    payload: works,
  };
};

const worksLoadingFailed = () => {
  return {
    type: worksActionsType.WORKS_LOADING_FAILED,
    payload: {},
  };
};
