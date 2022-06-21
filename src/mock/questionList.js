const globalOptions = {
  title: "项目标题",
  subTitle: "感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！",
  //是否显示序号
  isDisplaySequence: true,
  // 一页一行
  onePage: false,
};
const questionList = [
  {
    name: "单选题",
    title: "请选择一个选项",
    questionId: "003",
    options: ["选项1", "选项2", "选项3"],
    require: true,
  },
];
export default { globalOptions, questionList };
