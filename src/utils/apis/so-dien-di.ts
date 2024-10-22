import createApiServices from "./make-api-request";

const api = createApiServices();
const getListSoDienDi = async (params: any) => {
  const res = await api.makeAuthRequest({
    url: `/going-call`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getDetailSoDienDi = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/going-call/${id}`,
    method: "GET",
  });
  return res?.data;
};
const createSoDienDi = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/going-call`,
    method: "POST",
    data: data,
  });
  return res?.data;
};
const updateSoDienDi = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/going-call/${data?.id}`,
    method: "PUT",
    data: data,
  });
  return res?.data;
};
const deleteSoDienDi = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/going-call/${id}`,
    method: "DELETE",
  });
  return res?.data;
};
export const SoDienDi = {
  getListSoDienDi,
  getDetailSoDienDi,
  createSoDienDi,
  updateSoDienDi,
  deleteSoDienDi,
};
