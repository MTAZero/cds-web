import createApiServices from "./make-api-request";

const api = createApiServices();
const getListNhiemVu = async (params = {pageIndex: 1, pageSize: 50}) => {
  const res = await api.makeAuthRequest({
    url: `/manager-task`,
    method: "GET",
    params: params,
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
