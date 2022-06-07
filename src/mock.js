import {
  CheckOutlined,
  UnorderedListOutlined,
  FileImageOutlined,
  FilePptOutlined,
  EditOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
export const questionTypes = [
  {
    name: "单选题",
    group: "选择题",
    icon: <CheckOutlined />,
    questionId: "001",
    questionType: "singleChoice",
  },
  {
    name: "多选题",
    group: "选择题",
    icon: <UnorderedListOutlined />,
    questionId: "002",
    questionType: "mulitipleChoice",
  },
  {
    name: "图片选择",
    group: "选择题",
    icon: <FileImageOutlined />,
    questionId: "003",
    questionType: "picChoice",
  },
  {
    name: "图片投票",
    group: "选择题",
    icon: <FilePptOutlined />,
    questionId: "004",
    questionType: "picVote",
  },
  {
    name: "填空题",
    group: "填空题",
    icon: <EditOutlined />,
    questionId: "005",
    questionType: "completion",
  },
  {
    name: "多项填空",
    group: "填空题",
    icon: <OrderedListOutlined />,
    questionId: "006",
    questionType: "multipleCompletion",
  },
];
