/** @format */

import { IUser } from "../../reducers/registration/interfaces";

export enum registrationType {
  REQUEST_SENT = "REQUEST_SENT",
  DATA_FETCHED = "DATA_FETCHED",
  SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS",
  DATA_FETCHING_FAILED = "DATA_FETCHING_FAILED",
  PASSWORD_CHANGED = "PASSWORD_CHANGED",
  USER_DATA_CHANGED = "USER_DATA_CHANGED",
  SIGN_UP_FAILED = "SIGN_UP_FAILED",
  ERROR_MESSAGE_RESET= "ERROR_MESSAGE_RESET"
}

export interface IAction {
  type: string;
  payload: {
    userData: IUser;
  };
}

export interface IUserData {
  userData: IUser;
}
