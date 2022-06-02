import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faTasks } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import CustomeDropDown from "../../../../Container/DropDown";
import Style from "./TypeDropDown.module.css";
import { getProjectByCode } from "../../../../redux/action/ProjectAction";
import { getCrashFreeUsers } from "../../../../redux/action/LogsAction";
import {
  getLogTypeCounts,
  getLogByDate,
} from "../../../../redux/action/LogsAction";
import { alarmAction } from "../../../../redux/action/AlarmAction";

const TypeDropDown = (props) => {
  const [projectCodeDropDown, setProjectCodeDropDown] = useState(false);

  // dark-mode state
  const ref = useRef();
  const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
  const { loading, data } = getModelCodeReducer;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");

  var url_string = window.location.href;
  var url = new URL(url_string);
  console.log("url", url.href);

  const dispatch = useDispatch();

  const ProjectTypeFilter = () => {
    setProjectCodeDropDown(true);
    if (projectCodeDropDown) {
      setProjectCodeDropDown(false);
    }
  };

  // CLICKING OUTSIDE THE VIEWPORT
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // Close when click outside
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
    ProjectTypeFilter();
    // console.log('alarm error typedrop down ', {...type} )

    localStorage.setItem("project_type", JSON.stringify(type));

    // alarm action dispatch

    if (url.href.includes("alarm")) {
      dispatch(alarmAction(type.typeCode, props.diffDate));
      props.setProjectCode(type.typeCode);
    }

    if (url.href.includes("log_table")) {
      dispatch(
        getCrashFreeUsers({
          code,
          diffDate: props.diffDate,
          code1: type.typeCode,
        })
      );

      dispatch(
        getLogTypeCounts({
          code,
          diffDate: props.diffDate,
          code1: type.typeCode,
        })
      );
      dispatch(
        getLogByDate({ code, diffDate: props.diffDate, code1: type.typeCode })
      );
    }

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
  };

  return (
    <>
      {loading ? (
        <p className="darkModeColor">loading..</p>
      ) : (
        <section ref={ref}>
          <section onClick={ProjectTypeFilter} className={Style.OuterDiv}>
            <FontAwesomeIcon
              icon={faTasks}
              color="#2A9AA4"
              style={{ width: "22px", height: "25px" }}
            />
            <p className="m-2 darkModeColor" style={{ fontSize: ".9rem" }}>
              {localStorage.getItem("project_type")
                ? JSON.parse(localStorage.getItem("project_type")).typeName
                : data && data.modelList && data.modelList[0].typeName}
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
                zIndex="8"
              >
                {data &&
                  data.modelList.map((type) => {
                    return (
                      <p
                        style={{ fontSize: ".8rem" }}
                        className={`${Style.productVersion} darkModeColor`}
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
