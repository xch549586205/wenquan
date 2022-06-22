import { Switch } from "antd";

function GlobSetting(props) {
  const { globalOptions, updateGlobalOptions } = props;
  const changeOnePage = (onePage) => {
    const newGlobalOption = {
      ...globalOptions,
      onePage,
    };
    updateGlobalOptions(newGlobalOption);
  };
  return (
    <div>
      一页一行
      <Switch checked={globalOptions.onePage} onChange={changeOnePage} />
    </div>
  );
}

export default GlobSetting;
