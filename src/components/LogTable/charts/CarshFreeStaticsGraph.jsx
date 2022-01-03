import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import Spinner from "../../../Container/Spinner";
import moment from "moment";

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

 // CHANGING DATE FORMATE
 const dateFormatter = (date) => {
  // return moment(date).unix();
  return moment(date).format("DD-MM-YYYY");
};


export default function CarshFreeStaticsGraph() {
  // static demoUrl = 'https://codesandbox.io/s/area-chart-in-responsive-container-e6dx0';
  const getCrashFreeUsersReducer = useSelector(
    (state) => state.getCrashFreeUsersReducer
  );

  const { loading, data } = getCrashFreeUsersReducer;
  // console.log(data);

  return (
    <>
      {data && data.response ? (
        data.response == 0 ? (
          <p>No data found</p>
        ) : data && data.response ? (
          <div style={{ width: "100%", height: 160 }}>
            <ResponsiveContainer>
              <AreaChart
                data={data && data.response}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={dateFormatter} />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="countLog"
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

      {/* {data ? (
        <div style={{ width: "100%", height: 160 }}>
          <ResponsiveContainer>
            <AreaChart
              data={data && data.response}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="countLog"
                stroke="#257d7c"
                fill="#257d7c"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <Spinner height="200px" />
      )} */}
    </>
  );
}
