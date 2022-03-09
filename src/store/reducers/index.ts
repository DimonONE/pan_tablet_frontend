import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { ILoginInitialState } from "./login/interfaces";
import { login } from "./login";
import { IRegistrationInitialState } from "./registration/interfaces";
import { signUp } from "./registration";
import { competition } from "./competition";
import { ICompetitionInitialState } from "./competition/interfaces";
import { books } from "./books";
import { works } from "./works";
import { book } from "./book";
import { IBooksInitialState } from "./books/interfaces";
import { IBookInitialState } from "./book/interfaces";
import { ICommentsInitialState } from "./comments/interface";
import { comments } from "./comments";
import { ICategoriesInitialState } from "./categories/interfaces";
import { categories } from "./categories";
import { IWorksInitialState } from "./works/interfaces";
import { History } from "history";
import { IFoldersInitialState } from "./folders/interfaces";
import { folders } from "./folders";
import { IInitialStateBookLike } from "./bookLike/interfaces";
import { bookLike } from "./bookLike";

export interface IRootReducer {
  signUp: IRegistrationInitialState;
  login: ILoginInitialState;
  competition: ICompetitionInitialState;
  books: IBooksInitialState;
  book: IBookInitialState;
  comments: ICommentsInitialState;
  categories: ICategoriesInitialState;
  works: IWorksInitialState;
  folders: IFoldersInitialState;
  bookLike: IInitialStateBookLike;
}

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    signUp,
    login,
    competition,
    books,
    book,
    comments,
    categories,
    works,
    folders,
    bookLike,
  });
