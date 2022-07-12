import axios from "axios";
const login = (params) => {
  return axios({
    method: "post",
    url: "/user/login",
    data: {
      ...params,
    },
  });
};
const register = (params) => {
  return axios({
    method: "post",
    url: "/user/add",
    data: {
      ...params,
    },
  });
};
export { login, register };
