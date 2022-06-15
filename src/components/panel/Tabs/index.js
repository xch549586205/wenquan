import style from "./index.less";
import Antd from "antd";
const { TabPane } = Antd.Tabs;

function Tabs(props) {
  const direction = "row";
  const { options, className } = props;
  console.log(props);
  return (
    <div className={className || ""}>
      <Antd.Tabs defaultActiveKey="1">
        {options.map(({ tabKey, title, component }) => {
          return (
            <TabPane tab={title} key={tabKey}>
              {component}
            </TabPane>
          );
        })}
      </Antd.Tabs>
    </div>
  );
}
export default Tabs;
