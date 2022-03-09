import { IAction } from "../../interfaces/IAction";
import { commentsActionsType } from "../../actions/comments/interfaces";
import { IComment, ICommentsInitialState } from "./interface";

const initialState: ICommentsInitialState = {
  loading: false,
  loaded: false,
  bookComments: [],
  errorStatus: false,
  errorMessage: "",
};

export const comments = (
  state = initialState,
  action: IAction<IComment[]>
): ICommentsInitialState => {
  switch (action.type) {
    case commentsActionsType.COMMENTS_LOADING:
      return {
        ...state,
        loading: true,
        errorStatus: false,
        errorMessage: "",
      };
    case commentsActionsType.COMMENTS_LOADED:
      return {
        ...state,
        loading: false,
        loaded: true,
        errorStatus: false,
        errorMessage: "",
        bookComments: action.payload,
      };

    case commentsActionsType.WORK_COMMENTS:
      return {
        ...state,
        loading: false,
        loaded: true,
        errorStatus: false,
        errorMessage: "",
        bookComments: action.payload,
      };
    case commentsActionsType.COMMENTS_LOADING_FAILED:
      return {
        ...state,
        loading: false,
        loaded: false,
        errorStatus: true,
        errorMessage: "Try again for loading comments",
        bookComments: [],
      };
    default:
      return state;
  }
};
