import createApiServices from "./make-api-request";

const api = createApiServices();
const getListPhieuXuatXang = async (params: any) => {
  const res = await api.makeAuthRequest({
    url: `/delivery-bill`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getDetailPhieuXuatXang = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/delivery-bill/${id}`,
    method: "GET",
  });
  return res?.data;
};
const createPhieuXuatXang = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/delivery-bill`,
    method: "POST",
    data: data,
  });
  return res?.data;
};
const updatePhieuXuatXang = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/delivery-bill/${data?.id}`,
    method: "PUT",
    data: data,
  });
  return res?.data;
};
const deletePhieuXuatXang = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/delivery-bill/${id}`,
    method: "DELETE",
  });
  return res?.data;
};
export const PhieuXuatXang = {
  getListPhieuXuatXang,
  getDetailPhieuXuatXang,
  createPhieuXuatXang,
  updatePhieuXuatXang,
  deletePhieuXuatXang,
};
