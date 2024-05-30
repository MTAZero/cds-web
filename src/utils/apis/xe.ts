import createApiServices from "./make-api-request";

const api = createApiServices();
const getListXe = async () => {
  const res = await api.makeAuthRequest({
    url: `/vehicle`,
    method: "GET",
  });
  return res?.data;
};
const updateListXe = async data => {
  const res = await api.makeAuthRequest({
    url: `/vehicle`,
    method: "POST",
    data: data,
  });
  return res?.data;
};

export const QuanLyXe = {
  getListXe,
  updateListXe,
};
