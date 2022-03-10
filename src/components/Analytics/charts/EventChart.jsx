import React, { PureComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getLogMsgOccurenceWRTDate } from "../../../redux/action/ProjectAction";

const EventChart = () => {
  const getLogCountsByDateReducer = useSelector(
    (state) => state.getLogCountsByDateReducer
  );

  const getErrorWRTOSReducer = useSelector(
    (state) => state.getErrorWRTOSReducer
  );

  const { data } = getErrorWRTOSReducer;
  const piCount = data && data.typeWiseCount ? data.typeWiseCount : null;

  const piCountData = piCount.map((items) => items.count);

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
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
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
