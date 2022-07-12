import style from "./index.less";
import InputItem from "../../../InputItem";
import dragIcon from "../images/drag.svg";
import { DeleteOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { Tooltip, Button, Row, Col } from "antd";
import OptionItems from "../OptionItems";
const type = {
  1: "ChoiceQuestion",
  3: "ChoiceQuestion",
  2: "MultipleChoice",
  4: "ChoiceTicket",
  5: "PullDownQuestion",
  6: "GaugeQuestion",
};

function Title(props) {
  const { changeItemTitle, index, question, _provided, delQuestion } = props;
  return (
    <Row className={style.itemTitle}>
      <Col className={style.itemTitleLeft} span={22}>
        <Row>
          <Col span={1}>
            <span>*</span>
            <span>{index + 1}</span>
          </Col>
          <Col span={23}>
            <InputItem
              className={style.titleInput}
              value={question.title}
              hideDelete
              change={(value) => changeItemTitle(index, value)}
            />
          </Col>
        </Row>
      </Col>

      <Col className={style.itemTitleRight} span={2}>
        <Tooltip title="长按拖动题目">
          <div className={style.dragIcon} {..._provided.dragHandleProps}>
            <img src={dragIcon} alt="dragIcon" />
          </div>
        </Tooltip>

        <div className={style.deleteIcon}>
          <Tooltip
            title="删除此题"
            onClick={() => delQuestion({ id: question.id + "" })}
            color="red"
          >
            <DeleteOutlined />
          </Tooltip>
        </div>
      </Col>
    </Row>
  );
}
function Item(props) {
  const {
    question,
    index,
    _provided,
    changeItemTitle,
    delQuestion,
    currentId,
    changeOption,
  } = props;
  const OptionItem = OptionItems[type[question.questiontypeid]];
  const hideAdd = question.questiontypeid === 6;
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
      <Title
        index={index}
        question={question}
        _provided={_provided}
        changeItemTitle={changeItemTitle}
        delQuestion={delQuestion}
      />
      <OptionItem
        del={deleteItemOption}
        option={options.option}
        change={changeItemOption}
      />
      {currentId === question.id && !hideAdd && <AddItemOption />}
    </div>
  );
}

export default Item;
