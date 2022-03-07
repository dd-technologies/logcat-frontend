import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faTasks } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import CustomeDropDown from "../../../../Container/DropDown";
import Style from "./TypeDropDown.module.scss";
import {
  getCrashFreeUsers,
  getLogByDate,
  getLogTypeCounts,
  getProjectByCode,
} from "../../../../redux/action/ProjectAction";

const TypeDropDown = (props) => {
  console.log("props typedropdown", props);

  const [projectCodeDropDown, setProjectCodeDropDown] = useState(false);
  const ref = useRef();
  //   let modelList;
  const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
  const { loading, data } = getModelCodeReducer;
  // let {loading, data} = props.codeReducer;
  // const [projectCode, setProjectCode] = useState({
  //   code: localStorage.getItem("project_type")
  //     ? JSON.parse(localStorage.getItem("project_type")).typeCode
  //     : (data && data.modelList[0].typeCode),

  //   name: localStorage.getItem("project_type")
  //     ? JSON.parse(localStorage.getItem("project_type")).typeName
  //     : (data && data.modelList[0].typeName),
  // });

  // console.log("projectCosde", projectCode);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");

  const dispatch = useDispatch();

  if (data) {
    // modelList = getModelCodeReducer.data.modelList;
  }
  //   console.log('model code: '+data.modelList[0].typeName);
  const ProjectTypeFilter = () => {
    setProjectCodeDropDown(true);
    if (projectCodeDropDown) {
      setProjectCodeDropDown(false);
    }
  };

  // CLICKING OUTSIDE THE VIEWPORT
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        projectCodeDropDown &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setProjectCodeDropDown(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [projectCodeDropDown]);

  const onSubmitFun = (type) => {
    props.setProjectCode({
      code: type.typeCode,
      name: type.typeName,
    });
    ProjectTypeFilter();

    // console.log("projectCode", localStorage.getItem("project_type"));
    localStorage.setItem("page_no", 1);
    //

    dispatch(
      getProjectByCode(
        props.tableDataState.code,
        props.tableDataState.date,
        props.tableDataState.logtype,
        props.tableDataState.pageNo,
        props.tableDataState.records,
        type.typeCode
      )
    );
    //
    dispatch(
      getCrashFreeUsers({
        code,
        diffDate: props.diffDate,
        code1: type.typeCode,
      })
    );
    //
    dispatch(
      getLogTypeCounts({ code, diffDate: props.diffDate, code1: type.typeCode })
    );
    //
    dispatch(
      getLogByDate({ code, diffDate: props.diffDate, code1: type.typeCode })
    );
  };
  console.log("data data: ",data)



  //  TODO: dispatch the code depanding the local storage

  return (
    <>
      {loading ? (
        <p>loading..</p>
      ) : (
        <section ref={ref}>
          <section onClick={ProjectTypeFilter} className={Style.OuterDiv}>
            {/* <Image src={DateIcons} /> */}
            <FontAwesomeIcon
              icon={faTasks}
              color="#2A9AA4"
              style={{ width: "22px", height: "25px" }}
            />
            {
              console.log("props project code: ",props.projectCode.name)
            }
            <p style={{ fontSize: "1rem" }} className="mm-2">
              {console.log("project Code2: ",props.projectCode)}
              {
              props.projectCode
                ? props.projectCode.name
                : 
                data && data.modelList[0].typeName}
            </p>
            <FontAwesomeIcon
              icon={faCaretDown}
              color="#2A9AA4"
              style={{ width: "10px", height: "20px", marginBottom: "2px" }}
            />
          </section>

          <section>
            {projectCodeDropDown ? (
              <CustomeDropDown
                width="15%"
                position="absolute"
                alignItems="flex-start"
              >
                {data &&
                  data.modelList.map((type) => {
                    return (
                      <p
                        style={{ fontSize: "1rem !important" }}
                        className={Style.productVersion}
                        onClick={() => onSubmitFun(type)}
                      >
                        {type.typeName}
                      </p>
                    );
                  })}
              </CustomeDropDown>
            ) : null}
          </section>
        </section>
      )}
    </>
  );
};

export default TypeDropDown;
