import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./reducer/panel/panel";

export const store = configureStore({
  reducer: {
    question: questionReducer,
  },
});
