import React from "react";
import { Row, Col } from "antd";
import { Tabs } from "antd";

const { TabPane } = Tabs;

class Main extends React.PureComponent {
  onChange = (key) => {
    console.log(key);
  };
  render() {
    return (
      <Row>
        <Col span={3}>
          <Tabs defaultActiveKey="1" onChange={this.onChange}>
            <TabPane tab="题型" key="1">
              题型
            </TabPane>
            <TabPane tab="题库" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="大纲" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Col>
        <Col span={21}>col-6 col-pull-18</Col>
      </Row>
    );
  }
}
export default Main;
