import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  layoutHeight: 0,
};

export const questionSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    // 更新题目列表
    updateLayoutHeight: (state, action) => {
      state.layoutHeight = action.payload;
    },
  },
});

// reducer方法的每一个case都会生成一个Action
export const { updateLayoutHeight } = questionSlice.actions;
export default questionSlice.reducer;
