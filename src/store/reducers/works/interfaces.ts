import { IBook } from "../book/interfaces";
import { IComment } from "../comments/interface";

export interface IWorksInitialState {
  worksLoading: boolean;
  loaded: boolean;
  failed: boolean;
  failMessage: string;
  works: IWork[];
  totalWorks: number;
  worksTotalPages: number;
  currentWorksPage: number;
}

export interface IWorksInfo {
  content: IWork[];
  totalPages: number;
  totalElements: number;
  number: number;
}

export interface IWork {
  id: number;
  book: IBook;
  resourceLink?: string;
  uploadDate: number;
  views?: number;
  totalLikes?: number;
  school?: string;
  classroom?: string;
  title?: string;
  link?: string;
  linkTwo: string;
  linkThree: string;
  comments?: IComment[];
  description?: string;
}
