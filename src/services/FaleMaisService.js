import http from "../http-common";

const getDDDs = () => {
  return http.get("/ddds");
};

const getPlans = () => {
  return http.get("/plans");
};

const getTariff = data => {
  return http.post("/tariff", data);
};

export default {
  getDDDs,
  getPlans,
  getTariff
};