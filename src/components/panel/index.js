import React from "react";
import Tags from "./Tags";
import { Row, Tabs, Col } from "antd";
import style from "./index.less";
import QuestionContent from "./QuestionContent";
import propTypes from "prop-types";

const { TabPane } = Tabs;

function Panel(props) {
  const { direction = "row" } = props;

  return (
    <div className={direction === "row" ? style.panelRow : style.panelCol}>
      <div
        className={direction === "row" ? style.content1Left : style.content1Top}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="题型" key="1">
            <Tags />
          </TabPane>
          <TabPane tab="题库" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="大纲" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
      <div
        className={
          direction === "row" ? style.content2Right : style.content2Bottom
        }
      >
        <QuestionContent />
      </div>
    </div>
  );
}

Panel.propTypes = {
  //面板方向 row column
  direction: propTypes.string,
};
export default Panel;
