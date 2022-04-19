import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../../utils/ThemeContext";

export default function EventByVersionChart() {
  const { theme } = React.useContext(ThemeContext);
  const getLogMsgOccurenceWRTDateReducer = useSelector(
    (state) => state.getLogMsgOccurenceWRTDateReducer
  );
  const { data } = getLogMsgOccurenceWRTDateReducer;

  // CHANGING DATE FORMATE
  const dateFormatter = (date) => {
    return moment(date).format("DD-MM-YYYY");
  };
  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <LineChart
          data={data && data.response}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 20,
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
            axisLine={true}
            stroke={theme == "dark-content" ? `#fff` : `#257d7c`}
            fill={theme == "dark-content" ? `#fff` : `#257d7c`}
          />
          stroke={theme == "dark-content" ? `#fff` : `#257d7c`}
          <CartesianGrid vertical={false} strokeDasharray="0 0 4" />
          <Tooltip />
          <Line
            isAnimationActive={false}
            connectNulls
            type="monotoneX"
            dataKey="data"
            dot={false}
            stroke={theme == "dark-content" ? `#fff` : `#257d7c`}
            fill={theme == "dark-content" ? `#fff` : `#257d7c`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
