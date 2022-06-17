组件展示:

```jsx
import React from "react";

let _questionList = [
  {
    questionId: "001",
    name: "question1",
    options: ["选项1", "选项2", "选项3"],
    checked: [],
  },
  {
    questionId: "002",
    name: "question2",
    options: ["选项4", "选项5", "选项5"],
    checked: [],
  },
  {
    questionId: "004",
    name: "question1",
    options: ["选项4", "选项5", "选项5"],
    checked: [],
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
function setCurrentIndex(params) {
  alert("更新当前点击的item的索引，提供给设置Setting组件使用");
}
<List
  list={questionList}
  updateList={updateQuestionList}
  setCurrentIndex={setCurrentIndex}
  globalOptions={globalOptions}
/>;
```
