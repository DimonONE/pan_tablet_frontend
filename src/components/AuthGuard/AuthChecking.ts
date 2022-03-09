import { getUnixTime } from "date-fns";
import jwt from "jsonwebtoken";
import { getToken, removeToken } from "../../store/actions/login";

export const AuthChecking = () => {
  const limit = 7200;
  const token: string = getToken()?.slice(7) || ""; // get token without 'Bearer '
  const payload = jwt.decode(token, { complete: true })
    ?.payload as jwt.JwtPayload;
  const expToken = (payload?.iat || 0) + limit;
  const currentDate = getUnixTime(Date.now());

  if (expToken > currentDate) {
    return true;
  }
  removeToken();

  return false;
};
