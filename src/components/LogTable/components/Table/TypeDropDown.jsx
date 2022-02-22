import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faCalendar,
  faCaretDown,
  faDatabase,
  faSync,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import CustomeDropDown from "../../../../Container/DropDown";
import Style from "./TypeDropDown.module.scss";
import Spinner from "../../../../Container/Spinner";
import {
  getCrashFreeUsers,
  getLogByDate,
  getLogTypeCounts,
  getProjectByCode,
} from "../../../../redux/action/ProjectAction";

const TypeDropDown = ({ diffDate }) => {
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
    dispatch(getProjectByCode(code, null, null, null, null, type.typeCode));
    dispatch(getCrashFreeUsers({code, diffDate, code1:type.typeCode}));
    dispatch(getLogTypeCounts({code, diffDate , code1:type.typeCode}));
    dispatch(getLogByDate({code, diffDate, code1:type.typeCode}));
    
  };

  console.log("typeCode", code);

  // useEffect(() => {
  //   dispatch(
  //     getProjectByCode(
  //       code,
  //       null,
  //       null,
  //       null,
  //       null,
  //       projectCode && projectCode.code
  //     )
  //   );
  // }, [dispatch,projectCode ]);

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

                        {console.log("type name " + type.typeName)}
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
  //   <section className={Style.filterwithDate} ref={ref}>
  //   <section className={Style.datafilter} onClick={ProjectTypeFilter}>
  //     {/* <Image src={DateIcons} /> */}
  //     <FontAwesomeIcon icon={faTasks} color='#2A9AA4' size="2x" />
  //     <p className="ms-2 p-1">
  //         {modelList[0].name}
  //         {console.log("modelList"+modelList.name)}
  //     </p>
  //     <FontAwesomeIcon icon={faCaretDown} color="" />
  //   </section>

  //   <section>
  //     {projectCodeDropDown ? (
  //       <CustomeDropDown width="100%">
  //         {
  //           modelList.map(type => {
  //           <p
  //             className="mt-1"
  //             // onClick={() => {
  //             //   setDiffDate(7);
  //             //   setDateDropDown(false);
  //             // }}
  //           >
  //             {type.name}
  //           </p>

  //           })
  //         }
  //         </CustomeDropDown>
  //     ) : null}
  //   </section>
  // </section>
};

export default TypeDropDown;
