import React from "react";
import { Route, Routes } from "react-router-dom";
import routers from "./router";
// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.PureComponent {
  render() {
    return (
      <Routes
        location={this.props.location}
        history={this.props.history}
        level={1}
      >
        {routers.map((router) => {
          const { Component, path } = router;
          return <Route key={path} path={path} element={<Component />} />;
        })}
      </Routes>
    );
  }
}
