import style from "./style/GaugeQuestion.less";

// 量表题
function ChoiceQuestion(props) {
  const { option } = props;
  return (
    <div className={style.option}>
      {option.length &&
        option.map((option, optionIndex) => {
          return (
            <div key={optionIndex + "option"}>
              <input type="radio" value="" disabled></input>
              <span>{option}</span>
            </div>
          );
        })}
    </div>
  );
}

export default ChoiceQuestion;
