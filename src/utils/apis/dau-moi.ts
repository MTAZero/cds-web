import createApiServices from "./make-api-request";

const api = createApiServices();
const getListDauMoi = async (params = {pageIndex: 1, pageSize: 50}) => {
  const res = await api.makeAuthRequest({
    url: `/manager-work-address`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const updateListDauMoi = async data => {
  const res = await api.makeAuthRequest({
    url: `/manager-work-address`,
    method: "POST",
    data: data,
  });
  return res?.data;
};

export const QuanLyDauMoi = {
  getListDauMoi,
  updateListDauMoi,
};
