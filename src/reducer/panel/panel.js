import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questionOption: {
    title: "项目标题",
    subTitle: "感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！",
    themeColor: "#e1e1e1",
    isDisplaySequence: true,
    onePage: false,
  },
  questionList: [
    {
      questionId: "001",
      name: "question1",
      options: ["选项1", "选项2", "选项3"],
      checked: [],
    },
    {
      questionId: "002",
      name: "question2",
      options: ["选项4", "选项5", "选项5"],
      checked: [],
    },
    {
      questionId: "004",
      name: "question1",
      options: ["选项4", "选项5", "选项5"],
      checked: [],
    },
  ],
  panelOptions: {
    direction: "",
    isSupportPhone: true,
  },
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
      state.questionList = [
        ...action.payload
      ];
    },
    // 更新panel组件根配置到store，panel下面的子组件可通过redux获取panel组件根配置
    updatePanelOptions: (state, action) => {
      state.panelOptions = { ...action.payload.panelOptions };
    },
    // 拖拽新增题目的逻辑
    updateMouseData: (state, action) => {
      state.mouseData = { ...action.payload };
    },
  },
});

// reducer方法的每一个case都会生成一个Action
export const { updateQuestionList, updateMouseData, updatePanelOptions } = questionSlice.actions;

export default questionSlice.reducer;
