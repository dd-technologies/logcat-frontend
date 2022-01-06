import React, { PureComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getLogMsgOccurenceWRTDate } from "../../../redux/action/ProjectAction";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const EventChart = () => {
  const getLogCountsByDateReducer = useSelector(
    (state) => state.getLogCountsByDateReducer
  );
  // console.log("getLogCountsByDateReducer", getLogCountsByDateReducer);

  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const code = urlParams.get("code");
  //   let logMsg = urlParams.get("col").split("at")[0];

  //   console.log("logMsg", logMsg);
  //   const projectName = urlParams.get("name");

  //   var dt = new Date();
  //   const endDate = dt.toISOString().slice(0, 10);
  //   dt.setDate(dt.getDate() - 10);
  //   const startDate = dt.toISOString().slice(0, 10);

  //   useEffect(() => {
  //     dispatch(getLogMsgOccurenceWRTDate(code, startDate, endDate, logMsg));
  //   }, []);

  const getErrorWRTOSReducer = useSelector(
    (state) => state.getErrorWRTOSReducer
  );

  // useEffect(() => {
  //   (async () => {
      const { data } =  getErrorWRTOSReducer;
      const piCount = data && data.typeWiseCount ? data.typeWiseCount : null;

      // console.log("piCount", piCount);

      const piCountData =  piCount.map((items) => items.count);
      // console.log("piCountData", piCountData);

      // setChartDatApi(piCountData);
  //   })();
  // }, []);


  

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data&&data.typeWiseCount}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#257d7c" fill="#257d7c" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EventChart;
