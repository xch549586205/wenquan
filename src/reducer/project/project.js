import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectId: "",
};

export const questionSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectId: (state, action) => {
      state.projectId = action.payload;
    },
  },
});

// reducer方法的每一个case都会生成一个Action
export const { setProjectId } = questionSlice.actions;
export default questionSlice.reducer;
