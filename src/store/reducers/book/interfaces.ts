import { IComment } from "../comments/interface";

export interface IBookInitialState {
  loading: boolean;
  loaded: boolean;
  error: any;
  book: IBook[];
  transitionIds: number[];
}

export interface IBook {
  title?: string;
  id: number;
  book: IBook;
  resourceLink?: string;
  link?: string;
  linkTwo: string;
  linkThree: string;
  uploadDate: number;
  views?: number;
  totalLikes?: number;
  classroom?: string;
  school?: string;
  description?: string;
  history?: string;
  id_animator?: IAnimator;
  comments?: IComment[];
  pictureCategory?: string;
  folder: IFolder[] | null;

  leftNameAuthor?: string;
  leftImageResourceLink?: string;
  leftImageThumbnailLink?: string;
  rightNameAuthor?: string;
  rightImageResourceLink?: string;
  rightImageThumbnailLink?: string;
}

interface IAnimator {
  resource_link_animator?: string;
  name: string;
  surname: string;
}

export interface IFolder {
  name: string;
  id: number;
}
