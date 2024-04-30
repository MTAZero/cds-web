import createApiServices from "./make-api-request";

const api = createApiServices();

const getListEntity = (pageIndex = 1, pageSize = 10, keyword = "") => {
  return api.makeAuthRequest({
    url: `/guard-dutty?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`,
    method: "GET",
  });
};

const getDetailEntity = (id: string) => {
  return api.makeAuthRequest({
    url: `/guard-dutty/${id}`,
    method: "GET",
  });
};

const insertEntity = (entity: any) => {
  return api.makeAuthRequest({
    url: "/guard-dutty",
    method: "POST",
    data: entity,
  });
};

const removeEntity = (id: string) => {
  return api.makeAuthRequest({
    url: `/guard-dutty/${id}`,
    method: "DELETE",
  });
};

const updateEntity = (id: string, entity: any = {}) => {
  return api.makeAuthRequest({
    url: `/guard-dutty/${id}`,
    method: "PUT",
    data: entity,
  });
};

export const GuardDutty = {
  getListEntity,
  getDetailEntity,
  insertEntity,
  updateEntity,
  removeEntity,
};
