import { useState } from "react";
import { useSelector } from "react-redux";
import style from "./index.less";
import { Row, Col } from "antd";
import QuestionList from "./QuestionList";
import MoreSetting from "./MoreSetting";

function Content() {
  const { direction, isPhone, moreSetShowModal } = useSelector(
    (state) => state.question.panelOptions
  );
  const [moreSetIndex, setMoreSetIndex] = useState(-1);
  const showModal = isPhone || moreSetShowModal;

  return (
    <Row
      className={
        direction === "row" ? style.content2Right : style.content2Bottom
      }
    >
      <Col span={showModal ? 24 : 20}>
        <QuestionList setMoreSetIndex={setMoreSetIndex} />
      </Col>
      <Col span={showModal ? 0 : 4}>
        <MoreSetting
          moreSetIndex={moreSetIndex}
          setMoreSetIndex={setMoreSetIndex}
        />
      </Col>
    </Row>
  );
}

export default Content;
