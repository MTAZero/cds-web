import createApiServices from "./make-api-request";

const api = createApiServices();
const getListLenhXe = async (params: any) => {
  const res = await api.makeAuthRequest({
    url: `/vehicle-command`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getDetailLenhXe = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/vehicle-command/${id}`,
    method: "GET",
  });
  return res?.data;
};
const createLenhXe = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/vehicle-command`,
    method: "POST",
    data: data,
  });
  return res?.data;
};
const updateLenhXe = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/vehicle-command/${data?.id}`,
    method: "PUT",
    data: data,
  });
  return res?.data;
};
const deleteLenhXe = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/vehicle-command/${id}`,
    method: "DELETE",
  });
  return res?.data;
};
export const LenhXe = {
  getListLenhXe,
  getDetailLenhXe,
  createLenhXe,
  updateLenhXe,
  deleteLenhXe,
};
