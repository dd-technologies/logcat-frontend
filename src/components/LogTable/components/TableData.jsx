import React from "react";
import CustomCard from "../../../Container/CustomCard";
import BootstrapTable from "react-bootstrap-table-next";
import { useSelector } from "react-redux";

export default function TableData() {
  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );

  // const {
  //   data: { data: alldata },
  // } = getAllLogByCodeReducer;

  // const { logs } = alldata;

  console.log("getAllLogByCodeReducer", getAllLogByCodeReducer);

  const products = [];
  const columns = [
    {
      dataField: "did",
      text: "Mac address",
      sort: true,
    },
    {
      dataField: "logMsg",
      text: "Log Message",
      sort: true,
    },
    {
      dataField: "logType",
      text: "Log Type",
      sort: true,
    },
    {
      dataField: "logGeneratedDate",
      text: "Log Generated At",
      sort: true,
    },
    {
      dataField: "device_types",
      text: "Device Code",
      sort: true,
    },
    {
      dataField: "device_types",
      text: "Device Type",
      sort: true,
    },
  ];

  return (
    <>
      <CustomCard>
        <BootstrapTable keyField="id" data={products} columns={columns} />
      </CustomCard>
    </>
  );
}
