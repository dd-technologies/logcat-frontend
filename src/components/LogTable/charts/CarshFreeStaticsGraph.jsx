// import "./styles.css";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Spinner from "../../../Container/Spinner";

export default function CarshFreeStaticsGraph() {
  // static demoUrl = 'https://codesandbox.io/s/area-chart-in-responsive-container-e6dx0';
  const getCrashFreeUsersReducer = useSelector(
    (state) => state.getCrashFreeUsersReducer
  );

  const { loading, data } = getCrashFreeUsersReducer;

  let dt = data && data.response;
  // let date = data && data.response.map((date) => date.date);

  // CHANGING DATE FORMATE
  const dateFormatter = (date) => {
    // return moment(date).unix();
    return moment(date).format("DD-MM-YYYY");
  };
  return (
    <>
      {data && data.response ? (
        data.response == 0 ? (
          <p
            style={{
              width: "100%",
              height: "600%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No data found
          </p>
        ) : data && data.response ? (
          <div style={{ width: "100%", height: 180 }}>
            <ResponsiveContainer>
              <AreaChart
                data={dt}
                margin={{
                  top: 10,
                  right: 0,
                  left: -25,
                  bottom: 0,
                }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis
                  dataKey="date"
                  tickCount={5}
                  minTickGap={10}
                  tickFormatter={dateFormatter}
                />
                <YAxis interval={1} dataKey="data" axisLine={false} />
                <CartesianGrid vertical={false} strokeDasharray="0 0 4" />
                <Tooltip />
                {/* <Line
                  connectNulls
                  type="date"
                  dataKey="data"
                  stroke="#257d7c"
                  dot={false}
                  // strokeWidth={1}
                  fill="#257d7c"
                /> */}
                <Area
                  type="natural"
                  dataKey="data"
                  stroke="#257d7c"
                  fill="#257d7c"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <Spinner height="250px" />
        )
      ) : (
        <Spinner height="250px" />
      )}
    </>
  );
}
