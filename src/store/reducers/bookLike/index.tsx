import { bookLikeActionsType } from "../../actions/bookLike/interfaces";
import { IAction } from "../../interfaces/IAction";
import { IInitialStateBookLike } from "./interfaces";

const initialState: IInitialStateBookLike = {
  likesQuantity: null,
};

export const bookLike = (
  state = initialState,
  action: IAction<number>
): IInitialStateBookLike => {
  switch (action.type) {
    case bookLikeActionsType.BOOK_LIKES_LOADED:
      return {
        ...state,
        likesQuantity: action.payload,
      };
    case bookLikeActionsType.WORK_LIKES_LOADED:
      return {
        ...state,
        likesQuantity: action.payload,
      };
    default:
      return state;
  }
};
