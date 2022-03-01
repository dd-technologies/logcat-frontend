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

  const [projectCode, setProjectCode] = useState({
    code: (data && data.modelList[0].typeCode) || "",
    name: (data && data.modelList[0].typeName) || "",
  });

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
    setProjectCode({
      code: type.typeCode,
      name: type.typeName,
    });
    ProjectTypeFilter();
    console.log(
      "getProjectByCode typedropdown",
      code,
      props.diffDate,
      null,
      null,
      type.typeCode
    );

    //

    dispatch(
      getProjectByCode(
        props.tableDataState.code,
        props.tableDataState.date,
        props.tableDataState.logtype,
        null,
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
            <p style={{ fontSize: "1rem" }} className="mm-2">
              {projectCode
                ? projectCode.name
                : data && data.modelList[0].typeName}
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
