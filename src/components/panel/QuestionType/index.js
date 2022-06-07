import { useState } from "react";
import style from "./index.less";
import { Tabs } from "antd";
import Tags from "./Tags";
const { TabPane } = Tabs;

function Content(props) {
  const { direction } = props;
  return (
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
  );
}
export default Content;
