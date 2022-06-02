import React from "react";
import {  useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const EventChart = () => {
  const getErrorWRTOSReducer = useSelector(
    (state) => state.getErrorWRTOSReducer
  );
  const { data } = getErrorWRTOSReducer;

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data && data.typeWiseCount}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#257d7c"
            fill="#257d7c"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EventChart;
