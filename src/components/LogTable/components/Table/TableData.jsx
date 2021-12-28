import React, { useState, useEffect } from "react";
import CustomCard from "../../../../Container/CustomCard";
import BootstrapTable from "react-bootstrap-table-next";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import Style from "./TableData.module.scss";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getProjectByCode } from "../../../../redux/action/ProjectAction";
import Spinner from "../../../../Container/Spinner";

const { SearchBar } = Search;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const { ExportCSVButton } = CSVExport;

function errorFormatter(cell, row) {
  if (row.logType) {
    return (
      <span>
        {cell === "error" ? (
          <strong style={{ color: "red" }}>{cell.toUpperCase()}</strong>
        ) : cell === "warn" ? (
          <strong style={{ color: "violet" }}>{cell.toUpperCase()}</strong>
        ) : cell === "info" ? (
          <strong style={{ color: "blue" }}>{cell.toUpperCase()}</strong>
        ) : cell === "verbose" ? (
          <strong style={{ color: "green" }}>{cell.toUpperCase()}</strong>
        ) : (
          <strong style={{ color: "orange" }}>{cell.toUpperCase()}</strong>
        )}
      </span>
    );
  }

  return <span>$ {cell} NTD</span>;
}

const defaultSorted = [
  {
    dataField: "name",
    order: "desc",
  },
];

var queryAllSting = { value1: "at", value2: "" };

const StackOptions = () => {
  localStorage.setItem("queryAllSting", JSON.stringify(queryAllSting));
};

const columns = [
  {
    headerStyle: () => {
      return {
        backgroundColor: "#257d7c",
        color: "#fff",
      };
    },
    dataField: "did",
    text: "Mac address",
    sort: true,
  },

  {
    dataField: "logMsg",
    text: "Log Message",
    headerAlign: "center",
    headerStyle: () => {
      return {
        backgroundColor: "#257d7c",
        color: "#fff",
      };
    },
    formatter: (col, row) => {
      // console.log("row id mil", row);
      const code = urlParams.get("code");
      // const version = urlParams.get('version')
      // const osArchitecture = urlParams.get('osArchitecture')
      // console.log("now_code", code);

      return (
        <div style={{ width: "250px", height: "auto", overflow: "hidden" }}>
          <ReactReadMoreReadLess
            charLimit={40}
            readMoreText={"Read more ▼"}
            readLessText={"Read less ▲"}
          >
            {col}
          </ReactReadMoreReadLess>
          <Link
            to={`/analytics?code=${code}&name=Stack Trace&id=${row._id}&allStacks=${row.logMsg}&macAddress=${row.did}&loggenrateddate=${row.logGeneratedDate}&modeltype=${row.device_types}&logtype=${row.logType}`}
          >
            <Button className={Style.ViewButton}>
              View
              <span className="p-2">
                <FontAwesomeIcon icon={faCaretRight} />
              </span>
            </Button>
          </Link>
        </div>
      );
    },

    // style: { backgroundColor: 'green' }
  },
  {
    dataField: "logType",
    text: "Log Type",
    headerStyle: () => {
      return {
        backgroundColor: "#257d7c",
        color: "#fff",
      };
    },
    formatter: errorFormatter,
    sort: true,
  },
  {
    dataField: "logGeneratedDate",
    text: "Log Generated At",
    width: "20",
    headerStyle: () => {
      return {
        backgroundColor: "#257d7c",
        color: "#fff",
      };
    },
    formatter: (cell) => cell.split("T")[0],
    sort: true,
  },

  // {
  //     dataField: 'logGeneratedDate',
  //     text: 'Log Generated Time',
  //   //   filter: textFilter(),
  //     formatter: cell => cell.split("T")[1],
  //     sort:true
  //   },

  {
    dataField: "device_types",
    text: "Device Code",
    headerStyle: () => {
      return {
        backgroundColor: "#257d7c",
        color: "#fff",
      };
    },
    formatter: (cell) => cell.split("|")[0],

    //   filter: textFilter(),
    sort: true,
  },
  {
    dataField: "device_types",
    text: "Device Type",
    headerStyle: () => {
      return {
        backgroundColor: "#257d7c",
        color: "#fff",
      };
    },
    formatter: (cell) => cell.split("|")[1],

    //   filter: textFilter(),
    sort: true,
  },
];

export default function TableData() {
  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");

  const [pageNo, setPageNo] = useState(0);
  const [record, setRecords] = useState(25);
  const [showStackView, setShowStackView] = useState(false);

  const [logType, setLogType] = useState({
    error: localStorage.getItem("selected_log")
      ? JSON.parse(localStorage.getItem("selected_log")).error
      : false,
    info: localStorage.getItem("selected_log")
      ? JSON.parse(localStorage.getItem("selected_log")).info
      : false,
    warn: localStorage.getItem("selected_log")
      ? JSON.parse(localStorage.getItem("selected_log")).warn
      : false,
    debug: localStorage.getItem("selected_log")
      ? JSON.parse(localStorage.getItem("selected_log")).debug
      : false,
    verbose: localStorage.getItem("selected_log")
      ? JSON.parse(localStorage.getItem("selected_log")).verbose
      : false,
  });

  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );
  const { loading, data } = getAllLogByCodeReducer;

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
  };

  const dispatch = useDispatch();

  const handlePageClick = (data) => {
    console.log(data);
    // const newPageNo = data.selected+1
    if (pageNo !== data.selected + 1) {
      setPageNo(data.selected + 1);
    }
    dispatch(getProjectByCode(code, null, null, pageNo, record));
  };

  useEffect(() => {
    console.log("hello second useEffect");
    if (
      logType.error ||
      logType.info ||
      logType.warn ||
      logType.debug ||
      logType.verbose
    ) {
      dispatch(getProjectByCode(code, null, logType, pageNo, record));
    } else {
      dispatch(getProjectByCode(code, null, null, pageNo, record));
    }
  }, [pageNo, record]);

  return (
    <>
      <CustomCard>
        {data && data.data && data.data.logs ? (
          <section className={Style.OuterTable}>
            {data && data.data && data.data.logs ? (
              <ToolkitProvider
                keyField="_id"
                data={data.data.logs}
                columns={columns}
                search
                exportCSV={{ onlyExportSelection: true, exportAll: true }}
              >
                {(props) => (
                  <>
                    <div className={Style.BootstrapTable}>
                      <SearchBar {...props.searchProps} />
                      <ExportCSVButton {...props.csvProps}>
                        Export Table
                      </ExportCSVButton>
                    </div>
                    <BootstrapTable
                      {...props.baseProps}
                      selectRow={selectRow}
                    />
                  </>
                )}
              </ToolkitProvider>
            ) : loading ? (
              <Spinner />
            ) : (
              <h2 style={{ color: "#212925", alignItems: "center" }}>
                No Log Available
              </h2>
            )}
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={4}
              pageCount={data && data.data && data.data.count / record}
              // previousLabel="< Previous"
              // initialPage={1}
              renderOnZeroPageCount={null}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              nextClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextLinkClassName={"page-link"}
            />
          </section>
        ) : loading ? (
          <Spinner height="400px" />
        ) : (
          <h2 style={{ color: "#212925", alignItems: "center" }}>
            No Log Available
          </h2>
        )}
      </CustomCard>
    </>
  );
}
