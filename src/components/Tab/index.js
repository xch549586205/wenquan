import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;
function Tab(props) {
  const { options, className, activeKey, otherKey } = props;

  const [_activeKey, setActiveKey] = useState(activeKey);

  const onChange = (key) => {
    setActiveKey(key);
  };

  useEffect(() => {
    setActiveKey(activeKey);
  }, [activeKey, otherKey]);

  return (
    <div className={className || ""}>
      <Tabs
        defaultActiveKey="1"
        activeKey={_activeKey}
        onChange={onChange}
        type="card"
      >
        {options.map(({ tabKey, title, component, disabled }) => {
          return (
            <TabPane tab={title} key={tabKey} disabled={disabled}>
              {component}
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
}

Tab.propTypes = {
  /**
   * tab配置
   */
  options: PropTypes.array,
  /**
   * 	当前激活 tab 面板的 key
   */
  activeKey: PropTypes.string,
};
Tab.defaultProps = {
  options: [],
};

export default Tab;
