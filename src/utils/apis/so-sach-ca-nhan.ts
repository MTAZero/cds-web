import createApiServices from "./make-api-request";

const api = createApiServices();
const getListHuanLuyenCaNhan = async (params: any) => {
  const res = await api.makeAuthRequest({
    url: `/personal-diary/user/list-trainings`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getSoSachOfHuanLuyen = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/personal-diary/${id}`,
    method: "GET",
  });
  return res?.data;
};
const createSoSachOfHuanLuyen = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/personal-diary`,
    method: "POST",
    data: data,
  });
  return res?.data;
};
const updateSoSachOfHuanLuyen = async (data: any, id) => {
  const res = await api.makeAuthRequest({
    url: `/personal-diary/${id}`,
    method: "PUT",
    data: data,
  });
  return res?.data;
};
export const SoSachHuanLuyen = {
  getListHuanLuyenCaNhan,
  getSoSachOfHuanLuyen,
  updateSoSachOfHuanLuyen,
  createSoSachOfHuanLuyen,
};
