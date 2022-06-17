import { Switch } from "antd";
function ItemSetting(props) {
  const { currentIndex, list, updateList } = props;
  const currentItem = list[currentIndex];

  const changeItemRequired = (required) => {
    const newList = [...list];
    newList[currentIndex] = {
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
