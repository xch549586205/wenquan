import { Tabs } from "antd";
import style from "./index.less";
import { useSelector } from "react-redux";
import { Button, Modal } from "antd";
const { TabPane } = Tabs;

function Setting() {
  const { isPhone } = useSelector((state) => state.question.panelOptions);
  return (
    <div className={isPhone ? style.MoreSettingModal : style.MoreSetting}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="全局设置" key="setting1">
          全局设置
        </TabPane>
        <TabPane tab="题目设置" key="setting2">
          对选中的题目单独设置
        </TabPane>
      </Tabs>
    </div>
  );
}

function MoreSetting(props) {
  const { isPhone, moreSetShowModal } = useSelector(
    (state) => state.question.panelOptions
  );
  const { moreSetIndex, setMoreSetIndex } = props;
  const showModal = isPhone || moreSetShowModal;
  return showModal ? (
    <Modal
      title="更多设置"
      visible={moreSetIndex > -1}
      onCancel={() => setMoreSetIndex(-1)}
    >
      <Setting />
    </Modal>
  ) : (
    <Setting />
  );
}
export default MoreSetting;
