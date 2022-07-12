import Panel from "./pages/Main";
import Login from "./pages/Login";
import { Navigate } from "react-router-dom";
// document.cookie = "userId=1";

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}
const isLogin = getCookie("userId");
const routers = [
  {
    path: "/main",
    Component: Panel,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: () => <Navigate to="/login" />,
  },
];
export default routers;
