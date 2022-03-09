import { Dispatch } from "react";
import { Axios } from "../../../shared/axios";
import { apiUrl } from "../../../shared/consts/url/apiUrl";
import { ICategory } from "../../reducers/categories/interfaces";
import { categoriesActionsTypes } from "./interfaces";

export const getWorkCategories = () => async (dispatch: Dispatch<any>) => {
  try {
    const res = await Axios({
      method: "GET",
      url: apiUrl.categoriesWorks,
    });

    dispatch(gotCategories(res.data.content));
  } catch (error) {}
};

const gotCategories = (categoriesData: ICategory[]) => {
  return {
    type: categoriesActionsTypes.CATEGORIES_GOT,
    payload: categoriesData,
  };
};
