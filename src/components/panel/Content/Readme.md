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

let _globalOption = {
  title: "项目标题",
  subTitle: "感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！",
  themeColor: "#e1e1e1",
  isDisplaySequence: true,
  onePage: false,
};

const [questionList, updateQuestionList] = React.useState(_questionList);
const [globalOptions, updateGlobalOptions] = React.useState(_globalOption);

<Content
  //尝试把isSettingModal修改成true
  isSettingModal={false}
  list={questionList}
  updateList={updateQuestionList}
  globalOptions={globalOptions}
  updateGlobalOptions={updateGlobalOptions}
/>;
```
