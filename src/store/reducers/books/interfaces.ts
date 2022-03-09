import { IBook } from "../book/interfaces";

export interface IBooksInitialState {
  loading: boolean;
  error: any;
  books: IBook[] | null;
  totalBooks: number;
  totalPages: number;
  currentPage: number;
}

export interface IPageInfo {
  content: IBook[];
  totalPages: number;
  totalElements: number;
  number: number;
}

export interface ICompetitionBookAction {
  loading: boolean;
  error: any;
  books: IBook[];
}
