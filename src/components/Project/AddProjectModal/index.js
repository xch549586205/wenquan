import { Form, Modal, Input, Radio, Button, DatePicker } from "antd";
import { useState } from "react";
import moment from "moment";
const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};
function AddProjectModal(props) {
  const [checkVal, setCheckVal] = useState(1);
  const defaultFields = [
    {
      name: ["type"],
      value: 1,
    },
    {
      name: ["limit_time"],
      value: moment(
        moment().add(1, "d").format("YYYY-MM-DD HH:mm"),
        "YYYY-MM-DD HH:mm"
      ),
    },
  ];
  const [fields, ChangeFields] = useState(defaultFields);
  const onChange = (e) => {
    setCheckVal(e.target.value);
  };
  const onFinish = (values) => {
    console.log(values);
    if (values.limit_time) {
      values.limit_time = values.limit_time.format("YYYY-MM-DD_HH:mm");
    }
    props.addProject(values);
  };
  const typeFields = fields.filter((f) => f.name.indexOf("type") !== -1);
  const isType2 = Boolean(
    typeFields.length &&
      fields.filter((f) => f.name.indexOf("type") !== -1)[0].value === 2
  );
  const disabledDateTime = (e) => {
    if (!e) {
      return;
    }
    console.log(e.format("YYYY-MM-DD HH:mm"));
    const isToday = e.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD");
    const isTodayHour =
      e.format("YYYY-MM-DD HH") === moment().format("YYYY-MM-DD HH");
    const disabledHours = !isToday
      ? () => range(0)
      : () => range(0, 24).splice(0, moment().format("HH"));
    const disabledMinutes = !isTodayHour
      ? () => range(0)
      : () => range(0, 60).splice(0, moment().format("mm"));
    return {
      disabledHours,
      disabledMinutes,
    };
  };
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().add(-1, "d").endOf("day");
  };
  return (
    <Modal
      title="新增项目"
      visible={props.visible}
      keyboard
      footer={null}
      closable
      destroyOnClose
      onCancel={props.hideModal}
      afterClose={() => ChangeFields(defaultFields)}
    >
      <Form
        name="normal_login"
        onFinish={onFinish}
        fields={fields}
        onFieldsChange={(_, allFields) => {
          ChangeFields(allFields);
        }}
      >
        <Form.Item
          label="请选择您要创建的类型:"
          name="type"
          rules={[{ required: true, message: "请选择您要创建的类型!" }]}
        >
          <Radio.Group onChange={onChange} value={checkVal}>
            <Radio value={1}>问券</Radio>
            <Radio value={2}>门禁</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="请输入项目名称:"
          name="name"
          rules={[{ required: true, message: "请输入项目名称!" }]}
        >
          <Input />
        </Form.Item>
        {isType2 && (
          <Form.Item
            label="请选择有效日期:"
            name="limit_time"
            rules={[{ required: true, message: "请选择有效日期!" }]}
          >
            <DatePicker
              format="YYYY-MM-DD HH:mm"
              placeholder="请选择有效日期"
              showToday
              defaultValue={moment(
                moment().add(1, "d").format("YYYY-MM-DD HH:mm"),
                "YYYY-MM-DD HH:mm"
              )}
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              showTime={{
                defaultValue: moment(
                  moment().add(1, "d").format("HH:mm"),
                  "HH:mm"
                ),
              }}
            />
          </Form.Item>
        )}
        {isType2 && (
          <Form.Item
            label="最大允许人数:"
            name="limit_person_number"
            rules={[{ required: true, message: "请输入项目名称!" }]}
          >
            <Input type="number" />
          </Form.Item>
        )}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={props.hideModal}>
            取消
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: "10px" }}
          >
            确定
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddProjectModal;
