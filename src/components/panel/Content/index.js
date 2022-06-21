import { useState } from "react";
import style from "./index.less";
import { Row, Col } from "antd";
import List from "./List";
import Setting from "./Setting";
import PropTypes from "prop-types";
import classnames from "classnames";
function Content(props) {
  const { isSettingModal = false, className } = props;
  const [currentIndex, setCurrentIndex] = useState(-1);
  const cleanCurrentIndex = () => {
    setCurrentIndex(-1);
  };
  console.log(props.list);
  return (
    <Row
      className={classnames({
        [style.content2Right]: true,
        [className]: className,
      })}
    >
      <Col span={isSettingModal ? 24 : 20}>
        <List
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          {...props}
        />
      </Col>
      <Col span={isSettingModal ? 0 : 4}>
        <Setting
          currentIndex={currentIndex}
          cleanCurrentIndex={cleanCurrentIndex}
          {...props}
        />
      </Col>
    </Row>
  );
}

export default Content;

Content.propTypes = {
  /**
   * 设置是否以弹窗的形式显示
   */
  isSettingModal: PropTypes.bool,
  /**
   * 题目列表数据
   */
  list: PropTypes.array,
  /**
   * 需要监听的鼠标拖动事件，用来判断拖动添加题型
   */
  mouseData: PropTypes.object,
  /**
   * 题目的全局配置数据
   */
  globalOptions: PropTypes.object,
  /**
   * 更新题目的全局配置数据
   */
  updateGlobalOptions: PropTypes.func,
  /**
   * 更新题目列表数据
   */
  updateList: PropTypes.func,
  /**
   *所有的题型数据
   */
  questionTypes: PropTypes.array,
  /**
   *className
   */
  className: PropTypes.string,
};
Content.defaultProps = {
  isSettingModal: false,
  list: [],
  globalOptions: {},
  mouseData: {},
  questionTypes: [],
};
