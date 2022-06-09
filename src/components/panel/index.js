import { createRef, useEffect } from "react";
import style from "./index.less";
import QuestionContent from "./QuestionContent";
import QuestionType from "./QuestionType";
import { Layout } from "antd";
import propTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

const { Sider } = Layout;
function Panel(props) {
  const { direction = "row" } = props;
  const isPhone = /Mobi|Android|iPhone/i.test(navigator.userAgent);
  const contentRef = createRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "question/updatePanelOptions",
      payload: {
        panelOptions: {
          direction,
          isPhone,
        },
      },
    });
  }, []);
  return (
    <div className={direction === "row" ? style.panelRow : style.panelCol}>
      {isPhone && direction === "row" && (
        <Sider breakpoint="lg" collapsedWidth="0">
          <QuestionType contentRef={contentRef} />
        </Sider>
      )}
      {(!isPhone || direction !== "row") && (
        <QuestionType contentRef={contentRef} />
      )}
      <QuestionContent contentRef={contentRef} />
    </div>
  );
}

Panel.propTypes = {
  //面板方向 row column
  direction: propTypes.string,
};
export default Panel;
