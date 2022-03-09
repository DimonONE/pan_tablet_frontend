import { IFolder } from "../book/interfaces";

export interface IFoldersInitialState {
    loading: boolean,
    loaded: boolean,
    error: boolean,
    folders: IFolder[]
}