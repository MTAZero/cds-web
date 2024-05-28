import createApiServices from "./make-api-request";

const api = createApiServices();
const getListVanKien = async () => {
  const res = await api.makeAuthRequest({
    url: `/document`,
    method: "GET",
  });
  return res?.data;
};
const getDetailVanKien = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/document/${id}`,
    method: "GET",
    config: {responseType: "blob"},
  });
  return res?.data;
};
const uploadVanKien = async (formData: any) => {
  const headers = {"Content-Type": "multipart/form-data"};
  const res = await api.makeAuthRequest({
    url: `/document`,
    method: "POST",
    data: formData,
    headers: headers,
  });
  return res?.data;
};

export const VanKien = {
  getListVanKien,
  getDetailVanKien,
  uploadVanKien,
};
