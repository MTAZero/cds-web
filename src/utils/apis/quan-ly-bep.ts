import createApiServices from "./make-api-request-cm11";

const api = createApiServices();
const getListNguyenLieu = async (params = {ngay: 7}) => {
  const res = await api.makeAuthRequest({
    url: `/rest/v1/rpc/nguyen_lieu_bep_an`,
    method: "POST",
    data: params,
  });
  return res;
};
const getListThucDon = async (params = {_limit: 7}) => {
  const res = await api.makeAuthRequest({
    url: `/rest/v1/rpc/thuc_don_bep_an`,
    method: "POST",
    data: params,
  });
  return res;
};

export const QuanLyBep = {
  getListNguyenLieu,
  getListThucDon,
};
