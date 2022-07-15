import NavBar from "./pages/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import routers from "./router";
import { updateNavbarHeight } from "@/reducer/layout/layout";
import { useDispatch } from "react-redux";
import { Layout } from "antd";
const { Content } = Layout;
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const _updateLayoutHeight = (height) => {
    dispatch(updateNavbarHeight(height));
  };
  const isLoginPage = location.pathname.indexOf("login") !== -1;
  return (
    <Layout style={{ height: "100%", background: "#fff" }}>
      {!isLoginPage && <NavBar updateNavbarHeight={_updateLayoutHeight} />}
      <Content>
        <Routes location={props.location} history={props.history} level={1}>
          {routers.map((router) => {
            const { Component, path } = router;
            return <Route key={path} path={path} element={<Component />} />;
          })}
        </Routes>
      </Content>
    </Layout>
  );
};
