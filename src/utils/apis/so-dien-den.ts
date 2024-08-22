import createApiServices from "./make-api-request";

const api = createApiServices();
const getListSoDienDen = async (params: any) => {
  const res = await api.makeAuthRequest({
    url: `/incoming-call`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getDetailSoDienDen = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/incoming-call/${id}`,
    method: "GET",
  });
  return res?.data;
};
const createSoDienDen = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/incoming-call`,
    method: "POST",
    data: data,
  });
  return res?.data;
};
const updateSoDienDen = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/incoming-call/${data?.id}`,
    method: "PUT",
    data: data,
  });
  return res?.data;
};
const deleteSoDienDen = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/incoming-call/${id}`,
    method: "DELETE",
  });
  return res?.data;
};
export const SoDienDen = {
  getListSoDienDen,
  getDetailSoDienDen,
  createSoDienDen,
  updateSoDienDen,
  deleteSoDienDen,
};
