import southInstance from "api";

const BASE_API = "/api";

// getUsers trigger a get API call to bring the users list
export const getUsers = (params) => southInstance.get(BASE_API, { params });
