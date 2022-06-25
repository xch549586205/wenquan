import style from "./index.less";
import InputItem from "../../../InputItem";
import dragIcon from "../images/drag.svg";
import { DeleteOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { Tooltip, Button } from "antd";
import OptionItems from "../OptionItems";
const { ChoiceQuestion } = OptionItems;
const type = {
  0: "ChoiceQuestion",
};
function Item(props) {
  const {
    question,
    index,
    _provided,
    changeItemTitle,
    currentId,
    changeOption,
  } = props;
  const OptionItem = OptionItems[type[question.questiontypeid]];
  function Title() {
    return (
      <div className={style.itemTitle}>
        <span>*</span>
        <span>{index}</span>
        <InputItem
          className={style.titleInput}
          value={question.title}
          hideDelete
          change={(value) => changeItemTitle(index, value)}
        />
        <div className={style.itemTitleIcons}>
          <Tooltip title="长按拖动题目">
            <div className={style.dragIcon} {..._provided.dragHandleProps}>
              <img src={dragIcon} alt="dragIcon" />
            </div>
          </Tooltip>

          <div className={style.deleteIcon}>
            <Tooltip title="删除此题" color="red">
              <DeleteOutlined />
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }

  function AddItemOption() {
    return (
      <div className={style.button}>
        <Button
          type="primary"
          onClick={() =>
            changeOption(
              index,
              -1,
              `选项${question.options.split(",").length + 1}`
            ).edit()
          }
        >
          添加选项
        </Button>
      </div>
    );
  }

  const deleteItemOption = (optionIndex) => {
    changeOption(index, optionIndex).delete();
  };
  const changeItemOption = (optionIndex, value) => {
    changeOption(index, optionIndex, value).edit();
  };
  const options = JSON.parse(question.options);

  return (
    <div
      ref={_provided.innerRef}
      {..._provided.draggableProps}
      className={classNames({
        [style.item]: true,
      })}
    >
      <Title />
      <OptionItem
        del={deleteItemOption}
        option={options.option}
        change={changeItemOption}
      />
      {currentId === question.id && <AddItemOption />}
    </div>
  );
}

export default Item;
