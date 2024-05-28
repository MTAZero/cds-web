import createApiServices from "./make-api-request";
const api = createApiServices();
const getTokenFromCode = async data => {
  const res = await api.makeRequest({
    url: `/authentication/login-sso`,
    method: "POST",
    data: data,
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
const logOutSSO = async data => {
  const res = await api.makeAuthRequest({
    url: `/oidc/logout`,
    method: "POST",
    data: data,
  });
  return res?.data;
};

export const SSO = {
  getTokenFromCode,
  getUserInfo,
  logOutSSO,
};
