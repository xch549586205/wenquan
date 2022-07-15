import { Input, Row, Col, Tooltip, Radio, Checkbox } from "antd";
import style from "./index.less";
import classNames from "classnames";
import { useRef, useState, forwardRef } from "react";
import { DeleteOutlined } from "@ant-design/icons";
const { TextArea } = Input;

const InputItem = forwardRef((props, ref) => {
  const { value, className, change, deleteFunc, hideDelete, Icon } = props;
  const onChange = (e) => {
    set_Val(e.target.value);
  };
  const [_value, set_Val] = useState(value);
  const inputRef = useRef(value);
  const warpProps = {
    ref,
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
        <TextArea {...warpProps} />
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
});
export default InputItem;
