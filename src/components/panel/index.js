import style from "./index.less";

import PropTypes from "prop-types";

/**
 *Panel分为2个模块： 选项 和 列表与设置
 *
 *列表与设置分为两个子组件，即列表和设置
 */
function Panel(props) {
  const { direction, children } = props;

  return (
    <div className={direction === "row" ? style.panelRow : style.panelCol}>
      {children}
    </div>
  );
}

Panel.propTypes = {
  /** 布局方向
   *
   * row: 横向
   * col: 众向
   */
  direction: PropTypes.string,
};
Panel.defaultProps = {
  direction: "row",
};
export default Panel;
