组件效果

```javascript
import "antd/dist/antd.css";
import QuestionType from "../QuestionType/index";
import { groupingQuestionTypes } from "../../../mock";

const options = [
  {
    tabKey: "1",
    title: "题型",
    component: <QuestionType groupingQuestionTypes={groupingQuestionTypes} />,
  },
  {
    tabKey: "2",
    title: "大纲",
    component: (() => "N/A")(),
  },
];
<Tab options={options} />;
```
