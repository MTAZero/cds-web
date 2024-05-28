import {ParamSearch} from "../../types";
import createApiServices from "./make-api-request";

const api = createApiServices();
const getListTienTrinhBieu = async (params: ParamSearch) => {
  const res = await api.makeAuthRequest({
    url: `/progresses/get-of-week`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getDetailTienTrinhBieu = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/progresses/${id}`,
    method: "GET",
  });
  return res?.data;
};
const getThanhPhanTienTrinhBieu = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/progresses/${id}/list-people`,
    method: "GET",
  });
  return res?.data;
};
const createTienTrinhBieu = async (data: any, id = null) => {
  const res = await api.makeAuthRequest({
    url: `/progresses`,
    method: "POST",
    data: data,
  });
  return res?.data;
};
const updateTienTrinhBieu = async (data, id) => {
  const res = await api.makeAuthRequest({
    url: `/progresses/${id}`,
    method: "PUT",
    data: data,
  });
  return res?.data;
};
const danhGiaHuanLuyen = async (data, id) => {
  const res = await api.makeAuthRequest({
    url: `/training/${id}`,
    method: "PUT",
    data: data,
  });
  return res?.data;
};
const deleteTienTrinhBieu = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/progresses/${id}`,
    method: "DELETE",
  });
  return res?.data;
};
const getDetailFile = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/progresses/file/${id}`,
    method: "GET",
    config: {responseType: "blob"},
  });
  return res?.data;
};
export const TienTrinhBieu = {
  getListTienTrinhBieu,
  getThanhPhanTienTrinhBieu,
  getDetailTienTrinhBieu,
  createTienTrinhBieu,
  updateTienTrinhBieu,
  deleteTienTrinhBieu,
  danhGiaHuanLuyen,
  getDetailFile,
};
