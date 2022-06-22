import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import classnames from "classnames";
import style from "./index.less";
import List from "@@/src/components/Panel/List";
import { useSelector, useDispatch } from "react-redux";
import Setting from "@@/src/components/Panel/Setting";
import mocks from "@/mock";
import { updateQuestionList, updateGlobalOptions } from "@/reducer/panel/panel";
import { grouping } from "./util";

function Content(props) {
  const [currentId, setCurrentId] = useState("");
  const questionList = useSelector((state) => state.question.questionList);
  const globalOptions = useSelector((state) => state.question.globalOptions);
  const mouseData = useSelector((state) => state.question.mouseData);
  const questionTypes = useSelector((state) => state.question.questionTypes);
  const groupingQuestionTypes = grouping(questionTypes);
  const dispatch = useDispatch();

  const { isSettingModal } = props;

  const updateList = (param) => {
    dispatch(updateQuestionList(param));
  };
  const _updateGlobalOptions = (param) => {
    dispatch(updateGlobalOptions(param));
  };
  const commonProps = {
    setCurrentId: setCurrentId,
    currentId,
    list: questionList,
    mouseData,
    updateList,
    globalOptions,
    updateGlobalOptions: _updateGlobalOptions,
    questionTypes,
  };
  return (
    <Row
      className={classnames({
        [style.content2Right]: true,
        [style.content]: true,
      })}
    >
      <Col span={isSettingModal ? 24 : 20}>
        <List {...commonProps} />
      </Col>
      <Col span={isSettingModal ? 0 : 4}>
        <Setting
          {...commonProps}
          cleanCurrentId={() => {
            setCurrentId("");
          }}
          isSettingModal={isSettingModal}
        />
      </Col>
    </Row>
  );
}
export default Content;
