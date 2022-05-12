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
import SpinnerCustome from "../../../Container/SpinnerCustome";
import { ThemeContext } from "../../../utils/ThemeContext";

const TrandDataGraph = () => {
  const getLogCountsByDateReducer = useSelector(
    (state) => state.getLogCountsByDateReducer
  );
  const { theme } = React.useContext(ThemeContext);
  const { data, loading } = getLogCountsByDateReducer;
  const LineCount =
    data && data.data && data.data.response ? data.data.response : null;

  // CHANGING DATE FORMATE
  const dateFormatter = (date) => {
    return moment(date).format("DD-MM-YYYY");
  };

  return (
    <>
      {data && data.data && data.data.response.length === 0 && (
        <p
          style={{
            width: "100%",
            height: "600%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: theme == "dark-content" ? `#fff` : `#000`,
          }}
        >
          No data found
        </p>
      )}

      {data && data.data && data.data.response.length > 0 && (
        <div style={{ width: "100%", height: 180 }}>
          <ResponsiveContainer>
            <AreaChart
              data={LineCount}
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
      )}
      {loading && <SpinnerCustome height="200px" />}
    </>
  );
};

export default TrandDataGraph;
