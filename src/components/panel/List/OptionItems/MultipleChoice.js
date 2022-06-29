import style from "./MultipleChoice.less";
import InputItem from "../../../InputItem";

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
              change={(value) => change(optionIndex, value)}
              isCheckbox
              deleteFunc={() => del(optionIndex)}
            />
          );
        })}
    </div>
  );
}

export default ChoiceQuestion;
