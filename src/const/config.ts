export const AppConfigs = {
  serverUrl: process.env.REACT_APP_BACKEND_URL
    ? process.env.REACT_APP_BACKEND_URL
    : "https://172.16.200.13:6868",
};
// 172.16.200.13
// 192.168.0.114
export const SSOConfigs={
  urlSSO:'https://xacthuc.bqp',
  responseType:'code',
  clientId:'ZJy8txmjFt4OY5kRFZXO2pzn1aAa',
  clientSecret:'gSffrp7c3hfLOlCejzRJjZRgevca',
  scope:'openid profile',
  callbackLoginUrl:'http://172.16.200.13:3000/xac-thuc',
  urlBeSSO:'http://172.16.200.13:6868/',
  grantType:'authorization_code',
  callbackLogoutUrl:"http://172.16.200.13:3000/login"
 
       
}