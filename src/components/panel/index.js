import { createRef, useEffect } from "react";
import style from "./index.less";
import QuestionContent from "./Content";
import QuestionType from "./Tabs";
import { Layout } from "antd";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

const { Sider } = Layout;
/**
*Panel分为2个模块： 选项 和 列表与设置
*
*列表与设置分为两个子组件，即列表和设置
*/
function Panel(props) {
  const { direction = "row", isFold = true, moreSetShowModal = false } = props;
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
  /** 面板排版的方向
  * 
  * "row": 选项模块在左，列表和设置模块在右
  * 
  * "col"：选项模块在上，列表和设置模块在下
  * 
  */
  direction: PropTypes.string,
  /** 题目的设置是否弹窗显示*/
  isSettingModal: PropTypes.bool,
  /** 选项是否可折叠隐藏，默认可折叠*/
  isFold: PropTypes.bool,
  /** 是否支持拖拽添加题目*/
  isSuppertDrag: PropTypes.bool,
   
};
Panel.defaultProps = {
  direction: "row",
  isSettingModal: false,
  isFold: true,
  isSuppertDrag: true
};
export default Panel;
