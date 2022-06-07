import { lazy } from "react";

const routers = [
  {
    path: "/",
    Component: lazy(() => import("./pages/Panel")),
  },
];
export default routers;
