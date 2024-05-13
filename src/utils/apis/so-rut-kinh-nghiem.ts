import {ParamSearch} from "../../types";
import createApiServices from "./make-api-request";

const api = createApiServices();
const getListSoRutKinhNghiem = async (params: any) => {
  const res = await api.makeAuthRequest({
    url: `/experience-book`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getDetailSoRutKinhNghiem = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/experience-book/${id}`,
    method: "GET",
  });
  return res?.data;
};
const createSoRutKinhNghiem = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/experience-book`,
    method: "POST",
    data: data,
  });
  return res?.data;
};
const updateSoRutKinhNghiem = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/experience-book/${data?._id}`,
    method: "PUT",
    data: data,
  });
  return res?.data;
};
export const SoRutKinhNghiem = {
  getListSoRutKinhNghiem,
  getDetailSoRutKinhNghiem,
  createSoRutKinhNghiem,
  updateSoRutKinhNghiem,
};
