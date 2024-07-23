import createApiServices from "./make-api-request";

const api = createApiServices();
const getListSoThongKeRaVao = async (params: any) => {
  const res = await api.makeAuthRequest({
    url: `/access-control`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getDetailSoThongKeRaVao = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/access-control/${id}`,
    method: "GET",
  });
  return res?.data;
};
const createSoThongKeRaVao = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/access-control`,
    method: "POST",
    data: data,
  });
  return res?.data;
};
const updateSoThongKeRaVao = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/access-control/${data?.id}`,
    method: "PUT",
    data: data,
  });
  return res?.data;
};
const deleteSoThongKeRaVao = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/access-control/${id}`,
    method: "DELETE",
  });
  return res?.data;
};
export const SoThongKeRaVao = {
  getListSoThongKeRaVao,
  getDetailSoThongKeRaVao,
  createSoThongKeRaVao,
  updateSoThongKeRaVao,
  deleteSoThongKeRaVao,
};
