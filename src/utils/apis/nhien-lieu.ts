import createApiServices from "./make-api-request";

const api = createApiServices();
const getListNhienLieu = async (params = {pageIndex: 1, pageSize: 50}) => {
  const res = await api.makeAuthRequest({
    url: `/manager-fuel`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const updateListNhienLieu = async data => {
  const res = await api.makeAuthRequest({
    url: `/manager-fuel`,
    method: "POST",
    data: data,
  });
  return res?.data;
};

export const QuanLyNhienLieu = {
  getListNhienLieu,
  updateListNhienLieu,
};
