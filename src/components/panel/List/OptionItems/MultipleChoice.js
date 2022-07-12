import style from "./style/MultipleChoice.less";
import InputItem from "../../../InputItem";

const Icon = () => <input type="checkbox" value="" disabled />;
function ChoiceQuestion(props) {
  const { change, del, option } = props;
  return (
    <div className={style.option}>
      {option.length &&
        option.map((option, optionIndex) => {
          return (
            <InputItem
              Icon={<Icon />}
              key={optionIndex + "option"}
              value={option}
              change={(value) => change(optionIndex, value)}
              deleteFunc={() => del(optionIndex)}
            />
          );
        })}
    </div>
  );
}

export default ChoiceQuestion;
