import style from "./style/GaugeQuestion.less";
import InputItem from "../../../InputItem";
import { Radio } from "antd";
const Icon = () => <input type="radio" value="" disabled></input>;
function ChoiceQuestion(props) {
  const { change, del, option } = props;
  return (
    <div className={style.option}>
      {option.length &&
        option.map((option, optionIndex) => {
          return (
            <div key={optionIndex + "option"}>
              <input type="radio" value="" disabled></input>
              <span>{option}</span>
            </div>
            // <InputItem
            //   Icon={<Icon />}
            //   key={optionIndex + "option"}
            //   value={option}
            //   isRadio
            //   change={(value) => change(optionIndex, value)}
            //   deleteFunc={() => del(optionIndex)}
            // />
          );
        })}
    </div>
  );
}

export default ChoiceQuestion;
