export const AppConfigs = {
  serverUrl: process.env.REACT_APP_BACKEND_URL
    ? process.env.REACT_APP_BACKEND_URL
    : "https://172.16.200.13:6868",
};
// 172.16.200.13
// 192.168.0.114
export const SSOConfigs = {
  urlSSO: process.env.REACT_APP_SSO_URL,
  responseType: "code",
  clientId: "ZJy8txmjFt4OY5kRFZXO2pzn1aAa",
  clientSecret: "gSffrp7c3hfLOlCejzRJjZRgevca",
  scope: "openid profile",
  callbackLoginUrl: `${process.env.REACT_APP_CALLBACK_URL}/xac-thuc`,
  grantType: "authorization_code",
  callbackLogoutUrl: `${process.env.REACT_APP_CALLBACK_URL}/login`,
};
