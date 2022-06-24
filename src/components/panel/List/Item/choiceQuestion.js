import classNames from "classnames";
import style from "./choiceQuestion.less";
import InputItem from "../../../InputItem";
import { Tooltip, Button } from "antd";
import dragIcon from "./images/drag.svg";
import { DeleteOutlined } from "@ant-design/icons";

function Item(props) {
  const { className, question, index, _provided, currentId, changeOptions } =
    props;

  const options = JSON.parse(question.options);
  const { option } = options;
  return (
    <div
      className={classNames({
        [style.item]: true,
        [className]: className,
      })}
    >
      <div className={style.itemTitle}>
        <span>*</span>
        <span>{index}</span>
        <InputItem value={question.name} hideDelete />
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
      <div className={style.option}>
        {option.length &&
          option.map((option, optionIndex) => {
            return (
              <InputItem
                key={optionIndex + "option"}
                value={option}
                change={(value) =>
                  changeOptions(index, optionIndex, value).edit()
                }
                deleteFunc={() => changeOptions(index, optionIndex).delete()}
              />
            );
          })}
      </div>
      {currentId === question.id && (
        <div className={style.button}>
          <Button
            type="primary"
            onClick={() =>
              changeOptions(
                index,
                -1,
                `选项${question.options.split(",").length + 1}`
              ).edit()
            }
          >
            添加选项
          </Button>
        </div>
      )}
    </div>
  );
}

export default Item;
