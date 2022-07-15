import { Card, Col, Row, Popover, Button } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

function Project(props) {
  const { list, goEdit } = props;
  const MoreContent = ({ id }) => {
    return (
      <div>
        <Button type="primary" danger onClick={() => props.deleteProject(id)}>
          删除
        </Button>
      </div>
    );
  };
  const types = {
    1: "问券",
    2: "门禁",
  };
  return (
    <Row gutter={16}>
      {list.length > 0 &&
        list.map((project, i) => {
          return (
            <Col span={8} key={"projectCard" + i}>
              <Card
                title={project.name + "-" + types[project.type]}
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined
                    key="edit"
                    onClick={() => goEdit(project.id)}
                  />,
                  <Popover
                    content={<MoreContent id={project.id} />}
                    trigger="click"
                  >
                    <EllipsisOutlined key="ellipsis" />
                  </Popover>,
                ]}
              >
                {project.state === 1 ? "未发布" : "已发布"}
              </Card>
            </Col>
          );
        })}
    </Row>
  );
}

export default Project;
