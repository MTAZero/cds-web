import createApiServices from "./make-api-request";

const api = createApiServices();

const getListEntity = (pageIndex = 1, pageSize = 10, keyword = "") => {
  return api.makeAuthRequest({
    url: `/guard-dutty/positions?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`,
    method: "GET",
  });
};

const getDetailEntity = (id: string) => {
  return api.makeAuthRequest({
    url: `/guard-dutty/positions/${id}`,
    method: "GET",
  });
};

const insertEntity = (entity: any) => {
  return api.makeAuthRequest({
    url: "/guard-dutty/positions",
    method: "POST",
    data: entity,
  });
};

const removeEntity = (id: string) => {
  return api.makeAuthRequest({
    url: `/guard-dutty/positions/${id}`,
    method: "DELETE",
  });
};

const updateEntity = (id: string, entity: any = {}) => {
  return api.makeAuthRequest({
    url: `/guard-dutty/positions/${id}`,
    method: "PUT",
    data: entity,
  });
};

const getListGuardDuttyPendingOfUnit = async (unitId: string, time: number) => {
  const res = await api.makeAuthRequest({
    url: `/guard-dutty/pending/${unitId}?time=${time}`,
    method: "GET",
  });
  return res.data;
};

const updateGuardDutty = async (
  id: string,
  isSendToChild = false,
  value = ""
) => {
  let data = {};
  if (isSendToChild)
    data = {
      unit: value,
    };
  else
    data = {
      user: value,
    };

  const res = await api.makeAuthRequest({
    url: `/guard-dutty/assign/${id}`,
    method: "PUT",
    data,
  });

  return res.data;
};

export const GuardDutty = {
  getListEntity,
  getDetailEntity,
  insertEntity,
  updateEntity,
  removeEntity,
  getListGuardDuttyPendingOfUnit,
  updateGuardDutty,
};
