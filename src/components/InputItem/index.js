import { Input } from "antd";
import style from "./index.less";
import "./reWriteAnt.css";
import classNames from "classnames";
import { useRef, useState } from "react";
function InputItem(props) {
  const { value, className, change } = props;
  const onChange = (e) => {
    set_Val(e.target.value);
  };
  const [_value, set_Val] = useState(value);
  const inputRef = useRef(null);
  return (
    <div
      className={classNames({
        [style.item]: true,
        [className]: className,
      })}
    >
      <Input
        ref={inputRef}
        className={className}
        value={_value}
        onChange={onChange}
        onBlur={() => {
          change(_value);
        }}
      />
    </div>
  );
}
export default InputItem;
