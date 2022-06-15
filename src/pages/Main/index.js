import React, { useEffect } from "react";
import Panel from "@/components/Panel";
import Content from "@/components/Panel/Content";
import Tabs from "@/components/Panel/Tabs";
import QuestionType from "@/components/Panel/QuestionType";
import { useDispatch } from "react-redux";
import { updateMouseData } from "../../reducer/panel/panel";
import style from "./index.less";

function Main() {
  const isPhone = /Mobi|Android|iPhone/i.test(navigator.userAgent);
  const direction = "row";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "question/updatePanelOptions",
      payload: {
        panelOptions: {},
      },
    });
  }, []);

  const setMouseData = (params) => {
    dispatch(
      updateMouseData({
        ...params,
      })
    );
  };

  const options = [
    {
      tabKey: 1,
      title: "题型",
      component: <QuestionType setMouseData={setMouseData} />,
    },
    { tabKey: 2, title: "题库", component: (() => "N/A")() },
    { tabKey: 3, title: "大纲", component: (() => "N/A")() },
  ];

  return (
    <Panel isFold={true}>
      <Tabs
        options={options}
        className={direction === "row" ? style.content1Left : style.content1Top}
      />
      <Content />
    </Panel>
  );
}
export default Main;
