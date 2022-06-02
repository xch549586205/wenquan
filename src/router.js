import { lazy } from "react";

const routers = [
  {
    path: "/main",
    Component: lazy(() => import("./pages/Main")),
  },
];
export default routers;
