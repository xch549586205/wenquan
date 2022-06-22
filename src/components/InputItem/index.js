import { Input, Row, Col, Tooltip } from "antd";
import style from "./index.less";
import "./reWriteAnt.css";
import classNames from "classnames";
import { useRef, useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
const { TextArea } = Input;
function InputItem(props) {
  const { value, className, change } = props;
  const onChange = (e) => {
    set_Val(e.target.value);
  };
  const [_value, set_Val] = useState(value);
  const inputRef = useRef(value);

  const debounce = (fn, wait) => {
    let timeout = null;
    return function (input) {
      input.persist();
      if (timeout !== null) clearTimeout(timeout);
      timeout = setTimeout(fn, wait, input);
    };
  };

  return (
    <Row
      className={classNames({
        [style.item]: true,
        [className]: className,
      })}
    >
      <Col span={18}>
        <TextArea
          ref={inputRef}
          value={_value}
          onChange={onChange}
          autoSize
          onBlur={() => {
            setTimeout(() => {
              if (_value !== value) {
                change(_value);
              }
            }, 100);
          }}
        />
      </Col>

      {
        <div className={style.deleteIcon}>
          <Tooltip title="删除" color="red">
            <DeleteOutlined />
          </Tooltip>
        </div>
      }
    </Row>
  );
}
export default InputItem;
