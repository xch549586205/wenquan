import axios from "axios";
const addProject = (params) => {
  return axios({
    method: "post",
    url: "/project/add",
    data: {
      ...params,
    },
  });
};
const deleteProject = (params) => {
  return axios({
    method: "post",
    url: "/project/del",
    data: {
      ...params,
    },
  });
};
const getProjectList = (params) => {
  return axios({
    method: "post",
    url: "/project/qry",
    data: {
      ...params,
    },
  });
};
export { addProject, getProjectList, deleteProject };
