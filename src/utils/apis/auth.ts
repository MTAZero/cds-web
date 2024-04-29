import createApiServices from "./make-api-request";

const api = createApiServices();

const login = (uname = "", password = "") => {
  const body = {
    password: password,
    username: uname,
  };
  return api.makeRequest({
    url: "/authentication/login",
    method: "POST",
    data: body,
  });
};

const getPermission = () => {
  return api.makeAuthRequest({
    url: "authentication/my-info",
    method: "GET",
    data: {},
  });
};

const checkToken = () => {
  return api.makeAuthRequest({
    url: "authentication/check-token",
    method: "GET",
    data: {},
  });
};

const changeMyPassword = (old_password = "", new_password = "") => {
  return api.makeAuthRequest({
    url: "/authentication/change-my-password",
    method: "PUT",
    data: {
      old_password,
      new_password,
    },
  });
};

const updateUserInfo = (user: any = {}) => {
  let form_data = new FormData();
  for (let key in user) {
    form_data.append(key, user[key]);
  }

  return api.makeAuthRequest({
    url: `authentication/update-info`,
    method: "PUT",
    data: form_data,
  });
};

export const Auth = {
  login,
  getPermission,
  checkToken,
  changeMyPassword,
  updateUserInfo,
};
