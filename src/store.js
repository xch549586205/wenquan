import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./reducer/questions/question";

export const store = configureStore({
  reducer: {
    question: questionReducer,
  },
});
