import { useState } from "react";
import style from "./index.less";
import { Row, Col } from "antd";
import List from "./List";
import Setting from "./Setting";

function Content(props) {
  const { showModal = false, direction = "row" } = props;
  const [moreSetIndex, setMoreSetIndex] = useState(-1);

  return (
    <Row
      className={
        direction === "row" ? style.content2Right : style.content2Bottom
      }
    >
      <Col span={showModal ? 24 : 20}>
        <List setMoreSetIndex={setMoreSetIndex} />
      </Col>
      <Col span={showModal ? 0 : 4}>
        <Setting
          moreSetIndex={moreSetIndex}
          setMoreSetIndex={setMoreSetIndex}
        />
      </Col>
    </Row>
  );
}

export default Content;
