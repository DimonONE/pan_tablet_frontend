import { IUser } from "../registration/interfaces";

export interface ILoginInitialState {
    loading: boolean,
    failed: boolean,
    pwdResetSuccess: boolean,
    pwdResetFailed: boolean,
    user: IUser
};
