import createApiServices from "./make-api-request";

const api = createApiServices();

const loadUnitChildStatusReport = async (unitId: string, time: number) => {
  const res = await api.makeAuthRequest({
    url: `/troop-report/unit-status-report`,
    method: "POST",
    data: {
      unitId,
      time,
    },
  });
  return res?.data;
};

const loadListUserTroopStatusOfUnit = async (
  unitId: string,
  time: number,
  pageSize = 10,
  pageIndex = 1,
  keyword = "",
  status = "",
  type = ""
) => {
  const res = await api.makeAuthRequest({
    url: `/troop-report/unit-troop-detail/${unitId}?pageSize=${pageSize}&pageIndex=${pageIndex}&time=${time}&keyword=${keyword}&status=${status}&type=${type}`,
    method: "GET",
    data: {
      unitId,
      time,
    },
  });
  return res?.data;
};

const getListUserTroopStatusOfUnitTree = async (
  unitId: string,
  time: number,
  pageSize = 10,
  pageIndex = 1,
  keyword = "",
  status = "",
  type = ""
) => {
  const res = await api.makeAuthRequest({
    url: `/troop-report/unit-tree-troop-detail/${unitId}?pageSize=${pageSize}&pageIndex=${pageIndex}&time=${time}&keyword=${keyword}&status=${status}&type=${type}`,
    method: "GET",
    data: {
      unitId,
      time,
    },
  });
  return res?.data;
};

const reportTroop = async (
  unitId: string,
  time: number,
  absentTroops: Array<{ user: string; reason: string }>
) => {
  const res = await api.makeAuthRequest({
    url: `/troop-report`,
    method: "POST",
    data: {
      unit: unitId,
      time,
      absentTroops,
    },
  });
  return res?.data;
};

const getTroopInfo = async (unitId: string, time: number) => {
  const res = await api.makeAuthRequest({
    url: `/troop-report/get-troop`,
    method: "POST",
    data: {
      unitId: unitId,
      time,
    },
  });
  return res?.data?.text;
};

export const TroopReport = {
  loadUnitChildStatusReport,
  loadListUserTroopStatusOfUnit,
  getListUserTroopStatusOfUnitTree,
  reportTroop,
  getTroopInfo,
};
