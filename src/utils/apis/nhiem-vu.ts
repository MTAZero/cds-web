import createApiServices from "./make-api-request";

const api = createApiServices();
const getListNhiemVu = async () => {
  const res = await api.makeAuthRequest({
    url: `/manager-task`,
    method: "GET",
  });
  return res?.data;
};
const updateListNhiemVu = async data => {
  const res = await api.makeAuthRequest({
    url: `/manager-task`,
    method: "POST",
    data: data,
  });
  return res?.data;
};

export const QuanLyNhiemVu = {
  getListNhiemVu,
  updateListNhiemVu,
};
