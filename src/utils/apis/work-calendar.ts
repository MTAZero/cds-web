import createApiServices from "./make-api-request";

const api = createApiServices();

const findUserFromTree = async (keyword = "") => {
  const res = await api.makeAuthRequest({
    url: `work-calendar/find-user?keyword=${keyword}`,
    method: "GET",
  });

  return res?.data;
};

export const WorlCalendar = {
  findUserFromTree,
};
