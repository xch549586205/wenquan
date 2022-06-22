import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./reducer/panel/panel";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    question: questionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      // sagaMiddleware,
      logger,
    ]),
});
