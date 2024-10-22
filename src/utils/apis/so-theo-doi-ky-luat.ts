import createApiServices from "./make-api-request";

const api = createApiServices();
const getListSoTheoDoiKyLuat = async params => {
  const res = await api.makeAuthRequest({
    url: `/track-discipline`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const updateSoTheoDoiKyLuat = async data => {
  const res = await api.makeAuthRequest({
    url: `/track-discipline`,
    method: "POST",
    data: data,
  });
  return res?.data;
};

export const SoTheoDoiKyLuat = {
  getListSoTheoDoiKyLuat,
  updateSoTheoDoiKyLuat,
};
