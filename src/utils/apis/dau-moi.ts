import createApiServices from "./make-api-request";

const api = createApiServices();
const getListDauMoi = async () => {
  const res = await api.makeAuthRequest({
    url: `/manager-work-address`,
    method: "GET",
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
