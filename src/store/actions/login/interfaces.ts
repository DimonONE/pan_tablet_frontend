export enum loginType {
    FAILED = 'FAILED',
    SUCCESS = 'SUCCESS',
    LOADING = 'LOADING',
    PASSWORD_RESET = 'PASSWORD_RESET',
    PASSWORD_RESETTING = 'PASSWORD_RESETTING',
    PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED',
    LOGIN_MODAL_WINDOW_CLOSED = 'LOGIN_MODAL_WINDOW_CLOSED',
};

export interface ILoginFormData {
    login: string,
    password: string,
    device?: string,
};