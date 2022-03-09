import { IAction } from "../../interfaces/IAction";
import { ILoginInitialState } from "./interfaces";
import { loginType } from "../../actions/login/interfaces";
import { IUserData } from "../../actions/registration/interfaces";

const initialState: ILoginInitialState = {
    loading: false,
    failed: false,
    pwdResetSuccess: false,
    pwdResetFailed: false,
    user: {}
};

export const login = (
    state = initialState,
    action: IAction<IUserData>
): ILoginInitialState => {

    switch (action.type) {
        case loginType.LOADING:
            return {
                ...state,
                loading: true,
                failed: false,
                pwdResetSuccess: false,
                pwdResetFailed: false,
            };
        case loginType.LOGIN_MODAL_WINDOW_CLOSED:
            return {
                ...state,
                loading: false,
                failed: false,
                pwdResetSuccess: false,
                pwdResetFailed: false,
            };
        case loginType.SUCCESS:
            return {
                ...state,
                loading: false,
                failed: false,
                pwdResetSuccess: false,
                pwdResetFailed: false,
                user: {
                    ...state.user,
                    role: action.payload.userData.role,
                    token: action.payload.userData.token,
                }
            };
        case loginType.FAILED:
            return {
                ...state,
                loading: false,
                failed: true,
                pwdResetSuccess: false
            };
        case loginType.PASSWORD_RESETTING:
            return {
                ...state,
                loading: true,
                failed: false,
                pwdResetSuccess: false,
                pwdResetFailed: false
            };
        case loginType.PASSWORD_RESET:
            return {
                ...state,
                loading: false,
                failed: false,
                pwdResetSuccess: true,
                pwdResetFailed: false
            };
        case loginType.PASSWORD_RESET_FAILED:
            return {
                ...state,
                loading: false,
                pwdResetSuccess: false,
                pwdResetFailed: true
            };
        default:
            return state;
    }
};