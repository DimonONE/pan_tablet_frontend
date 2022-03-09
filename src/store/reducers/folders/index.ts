import { foldersActionTypes } from "../../actions/folders/interfaces";
import { IAction } from "../../interfaces/IAction";
import { IFolder } from "../book/interfaces";
import { IFoldersInitialState } from "./interfaces";

const initialState: IFoldersInitialState = {
    loading: false,
    loaded: false,
    error: false,
    folders: []
};

export const folders = (
    state = initialState,
    action: IAction<IFolder[]>
): IFoldersInitialState => {

    switch (action.type) {
        case foldersActionTypes.UPLOADING_BOOK_IN_FOLDER:
            return {
                ...state,
                loading: true,
            };
        case foldersActionTypes.BOOK_IN_FOLDER_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
            };
        case foldersActionTypes.ALL_FOLDERS_LOADING:
            return {
                ...state,
                loading: true,
            };
        case foldersActionTypes.ALL_FOLDERS_LOADED:
            return {
                ...state,
                loading: false,
                error: false,
                folders: action.payload,
            };
        case foldersActionTypes.UPLOADING_BOOK_IN_FOLDER_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};