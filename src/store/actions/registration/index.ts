/** @format */
import { History } from "history";
import { Dispatch } from "react";
import { Axios } from "../../../shared/axios";
import { apiUrl } from "../../../shared/consts/url/apiUrl";
import { userRoutes } from "../../../shared/consts/url/routes";
import { IUser } from "../../reducers/registration/interfaces";
import { removeToken } from "../login";
import { registrationType } from "./interfaces";

export const getUserData = () => async (dispatch: Dispatch<any>) => {
  try {
    const res = await Axios({
      method: "GET",
      url: apiUrl.getUserData,
    });

    dispatch(userDataFetched(res.data));
  } catch {
    dispatch(userDataFetched({}));
  }
};

export const userSignUp =
  (userData: IUser, history: History) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(requestSent());

      await Axios({
        method: "POST",
        url: apiUrl.signUp,
        data: userData,
      });

      history.push(userRoutes.mainPage);
      history.push(userRoutes.registration);

      dispatch(dataFetched());
    } catch (error: any) {
      if (error?.response?.status === 400) {
        dispatch(userSignUpFailed());
        return;
      }
      dispatch(dataFetchingFailed());
    }
  };

export const removeUser =
  (history: History) => async (dispatch: Dispatch<any>) => {
    try {
      await Axios({
        method: "DELETE",
        url: apiUrl.removeUser,
      });

      removeToken();
      history.push("/home");
    } catch (error: any) {
      console.log(console.error);
    }
  };

export const updateUserPwd =
  (userData: IUser) => async (dispatch: Dispatch<any>) => {
    const data: IUser = {
      newPassword: userData.newPassword,
      oldPassword: userData.oldPassword,
      repeatNewPassword: userData.repeatNewPassword,
    };

    try {
      await Axios({
        method: "PUT",
        url: `${apiUrl.changeUserData}/${userData.id}/password`,
        data,
      });

      dispatch(userPwdUpdated());
    } catch (error) {}
  };

export const updateUserData =
  (userData: IUser) => async (dispatch: Dispatch<any>) => {
    const data: IUser = {
      accountName: userData.accountName,
      age: userData.age,
      email: userData.email,
      role: userData.role,
    };

    try {
      await Axios({
        method: "PUT",
        url: `${apiUrl.changeUserData}/${userData.id}/info`,
        data,
      });
      dispatch(userDataUpdated());
    } catch (error) {}
  };

const userDataUpdated = () => {
  return {
    type: registrationType.USER_DATA_CHANGED,
    payload: {},
  };
};

const userPwdUpdated = () => {
  return {
    type: registrationType.PASSWORD_CHANGED,
    payload: {},
  };
};

export const requestSent = () => {
  return {
    type: registrationType.REQUEST_SENT,
    payload: {},
  };
};

export const dataFetched = () => {
  return {
    type: registrationType.SIGN_UP_SUCCESS,
    payload: {},
  };
};

export const dataFetchingFailed = () => {
  return {
    type: registrationType.DATA_FETCHING_FAILED,
    payload: {},
  };
};

export const userSignUpFailed = () => {
  return {
    type: registrationType.SIGN_UP_FAILED,
    payload: {},
  };
};

export const resetErrorMessage = () => {
  return {
    type: registrationType.ERROR_MESSAGE_RESET,
    payload: {},
  };
};

const userDataFetched = (userData: IUser) => {
  return {
    type: registrationType.DATA_FETCHED,
    payload: { userData },
  };
};
