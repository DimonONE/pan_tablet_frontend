import { Location } from "history";

export const getUrlParams = (location: Location) => {
  const currCategory = new URLSearchParams(location.search).get("search") || "";
  const currentPage =
    new URLSearchParams(location.search).get("page") || "0,15";
  const params: string = `search=${currCategory}`;

  return {
    currCategory,
    currentPage,
    params,
    pathname: location.pathname,
  };
};

export interface IUrlParams {
  currCategory: string;
  currentPage: string;
  params: string;
  pathname: string;
}
