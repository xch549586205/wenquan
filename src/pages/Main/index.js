import React, { useEffect } from "react";
import Panel from "@/components/Panel";
import Content from "./Content";
import Tabs from "@@/src/components/Tab";
import QuestionType from "@/components/Panel/QuestionType";
import { updateMouseData } from "../../reducer/panel/panel";
import style from "./index.less";
import { useSelector, useDispatch } from "react-redux";
import { Affix } from "antd";
import { grouping } from "./util";
import { getQuestionTypes, getQuestionList } from "@@/src/reducer/panel/panel";
import { setProjectId } from "@@/src/reducer/project/project";
import { useParams } from "react-router-dom";
function Main() {
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    dispatch(getQuestionTypes());
    dispatch(getQuestionList({ projectid: params.id }));
  }, []);

  useEffect(() => {
    dispatch(setProjectId(params.id));
  }, [params.id]);

  const questionTypes = useSelector((state) => state.question.questionTypes);
  const navbarHeight = useSelector((state) => state.layout.navbarHeight);
  const groupingQuestionTypes = grouping(questionTypes);

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
    <Panel
      className={style.main}
      style={{ height: `calc( 100vh - ${navbarHeight + "px"})` }}
    >
      <Affix offsetTop={navbarHeight + 1} key={navbarHeight + "navbarHeight"}>
        <Tabs options={questionTypeOptions} className={style.tab} />
      </Affix>
      <Content isSettingModal={false} />
    </Panel>
  );
}
export default Main;
