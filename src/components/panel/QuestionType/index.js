import { useSelector } from "react-redux";
import style from "./index.less";
import { Tabs } from "antd";
import QuestionTags from "./QuestionTags";
const { TabPane } = Tabs;

function ContentType(props) {
  const { direction } = useSelector((state) => state.question.panelOptions);
  return (
    <div
      className={direction === "row" ? style.content1Left : style.content1Top}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="tab1" key="1">
          <QuestionTags contentRef={props.contentRef} />
        </TabPane>
        <TabPane tab="tab2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="tab3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
}
export default ContentType;
