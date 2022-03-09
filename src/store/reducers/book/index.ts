import { IBook, IBookInitialState } from "./interfaces";
import { bookActionsTypes } from "../../actions/book/interfaces";
import { IAction } from "../../interfaces/IAction";

const initialState: IBookInitialState = {
  loading: true,
  loaded: false,
  error: null,
  book: [],
  transitionIds: [],
};

export const book = (
  state = initialState,
  action: IAction<IBook[] | number[]>
): IBookInitialState => {
  switch (action.type) {
    case bookActionsTypes.LOADING_BOOK:
      return {
        ...state,
        loading: true,
        error: null,
        loaded: false,
      };
    case bookActionsTypes.LOADED_BOOK:
      return {
        ...state,
        loaded: true,
        loading: false,
        error: null,
        book: action.payload as IBook[],
      };
    case bookActionsTypes.LOADED_IDS:
      return {
        ...state,
        loaded: true,
        loading: false,
        error: null,
        transitionIds: action.payload as number[],
      };
    case bookActionsTypes.LOADING_BOOK_FAILED:
      return {
        ...state,
        loading: false,
        error: "Something went wrong. Please, try again.",
        loaded: false,
      };
    default:
      return state;
  }
};
