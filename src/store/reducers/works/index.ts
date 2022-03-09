import { worksActionsType } from "../../actions/works/interfaces";
import { IAction } from "../../interfaces/IAction";
import { IWorksInfo, IWorksInitialState } from "./interfaces";

const initialState: IWorksInitialState = {
  worksLoading: false,
  loaded: false,
  failed: false,
  failMessage: "Error from back",
  works: [],
  totalWorks: 0,
  worksTotalPages: 0,
  currentWorksPage: 0,
};

export const works = (
  state = initialState,
  action: IAction<IWorksInfo>
): IWorksInitialState => {
  switch (action.type) {
    case worksActionsType.WORKS_LOADING:
      return {
        ...state,
        worksLoading: true,
      };
    case worksActionsType.WORKS_LOADED:
      return {
        ...state,
        worksLoading: false,
        loaded: true,
        failed: false,
        works: action.payload.content,
        worksTotalPages: action.payload.totalPages,
        totalWorks: action.payload.totalElements,
        currentWorksPage: action.payload.number,
      };
    case worksActionsType.WORKS_LOADING_FAILED:
      return {
        ...state,
        worksLoading: false,
        loaded: false,
        failed: true,
      };
    case worksActionsType.RESET_WORKS:
      return {
        ...state,
        works: [],
        totalWorks: 0,
        worksTotalPages: 0,
        currentWorksPage: 0,
      };
    default:
      return state;
  }
};
