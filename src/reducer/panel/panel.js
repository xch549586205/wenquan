import { createSlice } from "@reduxjs/toolkit";
import mocks from "@/mock";
const initialState = {
  globalOptions: mocks.questionList.globalOptions,
  questionList: mocks.questionList.questionList,
  mouseData: {
    clientX: -1,
    clientY: -1,
  },
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
});

// reducer方法的每一个case都会生成一个Action
export const { updateQuestionList, updateMouseData, updateGlobalOptions } =
  questionSlice.actions;

export default questionSlice.reducer;
