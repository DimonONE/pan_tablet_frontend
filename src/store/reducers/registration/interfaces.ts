/** @format */

export interface IRegistrationInitialState {
  loading: boolean;
  failed: boolean;
  errorMessage: string;
  pwdChanged: boolean;
  userDataChanged: boolean;
  user: IUser;
}

export interface IUser {
  id?: number;
  email?: string;
  name?: string | null;
  surname?: string | null;
  accountName?: string;
  age?: number;
  token?: string;
  role?: string;
  password?: string;
  repeatedPassword?: string;
  oldPassword?: string;
  newPassword?: string;
  repeatNewPassword?: string;
}

export interface IRole {
  admin?: boolean;
  animator?: boolean;
  child?: boolean;
  parent?: boolean;
  teacher?: boolean;
  coordinator?: boolean;
}
