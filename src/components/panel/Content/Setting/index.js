import style from "./index.less";
import { Modal, Switch } from "antd";
import Tabs from "../../Tabs";

function Setting(props) {
  const { moreSetIndex, setMoreSetIndex, isSettingModal } = props;
  function GlobSetting() {
    return <div>全局设置</div>;
  }
  const options = [
    {
      tabKey: "set1",
      title: "全局设置",
      component: (() => "N/A")(),
    },
    { tabKey: "set2", title: "题目设置", component: (() => "N/A")() },
  ];
  return isSettingModal ? (
    <Modal
      title="更多设置"
      visible={moreSetIndex > -1}
      onCancel={() => setMoreSetIndex(-1)}
    >
      <Tabs
        options={options}
        isSettingModal={isSettingModal}
        className={style.MoreSettingModal}
      />
    </Modal>
  ) : (
    <Tabs
      options={options}
      isSettingModal={isSettingModal}
      className={style.MoreSetting}
    />
  );
}

export default Setting;
