import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentData: {
    title: "项目标题",
    subTitle: "感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！",
    themeColor: "#e1e1e1",
    isDisplaySequence: true,
    onePage: false,
    questionList: [
      {
        questionType: "singleChoice",
        questionId: "001",
        name: "单选题",
        options: ["选项1", "选项2", "选项3"],
        checked: [],
      },
      {
        questionType: "mulitipleChoice",
        questionId: "002",
        name: "多选题",
        options: ["选项4", "选项5", "选项5"],
        checked: [],
      },
    ],
  },
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    updateCurrentData: (state, action) => {
      state.currentData = {
        ...action.payload,
      };
    },
  },
});

// reducer方法的每一个case都会生成一个Action
export const { updateCurrentData } = questionSlice.actions;

export default questionSlice.reducer;
