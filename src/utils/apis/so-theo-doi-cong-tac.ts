import createApiServices from "./make-api-request";

const api = createApiServices();
const getSoTheoDoiCongTac = async params => {
  const res = await api.makeAuthRequest({
    url: `/track-work`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const updateSoTheoDoiCongTac = async data => {
  const res = await api.makeAuthRequest({
    url: `/track-work`,
    method: "POST",
    data: data,
  });
  return res?.data;
};

export const SoTheoDoiCongTac = {
  getSoTheoDoiCongTac,
  updateSoTheoDoiCongTac,
};
