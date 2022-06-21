import {
  CheckOutlined,
  UnorderedListOutlined,
  FileImageOutlined,
  FilePptOutlined,
  EditOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";

const questionTypes = [
  {
    name: "单选题",
    title: "请选择一个选项",
    group: "选择题",
    icon: <CheckOutlined />,
    questionId: "001",
  },
  {
    name: "多选题",
    group: "选择题",
    title: "请选择以下选项 (多选)",
    icon: <UnorderedListOutlined />,
    questionId: "002",
  },
  {
    name: "图片选择",
    group: "选择题",
    icon: <FileImageOutlined />,
    questionId: "003",
  },
  {
    name: "图片投票",
    group: "选择题",
    icon: <FilePptOutlined />,
    questionId: "004",
  },
  {
    name: "填空题",
    group: "填空题",
    icon: <EditOutlined />,
    questionId: "005",
  },
  {
    name: "多项填空",
    group: "填空题",
    icon: <OrderedListOutlined />,
    questionId: "006",
  },
];
//给题型分组
const groupingQuestionTypes = (() => {
  const tags = [];
  questionTypes.map(({ name, group, icon, questionId }) => {
    if (!tags.filter((tag) => tag.groupName === group).length) {
      tags.push({ groupName: group, groupTags: [] });
    }
    const key = tags.findIndex((value) => value.groupName === group);
    if (key !== -1) {
      tags[key].groupTags.push({ name, icon, questionId });
    }
  });
  return tags;
})();

// eslint-disable-next-line import/no-anonymous-default-export
export default { groupingQuestionTypes, questionTypes };
