import createApiServices from "./make-api-request";

const api = createApiServices();
const getListDangKi = async params => {
  const res = await api.makeAuthRequest({
    url: `/register-vehicle`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getListKeHoach = async params => {
  const res = await api.makeAuthRequest({
    url: `/register-vehicle/plan`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getDetailDangKi = async id => {
  const res = await api.makeAuthRequest({
    url: `/register-vehicle/${id}`,
    method: "GET",
  });
  return res?.data;
};
const createDangKi = async (data, id = null) => {
  const res = await api.makeAuthRequest({
    url: `/register-vehicle`,
    method: "POST",
    data: data,
  });
  return res?.data;
};
const updateDangKi = async (data, id) => {
  const res = await api.makeAuthRequest({
    url: `/register-vehicle/${id}`,
    method: "PUT",
    data: data,
  });
  return res?.data;
};
const deleteDangKi = async data => {
  const res = await api.makeAuthRequest({
    url: `/register-vehicle`,
    method: "PUT",
    data: data,
  });
  return res?.data;
};

export const DangKiXe = {
  getListDangKi,
  getListKeHoach,
  getDetailDangKi,
  createDangKi,
  updateDangKi,
  deleteDangKi,
};
