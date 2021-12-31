import React, { PureComponent } from "react";
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

const TrandDataGraph = () => {
  //   const getLogCountsByDateReducer = useSelector(
  //     (state) => state.getLogCountsByDateReducer
  //   );
  //   const { data: ApiData } = getLogCountsByDateReducer;

  //   console.log("getLogCountsByDateReducer", getLogCountsByDateReducer);

  //   const LineCount =
  //     ApiData && ApiData.data && ApiData.data.response
  //       ? ApiData.data.response
  //       : null;
  //   console.log("LineCount", LineCount);

  const getLogCountsByDateReducer = useSelector(
    (state) => state.getLogCountsByDateReducer
  );
  const { loading, data } = getLogCountsByDateReducer;
  const LineCount =
    data && data.data && data.data.response ? data.data.response : null;

  return (
    <>
      {data && data.data && data.data.response ? (
        data.data.response.length == 0 ? (
          <p>No data found</p>
        ) : data && data.data && data.data.response ? (
          <div style={{ width: "100%", height: 150 }}>
            <ResponsiveContainer>
              <AreaChart
                data={LineCount}
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
          <Spinner height="250px" />
        )
      ) : (
        <Spinner height="250px" />
      )}

      {/* {data && data.data && data.data.response ? (
        <div style={{ width: "100%", height: 150 }}>
          <ResponsiveContainer>
            <AreaChart
              data={LineCount}
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
        <Spinner height="250px" />
      )} */}
    </>
  );
};

export default TrandDataGraph;
