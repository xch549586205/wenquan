import { Input, Row, Col, Tooltip, Radio, Checkbox } from "antd";
import style from "./index.less";
import "./reWriteAnt.css";
import classNames from "classnames";
import { useRef, useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
const { TextArea } = Input;
function InputItem(props) {
  const { value, className, change, deleteFunc, hideDelete, Icon } = props;
  const onChange = (e) => {
    set_Val(e.target.value);
  };
  const [_value, set_Val] = useState(value);
  const inputRef = useRef(value);
  const warpProps = {
    ref: inputRef,
    value: _value,
    onChange,
    autoSize: true,
    onBlur: () => {
      setTimeout(() => {
        if (_value !== value) {
          change(_value);
        }
      }, 100);
    },
  };
  return (
    <Row
      className={classNames({
        [style.item]: true,
        [className]: className,
      })}
    >
      <Col span={18} className={style.textArea}>
        <div>{Icon}</div>
        <TextArea {...warpProps} allowClear />
      </Col>

      {!hideDelete && (
        <div className={style.deleteIcon} onClick={deleteFunc}>
          <Tooltip title="删除此项" color="red">
            <DeleteOutlined />
          </Tooltip>
        </div>
      )}
    </Row>
  );
}
export default InputItem;
