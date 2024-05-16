import {ParamSearch} from "../../types";
import createApiServices from "./make-api-request-sso";

const api = createApiServices();
const getTokenFromCode = async (data) => {
  const res = await api.makeRequest({
    url: `/authentication/login-sso`,
    method: "POST",
    data:data
  });
  return res?.data;
};
const getUserInfo = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/oauth2/userinfo`,
    method: "POST",
  });
  return res?.data;
};


export const SSO = {
  getTokenFromCode,
  getUserInfo
 
};
