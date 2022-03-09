import { Dispatch } from "react";
import { Axios } from "../../../shared/axios";
import { apiUrl } from "../../../shared/consts/url/apiUrl";
import { IFolder } from "../../reducers/book/interfaces";
import { booksFromFolders, booksGot, booksSearching } from "../books";
import { foldersActionTypes } from "./interfaces";

export const createFolder =
  (folderData: { name: string }) => async (dispatch: Dispatch<any>) => {
    try {
      await Axios({
        method: "POST",
        url: apiUrl.folders,
        data: folderData,
      });

      dispatch(getAllFolders());
    } catch (error) {}
  };

export const addBookToFolder =
  (
    folderID: number,
    setIsModalOpened: (state: boolean) => void,
    bookID?: number
  ) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(addingBook());

      await Axios({
        method: "POST",
        url: `${apiUrl.folders}/${folderID}/pictures/${bookID}`,
      });

      dispatch(addedBookToFolder());
      setIsModalOpened(false);
    } catch (error) {
      dispatch(addingBookToFolderFailed());
    }
  };

export const getAllFolders = () => async (dispatch: Dispatch<any>) => {
  try {
    const res = await Axios({
      method: "POST",
      url: apiUrl.allFolders,
      params: {
        page: "0,100",
      },
    });

    dispatch(foldersLoaded(res.data.content));
  } catch (error) {}
};

export const getBooksFromFolder =
  (folderID?: number) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(booksSearching());

      const res = await Axios({
        method: "GET",
        url: `${apiUrl.folders}/${folderID}/pictures`,
      });

      dispatch(booksFromFolders(res.data));
    } catch (error) {}
  };

const addingBookToFolderFailed = () => {
  return {
    type: foldersActionTypes.UPLOADING_BOOK_IN_FOLDER_FAILED,
    payload: {},
  };
};

export const addedBookToFolder = () => {
  return {
    type: foldersActionTypes.BOOK_IN_FOLDER_SUCCESS,
    payload: {},
  };
};

const foldersLoaded = (foldersData: IFolder[]) => {
  return {
    type: foldersActionTypes.ALL_FOLDERS_LOADED,
    payload: foldersData,
  };
};

const addingBook = () => {
  return {
    type: foldersActionTypes.UPLOADING_BOOK_IN_FOLDER,
    payload: {},
  };
};
