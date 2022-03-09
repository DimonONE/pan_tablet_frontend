import {
  IBooksInitialState,
  ICompetitionBookAction,
  IPageInfo,
} from "./interfaces";
import { booksActionsTypes } from "../../actions/books/interfaces";
import { IAction } from "../../interfaces/IAction";
import { IBook } from "../book/interfaces";

const initialState: IBooksInitialState = {
  loading: false,
  error: null,
  books: null,
  totalBooks: 0,
  totalPages: 0,
  currentPage: 0,
};

export const books = (
  state = initialState,
  action: IAction<IPageInfo | IBook[]>
): IBooksInitialState => {
  switch (action.type) {
    case booksActionsTypes.BOOKS_SEARCHING:
      return {
        ...state,
        loading: true,
      };
    case booksActionsTypes.BOOKS_GOT:
      const payload = action.payload as IPageInfo;
      return {
        ...state,
        loading: false,
        error: null,
        books: payload.content,
        totalPages: payload.totalPages,
        totalBooks: payload.totalElements,
        currentPage: payload.number,
      };
    case booksActionsTypes.BOOKS_GOT:
      const topBooks = action.payload as IPageInfo;
      return {
        ...state,
        loading: false,
        error: null,
        books: topBooks.content,
        totalPages: topBooks.totalPages,
        totalBooks: topBooks.totalElements,
        currentPage: topBooks.number,
      };
    case booksActionsTypes.BOOKS_FROM_FOLDER:
      return {
        ...state,
        loading: false,
        error: null,
        books: action.payload as IBook[],
      };
    case booksActionsTypes.COMPETITION_BOOKS_GOT:
      return {
        ...state,
        loading: false,
        error: null,
        books: action.payload as IBook[],
      };
    case booksActionsTypes.RANDOM_BOOKS_LOADED:
      const randonBooksPayload = action.payload as IPageInfo;

      return {
        ...state,
        loading: false,
        error: null,
        books: randonBooksPayload.content,
      };
    case booksActionsTypes.BOOKS_SEARCHING_FAILED:
      return {
        ...state,
        loading: false,
        error: "Error from back",
        books: null,
      };
    default:
      return state;
  }
};
