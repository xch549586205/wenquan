import { Switch } from "antd";
function ItemSetting(props) {
  const { currentId, list, updateList } = props;
  const currentItem = currentId
    ? list.filter((item) => item.id === currentId)[0]
    : {};

  const changeItemRequired = (required) => {
    const newList = [...list];
    const index = newList.findIndex((value) => value.id === currentId);
    newList[index] = {
      ...currentItem,
      required,
    };
    updateList(newList);
  };
  return (
    <div>
      {currentItem.name}
      此题必答
      <Switch
        checked={currentItem.required || false}
        onChange={changeItemRequired}
      />
    </div>
  );
}

export default ItemSetting;
