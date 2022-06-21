import React, { useEffect } from "react";
import Panel from "@/components/Panel";
import Content from "@/components/Panel/Content";
import Tabs from "@@/src/components/Panel/Tab";
import QuestionType from "@/components/Panel/QuestionType";
import { updateMouseData } from "../../reducer/panel/panel";
import style from "./index.less";
import { useSelector, useDispatch } from "react-redux";
import mocks from "@/mock";
import { updateQuestionList, updateGlobalOptions } from "@/reducer/panel/panel";
import { Affix } from "antd";

const { groupingQuestionTypes, questionTypes } = mocks.questionType;

function Main() {
  const questionList = useSelector((state) => state.question.questionList);
  const globalOptions = useSelector((state) => state.question.globalOptions);
  const mouseData = useSelector((state) => state.question.mouseData);

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
  const _updateList = (param) => {
    dispatch(updateQuestionList(param));
  };
  const _updateGlobalOptions = (param) => {
    dispatch(updateGlobalOptions(param));
  };
  return (
    <Panel className={style.main}>
      <Affix offsetTop={1}>
        <Tabs options={options} className={style.tab} />
      </Affix>
      <Content
        className={style.content}
        isSettingModal={false}
        list={questionList}
        updateList={_updateList}
        updateGlobalOptions={_updateGlobalOptions}
        globalOptions={globalOptions}
        mouseData={mouseData}
        questionTypes={questionTypes}
      />
    </Panel>
  );
}
export default Main;
