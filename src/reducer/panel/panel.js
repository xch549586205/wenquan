import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mocks from "@/mock";
import api from "@/api";

export const getQuestionTypes = createAsyncThunk(
  "question/getQuestionTypes",
  () => {
    return api.questionTypes.getQuestionTypes();
  }
);

const initialState = {
  globalOptions: mocks.questionList.globalOptions,
  questionList: mocks.questionList.questionList,
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
  },
});

// reducer方法的每一个case都会生成一个Action
export const { updateQuestionList, updateMouseData, updateGlobalOptions } =
  questionSlice.actions;
export default questionSlice.reducer;
