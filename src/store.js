import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./reducer/panel/panel";
import layoutReducer from "./reducer/layout/layout";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    question: questionReducer,
    layout: layoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      // sagaMiddleware,
      logger,
    ]),
});
