import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./reducer/panel/panel";
import layoutReducer from "./reducer/layout/layout";
import projectReducer from "./reducer/project/project";
import logger from "redux-logger";
export const store = configureStore({
  reducer: {
    question: questionReducer,
    layout: layoutReducer,
    project: projectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      // sagaMiddleware,
      logger,
    ]),
});
