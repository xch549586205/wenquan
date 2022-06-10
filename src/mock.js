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
    name: "question1",
    group: "group1",
    icon: <CheckOutlined />,
    questionId: "001",
    questionType: "singleChoice",
  },
  {
    name: "question2",
    group: "group1",
    icon: <UnorderedListOutlined />,
    questionId: "002",
    questionType: "mulitipleChoice",
  },
  {
    name: "question3",
    group: "group1",
    icon: <FileImageOutlined />,
    questionId: "003",
    questionType: "picChoice",
  },
  {
    name: "question4",
    group: "group1",
    icon: <FilePptOutlined />,
    questionId: "004",
    questionType: "picVote",
  },
  {
    name: "question1",
    group: "group2",
    icon: <EditOutlined />,
    questionId: "005",
    questionType: "completion",
  },
  {
    name: "question2",
    group: "group2",
    icon: <OrderedListOutlined />,
    questionId: "006",
    questionType: "multipleCompletion",
  },
];
