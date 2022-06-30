组件展示:

```jsx
import React from "react";

let _questionList = [
  {
    id: 24,
    questiontypeid: 3,
    projectid: 1,
    itemno: 2,
    name: "",
    title: "请选择一个选项3242432",
    require: "true",
    options: '{"option":["选项1","选项231231","选项312313"]}',
  },
  {
    id: 27,
    questiontypeid: 2,
    projectid: 1,
    itemno: 2,
    name: "",
    title: "请选择以下选项 (多选)",
    require: "true",
    options: '{"option":["选项1","选项6","选项7"]}',
  },
];
const globalOptions = {
  title: "项目标题",
  subTitle: "感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！",
  themeColor: "#e1e1e1",
  isDisplaySequence: true,
  onePage: false,
};
const [questionList, updateQuestionList] = React.useState(_questionList);
function setCurrentId(params) {
  // alert("更新当前点击的item的索引，提供给设置Setting组件使用");
}
const updateGlobalOptions = () => {};
<List
  list={questionList}
  mouseData={{}}
  updateList={updateQuestionList}
  setCurrentId={setCurrentId}
  globalOptions={globalOptions}
  updateGlobalOptions={() => {}}
  reorderList={() => {}}
  editItem={() => {}}
/>;
```
