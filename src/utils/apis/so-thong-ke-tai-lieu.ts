import createApiServices from "./make-api-request";

const api = createApiServices();
const getListSoThongKeTaiLieu = async (params: any) => {
  const res = await api.makeAuthRequest({
    url: `/statistic-document`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getDetailSoThongKeTaiLieu = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/statistic-document/${id}`,
    method: "GET",
  });
  return res?.data;
};
const createSoThongKeTaiLieu = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/statistic-document`,
    method: "POST",
    data: data,
  });
  return res?.data;
};
const updateSoThongKeTaiLieu = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/statistic-document/${data?.id}`,
    method: "PUT",
    data: data,
  });
  return res?.data;
};
const deleteSoThongKeTaiLieu = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/statistic-document/${id}`,
    method: "DELETE",
  });
  return res?.data;
};
export const SoThongKeTaiLieu = {
  getListSoThongKeTaiLieu,
  getDetailSoThongKeTaiLieu,
  createSoThongKeTaiLieu,
  updateSoThongKeTaiLieu,
  deleteSoThongKeTaiLieu,
};
