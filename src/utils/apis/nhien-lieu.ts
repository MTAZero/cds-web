import createApiServices from "./make-api-request";

const api = createApiServices();
const getListNhienLieu = async () => {
  const res = await api.makeAuthRequest({
    url: `/manager-fuel`,
    method: "GET",
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
