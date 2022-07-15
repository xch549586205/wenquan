import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api";
import { Button } from "antd";
import Cookies from "js-cookie";
import Project from "@/components/Project";
import moment from "moment";
import AddProjectModal from "@/components/Project/AddProjectModal";
const projectApi = api.project;

function ProjectPage() {
  const [projectList, setProjectList] = useState([]);
  const [modalFlag, setModalFlag] = useState({
    show: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getProjectList();
  }, []);

  const getProjectList = async () => {
    const userInfo = Cookies.get("userInfo")
      ? JSON.parse(Cookies.get("userInfo"))
      : {};
    const res = await projectApi.getProjectList({ userid: userInfo.id + "" });
    const { errcode, errmsg, data } = res.data;
    if (errcode === 200 && errmsg === "Success") {
      setProjectList(data);
    }
  };

  const addProject = async (params) => {
    const userInfo = Cookies.get("userInfo");
    try {
      await projectApi.addProject({
        ...params,
        userid: JSON.parse(userInfo).id + "",
        state: 1,
        create_time: moment().format("YYYY-MM-DD: HH:mm"),
      });
    } catch (error) {
      console.error(error);
    }
    setModalFlag({ show: false });
    getProjectList();
  };

  const goEdit = (id) => {
    navigate(`/main/${id}`);
  };

  const deleteProject = async (id) => {
    try {
      await projectApi.deleteProject({ id: id + "" });
      getProjectList();
    } catch (error) {}
    };
    
  const addModal = () => {
    setModalFlag({
      ...modalFlag,
      show: true,
    });
  };

  return (
    <div>
      <AddProjectModal
        visible={modalFlag.show}
        hideModal={() => setModalFlag({ show: false })}
        addProject={addProject}
      />
      <Project
        list={projectList}
        goEdit={goEdit}
        deleteProject={deleteProject}
      />
      <Button type="primary" style={{ marginTop: "50px" }} onClick={addModal}>
        新增项目
      </Button>
    </div>
  );
}

export default ProjectPage;
