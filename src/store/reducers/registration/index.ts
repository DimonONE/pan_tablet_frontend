/** @format */

import {
  IUserData,
  registrationType,
} from "../../actions/registration/interfaces";
import { IAction } from "../../interfaces/IAction";
import { IRegistrationInitialState } from "./interfaces";

const initialState: IRegistrationInitialState = {
  loading: false,
  failed: false,
  errorMessage: "",
  pwdChanged: false,
  userDataChanged: false,
  user: {
    id: 0,
    accountName: "",
    age: 0,
    email: "",
    role: "",
    password: "",
    repeatedPassword: "",
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  },
};

export const signUp = (
  state = initialState,
  action: IAction<IUserData | string>
): IRegistrationInitialState => {
  switch (action.type) {
    case registrationType.REQUEST_SENT:
      return {
        ...state,
        loading: true,
        failed: false,
        pwdChanged: false,
        userDataChanged: false,
        errorMessage: "",
      };
    case registrationType.DATA_FETCHING_FAILED:
      return {
        ...state,
        loading: false,
        failed: true,
        pwdChanged: false,
        userDataChanged: false,
        errorMessage: ""
      };
    case registrationType.DATA_FETCHED:
      const payload = action.payload as IUserData;
      return {
        ...state,
        loading: false,
        failed: false,
        pwdChanged: false,
        userDataChanged: false,
        errorMessage: "",
        user: {
          ...state.user,
          id: payload.userData.id,
          email: payload.userData.email,
          accountName: payload.userData.accountName,
          age: payload.userData.age,
          role: payload.userData.role,
        },
      };
    case registrationType.SIGN_UP_FAILED:
      return {
        ...state,
        loading: false,
        failed: true,
        pwdChanged: false,
        userDataChanged: false,
        user: initialState.user,
        errorMessage: "Już istnieje konto połączone z tym adresem",
      };
      case registrationType.ERROR_MESSAGE_RESET:
        return {
          ...state,
          loading: false,
          failed: true,
          pwdChanged: false,
          userDataChanged: false,
          user: initialState.user,
          errorMessage: "",
        };
    case registrationType.SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        failed: false,
        pwdChanged: false,
        userDataChanged: false,
        user: initialState.user,
        errorMessage: ""
      };
    case registrationType.PASSWORD_CHANGED:
      return {
        ...state,
        loading: false,
        failed: false,
        pwdChanged: true,
        userDataChanged: false,
        errorMessage: "",
      };
    case registrationType.USER_DATA_CHANGED:
      return {
        ...state,
        loading: false,
        failed: false,
        pwdChanged: false,
        userDataChanged: true,
        errorMessage: "",
      };
    default:
      return state;
  }
};
