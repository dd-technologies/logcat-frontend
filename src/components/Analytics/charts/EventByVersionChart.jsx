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

const data = [
  { name: "Page A", uv: 4000 },
  { name: "Page B", uv: 3000 },
  { name: "Page C", uv: 2000 },
  { name: "Page D" },
  { name: "Page E", uv: 1890 },
  { name: "Page F", uv: 2390 },
  { name: "Page G", uv: 3490 },
];

export default function EventByVersionChart() {
  const getLogMsgOccurenceWRTDateReducer = useSelector(
    (state) => state.getLogMsgOccurenceWRTDateReducer
  );

  const { loading, data } = getLogMsgOccurenceWRTDateReducer;

  // console.log("getLogMsgOccurenceWRTDateReducer", data.response);
  let dataarray = data && data.response ? data.response : [];

  // let alldate = data && data.response && dataarray.map((items) => items.date);
  // let day = alldate.map((day) => day[0]);
  // console.log("day", day);

  // changing formation of date

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
          <XAxis dataKey="date" tickCount={5} minTickGap={10} tickFormatter={dateFormatter} />
          {/* <YAxis dataKey="data" /> */}
          <CartesianGrid strokeDasharray="0 0 4" />
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
