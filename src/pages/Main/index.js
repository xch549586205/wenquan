import React, { useEffect } from "react";
import Panel from "@/components/Panel";
import Content from "./Content";
import Tabs from "@@/src/components/Tab";
import QuestionType from "@/components/Panel/QuestionType";
import { updateMouseData } from "../../reducer/panel/panel";
import style from "./index.less";
import { useSelector, useDispatch } from "react-redux";
import mocks from "@/mock";
import { Affix } from "antd";
import { grouping } from "./util";
import { getQuestionTypes } from "@/reducer/panel/panel";

function Main() {
  useEffect(() => {
    dispatch(getQuestionTypes());
  }, []);
  const questionTypes = useSelector((state) => state.question.questionTypes);
  const groupingQuestionTypes = grouping(questionTypes);
  const dispatch = useDispatch();

  const setMouseData = (params) => {
    dispatch(
      updateMouseData({
        ...params,
      })
    );
  };

  const questionTypeOptions = [
    {
      tabKey: 1,
      title: "题型",
      component: (
        <QuestionType
          setMouseData={setMouseData}
          groupingQuestionTypes={groupingQuestionTypes}
        />
      ),
    },
    { tabKey: 2, title: "题库", component: (() => "N/A")() },
    { tabKey: 3, title: "大纲", component: (() => "N/A")() },
  ];

  return (
    <Panel className={style.main}>
      <Affix offsetTop={1}>
        <Tabs options={questionTypeOptions} className={style.tab} />
      </Affix>
      <Content isSettingModal={false} />
    </Panel>
  );
}
export default Main;
