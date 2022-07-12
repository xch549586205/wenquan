import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mocks from "@/mock";
import api from "@/api";

export const getQuestionTypes = createAsyncThunk(
  "question/getQuestionTypes",
  () => {
    return api.questionTypes.getQuestionTypes();
  }
);

export const getQuestionList = createAsyncThunk(
  "question/getQuestionList",
  () => {
    return api.questionList.getQuestionList();
  }
);

export const editQuestion = createAsyncThunk(
  "question/editQuestion",
  async (params, { dispatch }) => {
    const res = await api.questionList.editQuestion(params);
    dispatch(getQuestionList());
    return res;
  }
);

export const addQuestion = createAsyncThunk(
  "question/addQuestion",
  async (params, { dispatch }) => {
    const res = await api.questionList.addQuestion(params);
    dispatch(getQuestionList());
    return res;
  }
);

export const sortQuestionList = createAsyncThunk(
  "question/sortQuestionList",
  async (params, { dispatch }) => {
    const res = await api.questionList.sortQuestionList(params);
    dispatch(getQuestionList());
    return res;
  }
);
export const delQuestion = createAsyncThunk(
  "question/delQuestion",
  async (params, { dispatch }) => {
    const res = await api.questionList.delQuestion(params);
    dispatch(getQuestionList());
    return res;
  }
);
const initialState = {
  globalOptions: mocks.questionList.globalOptions,
  questionList: [],
  mouseData: {
    clientX: -1,
    clientY: -1,
  },
  questionTypes: [],
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    // 更新题目列表
    updateQuestionList: (state, action) => {
      state.questionList = [...action.payload];
    },
    // 更新panel组件根配置到store，panel下面的子组件可通过redux获取panel组件根配置
    updateGlobalOptions: (state, action) => {
      state.globalOptions = { ...action.payload };
    },
    // 拖拽新增题目的逻辑
    updateMouseData: (state, action) => {
      state.mouseData = { ...action.payload };
    },
  },
  extraReducers: {
    [getQuestionTypes.fulfilled]: (state, action) => {
      const { payload } = action;
      if (payload.data.errcode === 200) {
        state.questionTypes = payload.data.data;
      }
    },
    [getQuestionList.fulfilled]: (state, action) => {
      const { payload } = action;
      if (payload.data.errcode === 200) {
        state.questionList = payload.data.data;
      }
    },
    [editQuestion.fulfilled]: (state, action) => {
      console.log(action);
    },
    [addQuestion.fulfilled]: (state, action) => {
      console.log(action);
    },
    [sortQuestionList.fulfilled]: (state, action) => {
      console.log(action);
    },
  },
});

// reducer方法的每一个case都会生成一个Action
export const { updateQuestionList, updateMouseData, updateGlobalOptions } =
  questionSlice.actions;
export default questionSlice.reducer;
