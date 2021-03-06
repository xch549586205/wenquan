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
  (params) => {
    return api.questionList.getQuestionList(params);
  }
);

export const editQuestion = createAsyncThunk(
  "question/editQuestion",
  async (params, { dispatch, getState }) => {
    const state = getState();
    const res = await api.questionList.editQuestion({
      ...params,
      projectid: state.project.projectId * 1,
    });
    dispatch(getQuestionList({ projectid: state.project.projectId }));
    return res;
  }
);

export const addQuestion = createAsyncThunk(
  "question/addQuestion",
  async (params, { getState, dispatch }) => {
    const state = getState();
    const res = await api.questionList.addQuestion({
      ...params,
      projectid: state.project.projectId * 1,
    });
    dispatch(getQuestionList({ projectid: state.project.projectId }));
    return res;
  }
);

export const sortQuestionList = createAsyncThunk(
  "question/sortQuestionList",
  async (params, { dispatch, getState }) => {
    const state = getState();
    const res = await api.questionList.sortQuestionList(params);
    dispatch(getQuestionList({ projectid: state.project.projectId }));
    return res;
  }
);
export const delQuestion = createAsyncThunk(
  "question/delQuestion",
  async (params, { dispatch, getState }) => {
    const state = getState();
    const res = await api.questionList.delQuestion({
      ...params,
      projectid: state.project.projectId * 1,
    });
    dispatch(getQuestionList({ projectid: state.project.projectId }));
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
    // ??????????????????
    updateQuestionList: (state, action) => {
      state.questionList = [...action.payload];
    },
    // ??????panel??????????????????store???panel???????????????????????????redux??????panel???????????????
    updateGlobalOptions: (state, action) => {
      state.globalOptions = { ...action.payload };
    },
    // ???????????????????????????
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

// reducer??????????????????case??????????????????Action
export const { updateQuestionList, updateMouseData, updateGlobalOptions } =
  questionSlice.actions;
export default questionSlice.reducer;
