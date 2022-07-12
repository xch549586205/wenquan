import Layout from "./pages/Layout";
import { Route, Routes, useLocation } from "react-router-dom";
import routers from "./router";
import { updateLayoutHeight } from "@/reducer/layout/layout";
import { useDispatch } from "react-redux";
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const _updateLayoutHeight = (height) => {
    dispatch(updateLayoutHeight(height));
  };
  const isLoginPage = location.pathname.indexOf("login") !== -1;
  return (
    <div style={{ height: "100%" }}>
      {!isLoginPage && <Layout updateLayoutHeight={_updateLayoutHeight} />}
      <Routes location={props.location} history={props.history} level={1}>
        {routers.map((router) => {
          const { Component, path } = router;
          return <Route key={path} path={path} element={<Component />} />;
        })}
      </Routes>
    </div>
  );
};
