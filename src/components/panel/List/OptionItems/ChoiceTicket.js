import style from "./style/choiceQuestion.less";
import InputItem from "../../../InputItem";

const Icon = () => (
  <input type="radio" class="ant-radio-input" value="" disabled></input>
);

function ChoiceQuestion(props) {
  const { change, del, option } = props;
  return (
    <div className={style.option}>
      {option.length &&
        option.map((option, optionIndex) => {
          return (
            <InputItem
              key={optionIndex + "option"}
              value={option}
              Icon={<Icon />}
              change={(value) => change(optionIndex, value)}
              deleteFunc={() => del(optionIndex)}
            />
          );
        })}
    </div>
  );
}

export default ChoiceQuestion;
