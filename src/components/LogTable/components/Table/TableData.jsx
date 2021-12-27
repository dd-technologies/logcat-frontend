import React from "react";
import CustomCard from "../../../../Container/CustomCard";
import BootstrapTable from "react-bootstrap-table-next";
import { useSelector } from "react-redux";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

export default function TableData() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");

  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );

  // const {
  //   data: { data: alldata },
  // } = getAllLogByCodeReducer;

  // const { logs } = alldata;

  console.log("getAllLogByCodeReducer", getAllLogByCodeReducer);
  const { SearchBar } = Search;
  const products = [
    {
      did: "111",
      logMsg:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      logType: "111",
      logGeneratedDate: "111",
      device_types: "111",
      device_types: "111",
    },
    {
      did: "222",
      logMsg:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      logType: "222",
      logGeneratedDate: "222",
      device_types: "222",
      device_types: "222",
    },
    {
      did: "333",
      logMsg: "333",
      logType: "333",
      logGeneratedDate: "333",
      device_types: "333",
      device_types: "333",
    },
  ];
  const columns = [
    {
      dataField: "did",
      text: "Mac address",
      sort: true,
      headerStyle: () => {
        return {
          width: "10%",
          backgroundColor: "#257d7c",
          color: "#fff",
        };
      },
    },
    {
      dataField: "logMsg",
      text: "Log Message",
      sort: true,
      formatter: (col, row) => {
        // console.log("row id mil", row);
        const codeUrl = urlParams.get("code");
        console.log("now_code", codeUrl);

        return (
          <div style={{ width: "210px", height: "auto", overflow: "hidden" }}>
            <ReactReadMoreReadLess
              charLimit={40}
              readMoreText={"Read more ▼"}
              readLessText={"Read less ▲"}
            >
              {col}
            </ReactReadMoreReadLess>
            <Link
              to={`/stackError?code=${codeUrl}&name=Stack Trace&id=${row._id}&allStacks=${row.logMsg}&macAddress=${row.did}&loggenrateddate=${row.logGeneratedDate}&modeltype=${row.device_types}&logtype=${row.logType}&version=${row.updatedAt}`}
            >
              <Button
                style={{
                  float: "right",
                  borderRadius: "50px",
                }}
                onClick={() => {}}
              >
                View
                <FontAwesomeIcon icon={faCaretRight} className="ms-1" />
              </Button>
            </Link>
          </div>
        );
      },
      headerStyle: () => {
        return {
          width: "10%",
          backgroundColor: "#257d7c",
          color: "#fff",
        };
      },
    },
    {
      dataField: "logType",
      text: "Log Type",
      sort: true,
      headerStyle: () => {
        return {
          width: "10%",
          backgroundColor: "#257d7c",
          color: "#fff",
        };
      },
    },
    {
      dataField: "logGeneratedDate",
      text: "Log Generated At",
      sort: true,
      headerStyle: () => {
        return {
          width: "10%",
          backgroundColor: "#257d7c",
          color: "#fff",
        };
      },
    },
    {
      dataField: "device_types",
      text: "Device Code",
      sort: true,
      headerStyle: () => {
        return {
          width: "10%",
          backgroundColor: "#257d7c",
          color: "#fff",
        };
      },
    },
    {
      dataField: "device_types",
      text: "Device Type",
      sort: true,
      headerStyle: () => {
        return {
          width: "10%",
          backgroundColor: "#257d7c",
          color: "#fff",
        };
      },
    },
  ];

  return (
    <>
      <CustomCard>
        <section className="p-4">
          <ToolkitProvider
            keyField="id"
            data={products}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <SearchBar {...props.searchProps} />
                <hr />
                <BootstrapTable {...props.baseProps} />
              </div>
            )}
          </ToolkitProvider>
        </section>
      </CustomCard>
    </>
  );
}

{
  /* <BootstrapTable keyField="id" data={products} columns={columns} /> */
}
