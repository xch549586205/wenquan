import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import classnames from "classnames";
import style from "./index.less";
import List from "@@/src/components/Panel/List";
import { useSelector, useDispatch } from "react-redux";
import Setting from "@@/src/components/Panel/Setting";
import {
  updateQuestionList,
  updateGlobalOptions,
} from "@@/src/reducer/panel/panel";
import {
  editQuestion,
  addQuestion,
  sortQuestionList,
  delQuestion,
} from "@@/src/reducer/panel/panel";
import { defaultData_questionType } from "./util";

function Content(props) {
  const [currentId, setCurrentId] = useState(null);
  const questionList = useSelector((state) => state.question.questionList);
  const globalOptions = useSelector((state) => state.question.globalOptions);
  const mouseData = useSelector((state) => state.question.mouseData);
  const questionTypes = useSelector((state) => state.question.questionTypes);
  const dispatch = useDispatch();

  const _addQuestion = (params) => {
    const { questionTypeId, newItemIndex } = params;
    const questionTypeName = questionTypes.filter(
      (q) => q.id === questionTypeId
    )[0].name;
    const defaultData = defaultData_questionType[questionTypeName];
    dispatch(
      addQuestion({
        title: defaultData.title,
        questiontypeid: questionTypeId,
        projectid: 1,
        options: JSON.stringify(defaultData.options),
        itemno: newItemIndex,
      })
    );
  };

  const reorderList = (list) => {
    dispatch(
      sortQuestionList(
        [...list].map((question, i) => ({
          id: question.id,
          itemno: i,
        }))
      )
    );
  };

  const _delQuestion = async (param) => {
    await dispatch(delQuestion(param));
    setCurrentId(null);
  };

  const commonProps = {
    setCurrentId: setCurrentId,
    currentId,
    list: [...questionList].sort((a, b) => {
      return a.itemno - b.itemno;
    }),
    mouseData,
    updateList: (param) => {
      dispatch(updateQuestionList(param));
    },
    globalOptions,
    updateGlobalOptions: (param) => {
      dispatch(updateGlobalOptions(param));
    },
    questionTypes,
    editItem: (params) => {
      dispatch(editQuestion(params));
    },
    addItem: _addQuestion,
  };

  const { isSettingModal } = props;
  return (
    <Row
      className={classnames({
        [style.content2Right]: true,
        [style.content]: true,
      })}
    >
      <Col span={isSettingModal ? 24 : 20}>
        <List
          {...commonProps}
          reorderList={reorderList}
          delQuestion={_delQuestion}
        />
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
