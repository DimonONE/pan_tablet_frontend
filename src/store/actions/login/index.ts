import { History } from "history";
import { Dispatch } from "react";
import { Axios } from "../../../shared/axios";
import { apiUrl } from "../../../shared/consts/url/apiUrl";
import { userRoutes } from "../../../shared/consts/url/routes";
import { IUser } from "../../reducers/registration/interfaces";
import { getUserData } from "../registration";
import { ILoginFormData, loginType } from "./interfaces";

export const authorization = (
    value: ILoginFormData,
    history: History,
    setSubmitting: (state: boolean) => void

) => async (dispatch: Dispatch<any>) => {

    Object.assign(value, { device: 'BROWSER_USER' });
    try {
        dispatch(requestSent());

        const res = await Axios({
            method: "POST",
            url: apiUrl.login,
            data: value,
        });

        setToken(res.data.token);

        history.push(`${userRoutes.profile}`);

        dispatch(getUserData());
        dispatch(authSuccess(res.data));

    } catch (error) {

        dispatch(authFailed());

        setSubmitting(false);
    }
};

export const resetPwd = (email: string) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(passwordResetting());

        await Axios({
            method: "POST",
            url: `${apiUrl.resetPwd}/${email}/reset`
        });

        dispatch(passwordReset());

    } catch (error) {

        dispatch(passwordResettingFailed());
    }
};

const setToken = (token: string) => {
    localStorage.setItem('dkjfvndncmscdkl', token);
};

export const getToken = () => {
    return localStorage.getItem('dkjfvndncmscdkl') as string;
};

export const removeToken = () => {
    localStorage.removeItem('dkjfvndncmscdkl');
};

const passwordResetting = () => {
    return {
        type: loginType.PASSWORD_RESETTING,
        payload: {}
    }
};

const passwordResettingFailed = () => {
    return {
        type: loginType.PASSWORD_RESET_FAILED,
        payload: {}
    }
};

export const passwordReset = () => {
    return {
        type: loginType.PASSWORD_RESET,
        payload: {}
    }
};

export const requestSent = () => {
    return {
        type: loginType.LOADING,
        payload: {}
    }
};

export const authFailed = () => {
    return {
        type: loginType.FAILED,
        payload: {}
    }
};

export const loginModalClosed = () => {
    return {
        type: loginType.LOGIN_MODAL_WINDOW_CLOSED,
        payload: {}
    }
};

export const authSuccess = (userData: IUser) => {
    return {
        type: loginType.SUCCESS,
        payload: { userData }
    };
};