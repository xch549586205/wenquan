import axios from "axios";

const getQuestionTypes = (params) => {
  return axios({
    method: "post",
    url: "/questiontype/qry",
    data: {
      ...params,
    },
  });
};
const addQuestionType = (params) => {
  return axios({
    method: "post",
    url: "/questiontype/add",
    data: {
      ...params,
    },
  });
};

export { getQuestionTypes, addQuestionType };
