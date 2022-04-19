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
import { ThemeContext } from "../../../utils/ThemeContext";

export default function CarshFreeStaticsGraph() {
  const getCrashFreeUsersReducer = useSelector(
    (state) => state.getCrashFreeUsersReducer
  );
  const { data } = getCrashFreeUsersReducer;
  let dt = data && data.response;

  const { theme } = React.useContext(ThemeContext);
  console.log("first", theme);

  // Date Formate
  const dateFormatter = (date) => {
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
                  left: -10,
                  bottom: 0,
                }}
              >
                <XAxis
                  stroke={theme == "dark-content" ? `#fff` : `#257d7c`}
                  fill={theme == "dark-content" ? `#fff` : `#257d7c`}
                  dataKey="date"
                  tickCount={5}
                  minTickGap={10}
                  tickFormatter={dateFormatter}
                />
                <YAxis
                  interval={1}
                  dataKey="data"
                  axisLine={false}
                  stroke={theme == "dark-content" ? `#fff` : `#257d7c`}
                />
                <CartesianGrid
                  stroke={theme == "dark-content" ? `#fff` : `#257d7c`}
                  vertical={false}
                  strokeDasharray="0 0 4"
                />
                <Tooltip />
                <Area
                  type="monotoneY"
                  dataKey="data"
                  stroke={theme == "dark-content" ? `#fff` : `#257d7c`}
                  fill={theme == "dark-content" ? `#fff` : `#257d7c`}
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
