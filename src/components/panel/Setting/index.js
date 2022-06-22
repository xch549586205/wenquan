import style from "./index.less";
import { Modal, Affix } from "antd";
import Tab from "../../Tab";
import GlobSetting from "./GlobSetting";
import PropTypes from "prop-types";
import ItemSetting from "./ItemSetting";
import { useState, useEffect } from "react";

function Setting(props) {
  const {
    currentId,
    cleanCurrentId,
    isSettingModal,
    updateGlobalOptions,
    globalOptions,
    list,
    updateList,
  } = props;
  const [activeKey, setActiveKey] = useState(currentId ? "set2" : "set1");

  useEffect(() => {
    setActiveKey(currentId ? "set2" : "set1");
  }, [currentId]);

  const options = [
    {
      tabKey: "set1",
      title: "全局设置",
      component: (
        <GlobSetting
          globalOptions={globalOptions}
          updateGlobalOptions={updateGlobalOptions}
        />
      ),
    },
    {
      tabKey: "set2",
      title: "题目设置",
      component: (
        <ItemSetting
          currentId={currentId}
          list={list}
          updateList={updateList}
        />
      ),
      disabled: !currentId,
    },
  ];

  // currentId;
  return isSettingModal ? (
    <Modal title="更多设置" visible={currentId} onCancel={cleanCurrentId}>
      <Tab
        options={options}
        isSettingModal={isSettingModal}
        className={style.MoreSettingModal}
        otherKey={currentId}
        activeKey={activeKey}
      />
    </Modal>
  ) : (
    <Affix
      style={{ width: "100%", position: "absolute", top: 0 }}
      offsetTop={1}
    >
      <Tab
        options={options}
        isSettingModal={isSettingModal}
        activeKey={activeKey}
        className={style.MoreSetting}
        otherKey={currentId}
      />
    </Affix>
  );
}

export default Setting;

Setting.propTypes = {
  /**
   * 设置是否以弹窗的形式显示
   */
  isSettingModal: PropTypes.bool,
  /**
   * 题目列表数据
   */
  list: PropTypes.array,
  /**
   * 题目的全局配置
   */
  globalOptions: PropTypes.object,
  /**
   * 更新题目的全局配置
   */
  updateGlobalOptions: PropTypes.func,
  /**
   * 更新题目列表数据
   */
  updateList: PropTypes.func,
  /**
   * 当前被点击选中的题目的索引
   */
  currentId: PropTypes.string,
  /**
   * 清除当前被点击选中的题目的索引，当Content的属性isSettingModal被设为true时，弹窗模式用来关闭弹窗
   */
  cleanCurrentId: PropTypes.func,
};
Setting.defaultProps = {
  isSettingModal: false,
  list: [],
  globalOptions: {},
};
