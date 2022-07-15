import { Input } from "antd";

function FillInTheBlanks(props) {
  const { option } = props;
  return (
    <div>
      {option.map((row, i) => (
        <div key={"MultipleBlankFilling" + i}>
          {row}
          <Input disabled />
        </div>
      ))}
    </div>
  );
}

export default FillInTheBlanks;
