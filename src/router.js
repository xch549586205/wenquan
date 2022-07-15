import Panel from "./pages/Main";
import Login from "./pages/Login";
import Project from "./pages/Project";
import { Navigate } from "react-router-dom";
// document.cookie = "userId=1";


const routers = [
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/project",
    Component: Project,
    breadcrumbName: "所有项目",
  },
  {
    path: "/main/:id",
    Component: Panel,
    breadcrumbName: "编辑",
  },
  {
    path: "/",
    Component: () => <Navigate to="/login" />,
  },
];
export default routers;
