import {ParamSearch} from "../../types";
import createApiServices from "./make-api-request";

const api = createApiServices();
// Người dùng
const getListUser = async (params: ParamSearch) => {
  const res = await api.makeAuthRequest({
    url: `/users`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getDetailUser = async (id: string) => {
  const res = await api.makeAuthRequest({
    url: `/users/${id}`,
    method: "GET",
  });
  return res?.data;
};
const createUser = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/users`,
    method: "POST",
    data: data,
  });
  return res?.data;
};
const updateUser = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/users/${data?._id}`,
    method: "PUT",
    data: data,
  });
  return res?.data;
};
const deleteUser = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/users/${id}`,
    method: "DELETE",
  });
  return res?.data;
};
// Đơn vị
const getListUnit = async (params: ParamSearch) => {
  const res = await api.makeAuthRequest({
    url: `/units`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getDetailUnit = async (id: string) => {
  const res = await api.makeAuthRequest({
    url: `/units/${id}`,
    method: "GET",
    params: {id: id},
  });
  return res?.data;
};
const getListChildUnit = async (id: string) => {
  const res = await api.makeAuthRequest({
    url: `/units/child/${id}`,
    method: "GET",
    params: {id: id},
  });
  return res?.data;
};
const getListDescendantsUnit = async (id: string) => {
  const res = await api.makeAuthRequest({
    url: `/units/descendants/${id}`,
    method: "GET",
  });
  return res?.data;
};
const createUnit = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/units`,
    method: "POST",
    data: data,
  });
  return res?.data;
};
const updateUnit = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/units/${data?._id}`,
    method: "PUT",
    data: data,
  });
  return res?.data;
};
const deleteUnit = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/units/${id}`,
    method: "DELETE",
  });
  return res?.data;
};
// Role
const getListRole = async (params: ParamSearch) => {
  const res = await api.makeAuthRequest({
    url: `/roles`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getDetailRole = async (id: string) => {
  const res = await api.makeAuthRequest({
    url: `/roles/${id}`,
    method: "GET",
    params: {id: id},
  });
  return res?.data;
};

const createRole = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/roles`,
    method: "POST",
    data: data,
  });
  return res?.data;
};
const updateRole = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/roles/${data?._id}`,
    method: "PUT",
    data: data,
  });
  return res?.data;
};
const deleteRole = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/roles/${id}`,
    method: "DELETE",
  });
  return res?.data;
};

// Vị trí
const getListPosition = async (params: ParamSearch) => {
  const res = await api.makeAuthRequest({
    url: `/positions`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getDetailPosition = async (id: string) => {
  const res = await api.makeAuthRequest({
    url: `/positions/${id}`,
    method: "GET",
    params: {id: id},
  });
  return res?.data;
};

const createPosition = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/positions`,
    method: "POST",
    data: data,
  });
  return res?.data;
};
const updatePosition = async (data: any) => {
  const res = await api.makeAuthRequest({
    url: `/positions/${data?._id}`,
    method: "PUT",
    data: data,
  });
  return res?.data;
};
const deletePosition = async (id: any) => {
  const res = await api.makeAuthRequest({
    url: `/positions/${id}`,
    method: "DELETE",
  });
  return res?.data;
};
export const QuanTri = {
  getListUser,
  getDetailUser,
  updateUser,
  createUser,
  deleteUser,
  getListUnit,
  getDetailUnit,
  getListChildUnit,
  getListDescendantsUnit,
  createUnit,
  updateUnit,
  deleteUnit,
  getListRole,
  getDetailRole,
  createRole,
  updateRole,
  deleteRole,
  getListPosition,
  getDetailPosition,
  createPosition,
  updatePosition,
  deletePosition,
};
