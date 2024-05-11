import createApiServices from "./make-api-request";

const api = createApiServices();

const getListEntity = (pageIndex = 1, pageSize = 10, keyword = "") => {
  return api.makeAuthRequest({
    url: `/units?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`,
    method: "GET",
  });
};

const getDetailEntity = (id: string) => {
  return api.makeAuthRequest({
    url: `/units/${id}`,
    method: "GET",
  });
};

const insertEntity = (entity: any) => {
  return api.makeAuthRequest({
    url: "/units",
    method: "POST",
    data: entity,
  });
};

const removeEntity = (id: string) => {
  return api.makeAuthRequest({
    url: `/units/${id}`,
    method: "DELETE",
  });
};

const updateEntity = (id: string, entity: any = {}) => {
  return api.makeAuthRequest({
    url: `/units/${id}`,
    method: "PUT",
    data: entity,
  });
};

const getUnitChild = async (unitId: string) => {
  const res = await api.makeAuthRequest({
    url: `/units/child/${unitId}`,
    method: "GET",
  });

  return res?.data;
};

export const Unit = {
  getListEntity,
  getDetailEntity,
  insertEntity,
  updateEntity,
  removeEntity,
  getUnitChild,
};
