/** @format */


import { subcat } from "../../../shared/consts/categories";
import { categoriesActionsTypes } from "../../actions/categories/interfaces";
import { IAction } from "../../interfaces/IAction";
import { ICategoriesInitialState, ICategory } from "./interfaces";

const initialState: ICategoriesInitialState = {
  loading: true,
  error: null,
  categories: [],
};

export const categories = (
  state = initialState,
  action: IAction<ICategory[]>
): ICategoriesInitialState => {
  switch (action.type) {
    case categoriesActionsTypes.CATEGORIES_GOT:
      action.payload[action.payload.length - 1].categories.push(...subcat);

      const payload = action.payload.map((item: ICategory) => ({
        ...item,
        isOpened: true,
      }));

      return {
        ...state,
        error: null,
        loading: false,
        categories: payload,
      };
    case categoriesActionsTypes.CATEGORIES_FAILED:
      return {
        ...state,
        error: "Categories don't exist. Try to refresh the page",
        loading: false,
      };
    default:
      return state;
  }
};
