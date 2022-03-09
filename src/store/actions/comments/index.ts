import { Dispatch } from "react";
import { Axios } from "../../../shared/axios";
import { apiUrl } from "../../../shared/consts/url/apiUrl";
import { IComment } from "../../reducers/comments/interface";
import { commentsActionsType, ICommentData } from "./interfaces";

export const addCommentToBook = (
    bookId: string | number | null,
    commentData: ICommentData
) => async (dispatch: Dispatch<any>) => {

    try {
        await Axios({
            method: "POST",
            url: `${apiUrl.books}/${bookId}/comments`,
            data: commentData,
        });

        dispatch(getCommentsByBookId(bookId));

    } catch (error) {

    }
};

export const getCommentsByBookId = (
    bookId: string | number | null
) => async (dispatch: Dispatch<any>) => {

    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl.books}/${bookId}/comments`
        });

        dispatch(getCommentsSuccess(res.data.content));

    } catch (error) {

    }
};

export const getCommentsSuccess = (comments?: IComment[]) => {
    return {
        type: commentsActionsType.COMMENTS_LOADED,
        payload: comments
    };
};