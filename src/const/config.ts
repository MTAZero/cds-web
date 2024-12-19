export const AppConfigs = {
  serverUrl: process.env.REACT_APP_BACKEND_URL
    ? process.env.REACT_APP_BACKEND_URL
    : "https://172.16.200.13:6868",
  serverCm11Url: process.env.REACT_APP_BACKEND_CM11_URL,
  tokenCm11:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE",
};
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
