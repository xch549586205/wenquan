import { lazy } from "react";

const routers = [
  {
    path: "/",
    Component: lazy(() => import("./pages/Main")),
  },
];
export default routers;
