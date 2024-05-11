import createApiServices from "./make-api-request";

const api = createApiServices();

const getListUserOfTreeUnit = async (
  unitId = "",
  pageIndex = 1,
  pageSize = 10,
  keyword = ""
) => {
  const res = await api.makeAuthRequest({
    url: `/users/unit-tree/${unitId}?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`,
    method: "GET",
  });

  return res?.data;
};

export const User = {
  getListUserOfTreeUnit,
};
