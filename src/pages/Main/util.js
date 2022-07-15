//给题型分组
export const grouping = (questionTypes) => {
  const tags = [];
  questionTypes.map(({ name, groupid, icon, id }) => {
    if (
      groupid === 0 &&
      !tags.filter((tag) => tag.groupid === groupid).length
    ) {
      tags.push({ groupName: name, groupid: id, groupTags: [] });
    }
    const key = tags.findIndex((value) => groupid === value.groupid);
    if (key !== -1) {
      tags[key].groupTags.push({ name, icon, id, groupid: tags[key].groupid });
    }
  });
  return tags;
};

export const defaultData_questionType = (type) => {
  return {
    单选题: {
      title: "请选择一个选项",
      options: {
        option: ["选项1", "选项2", "选项3"],
      },
    },
    多选题: {
      title: "请选择以下选项 (多选)",
      options: {
        option: ["选项1", "选项2", "选项3"],
      },
    },
    文字投票: {
      title: "请给以下选项投票",
      options: {
        option: ["选项1", "选项2"],
        ticketId: new Date().getTime(),
      },
    },
    下拉题: {
      title: "请选择一个选项",
      options: {
        option: ["选项1", "选项2", "选项3"],
      },
    },
    量表题: {
      title: "请您对此项目进行评价",
      options: {
        option: ["1", "2", "3", "4", "5"],
      },
    },
    填空题: {
      title: "请填写本项内容",
      options: { option: [""] },
    },
    多项填空: {
      title: "请填写以下内容",
      options: { option: ["填空1", "填空2"] },
    },
    横向填空: {
      title: "请填写以下信息",
      options: { option: ["姓名________年龄____岁联系方式___________"] },
    },
  }[type];
};
