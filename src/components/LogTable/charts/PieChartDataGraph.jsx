import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Spinner from "../../../Container/Spinner";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartDataGraph() {
  const [countData, setCountData] = useState([]);

  // LABELS
  const [lableData, setLableData] = useState([]);

  const getLogCountsReducer = useSelector((state) => state.getLogCountsReducer);

  const { data } = getLogCountsReducer;

  console.log("getLogCountsReducer", getLogCountsReducer);

  const fetchDetails = () => {
    if (data && data.data && data.data.typeWiseCount) {
      let logType = data.data.typeWiseCount.map((type) => type.logType);
      let countData = data.data.typeWiseCount.map((type) => type.count);
      setCountData(getLogCountsReducer.data.data.typeWiseCount);
      setLableData(logType);
      setCountData(countData);
      console.log("logType", countData);
    }

    // setting up labels
  };

  useEffect(() => {
    fetchDetails();
  }, [data]);

  const allData = {
    labels: lableData ? lableData : null,
    datasets: [
      {
        data: countData ? countData : null,
        backgroundColor: [
          "rgba(54, 162, 235)",
          "rgba(255, 159, 64)",
          "rgba(153, 102, 255)",
          "rgba(255, 99, 132)",
          "rgba(255, 206, 86)",
        ],

        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {data && data.data && data.data.typeWiseCount ? (
        <Pie data={allData} />
      ) : (
        <Spinner height="350px" />
      )}
    </>
  );
}
