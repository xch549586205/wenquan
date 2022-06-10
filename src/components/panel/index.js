import { createRef, useEffect } from "react";
import style from "./index.less";
import QuestionContent from "./QuestionContent";
import QuestionType from "./QuestionType";
import { Layout } from "antd";
import propTypes from "prop-types";
import { useDispatch } from "react-redux";

const { Sider } = Layout;
function Panel(props) {
  const {
    direction = "row",
    isSuppertPhone = true,
    moreSetShowModal = false,
  } = props;
  const isPhone =
    /Mobi|Android|iPhone/i.test(navigator.userAgent) && isSuppertPhone;
  const contentRef = createRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "question/updatePanelOptions",
      payload: {
        panelOptions: {
          direction,
          isPhone,
          moreSetShowModal,
        },
      },
    });
  }, []);
  return (
    <div className={direction === "row" ? style.panelRow : style.panelCol}>
      {isPhone && direction === "row" && (
        <Sider breakpoint="lg" collapsedWidth="0" width="35%">
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
  // 面板方向 row column
  direction: propTypes.string,
  // 是否支持手机
  isSuppertPhone: propTypes.bool,
  // 更多设置是否弹窗显示
  moreSetShowModal: propTypes.bool,
};
export default Panel;
