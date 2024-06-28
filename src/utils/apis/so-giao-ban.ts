import createApiServices from "./make-api-request";

const api = createApiServices();
const getListSoGiaoBan = async (params: any) => {
  const res = await api.makeAuthRequest({
    url: `/meeting-book`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getDetailSoGiaoBan = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/meeting-book/${id}`,
    method: "GET",
  });
  return res?.data;
};
const createSoGiaoBan = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/meeting-book`,
    method: "POST",
    data: data,
  });
  return res?.data;
};
const updateSoGiaoBan = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/meeting-book/${data?._id}`,
    method: "PUT",
    data: data,
  });
  return res?.data;
};
export const SoGiaoBan = {
  getListSoGiaoBan,
  getDetailSoGiaoBan,
  createSoGiaoBan,
  updateSoGiaoBan,
};
