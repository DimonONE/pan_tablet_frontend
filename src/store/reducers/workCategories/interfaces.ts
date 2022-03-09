/** @format */

export interface ICategoriesInitialState {
  loading: boolean;
  error: string | null;
  categories: ICategory[];
}

export interface ICategory {
  id: number;
  name: string;
  numberOfPictures: number;
  numberOfBooks: number;
  categories: ICategories[];
  isOpened: boolean;
  age?: number;
  sizeBook: number | null;
  sizeWork: number | null;
}

export interface ICategories {
  id: number;
  name: string;
  categorySection: number;
  age?: number;
  sizeBook: number | null;
  sizeWork: number | null;
}
