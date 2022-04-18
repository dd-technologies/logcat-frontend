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

const TrandDataGraph = () => {
  const getLogCountsByDateReducer = useSelector(
    (state) => state.getLogCountsByDateReducer
  );
  const { theme } = React.useContext(ThemeContext);
  const { data } = getLogCountsByDateReducer;
  const LineCount =
    data && data.data && data.data.response ? data.data.response : null;

  // CHANGING DATE FORMATE
  const dateFormatter = (date) => {
    return moment(date).format("DD-MM-YYYY");
  };

  return (
    <>
      {data && data.data && data.data.response ? (
        data.data.response.length === 0 ? (
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
        ) : data && data.data && data.data.response ? (
          <div style={{ width: "100%", height: 180 }}>
            <ResponsiveContainer>
              <AreaChart
                data={LineCount}
                margin={{
                  top: 10,
                  right: 0,
                  left: -25,
                  bottom: 0,
                }}
              >
                <XAxis
                  dataKey="date"
                  tickCount={5}
                  minTickGap={10}
                  tickFormatter={dateFormatter}
                />
                <YAxis
                  dataKey="data"
                  interval={1}
                  axisLine={false}
                  stroke={theme == "dark-content" ? `#fff` : `#257d7c`}
                  fill={theme == "dark-content" ? `#fff` : `#257d7c`}
                />
                <CartesianGrid
                  stroke={theme == "dark-content" ? `#fff` : `#257d7c`}
                  vertical={false}
                  strokeDasharray="0 0 4"
                />
                <Tooltip />
                <Area
                  type="monotoneX"
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
};

export default TrandDataGraph;
