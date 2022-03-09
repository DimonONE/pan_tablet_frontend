import { FC, ReactNode } from "react";
import { Redirect } from "react-router";
import { userRoutes } from "../../shared/consts/url/routes";
import { AuthChecking } from "./AuthChecking";

export const AuthGuard: FC<{ children: ReactNode }> = ({ children }) => {

    const isAuthorized = AuthChecking();

    if (isAuthorized) {
        return <>{children}</>;
    }

    return <Redirect to={userRoutes.registration} />
};