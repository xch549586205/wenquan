import axios from "axios";

const getQuestionList = (params) => {
  return axios({
    method: "post",
    url: "/question/qry",
    data: {
      ...params,
    },
  });
};
const addQuestion = (params) => {
  return axios({
    method: "post",
    url: "/question/add",
    data: {
      ...params,
    },
  });
};
const editQuestion = (params) => {
  return axios({
    method: "post",
    url: "/question/mod",
    data: {
      ...params,
    },
  });
};
export { getQuestionList, addQuestion, editQuestion };
