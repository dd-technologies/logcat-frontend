// import "./styles.css";
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

export default function EventByVersionChart() {
  const getLogMsgOccurenceWRTDateReducer = useSelector(
    (state) => state.getLogMsgOccurenceWRTDateReducer
  );

  const { data } = getLogMsgOccurenceWRTDateReducer;

  

  // let dataarray = data && data.response ? data.response : [];

  // CHANGING DATE FORMATE
  const dateFormatter = (date) => {
    // return moment(date).unix();
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
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="date"
            tickCount={5}
            minTickGap={10}
            tickFormatter={dateFormatter}
          />
          <YAxis dataKey="data" axisLine={true} />
          <CartesianGrid vertical={false}  strokeDasharray="0 0 4"/>{/*strokeDasharray="0 0 4"*/}
          <Tooltip />
          <Line
            isAnimationActive={false}
            connectNulls
            type="monotone"
            dataKey="data"
            dot={false}
            stroke="#257d7c"
            fill="#257d7c"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
