import { Dispatch } from "react";
import { IAction } from "../../store/interfaces/IAction";

type IActionFunction = () => IAction<{}>;
type IHandlerModalWindow = (state: boolean) => void;

type ICloseModalWindow = (a: IActionFunction, b?: IHandlerModalWindow) => void;

export const closeModalWindow: ICloseModalWindow = (
    action,
    handleModalWindow
) => (dispatch: Dispatch<any>) => {

    dispatch(action());

    handleModalWindow
        &&
        handleModalWindow(false);
};