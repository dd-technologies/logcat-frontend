import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Spinner from "../../../Container/Spinner";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartDataGraph() {
  const [countData, setCountData] = useState([]);

  // LABEL
  const [lableData, setLableData] = useState([]);
  const getLogCountsReducer = useSelector((state) => state.getLogCountsReducer);
  const { data } = getLogCountsReducer;
  const fetchDetails = () => {
    if (data && data.data && data.data.typeWiseCount) {
      let logType = data.data.typeWiseCount.map((type) => type.logType);
      let countData = data.data.typeWiseCount.map((type) => type.count);
      setCountData(getLogCountsReducer.data.data.typeWiseCount);
      setLableData(logType);
      setCountData(countData);
    }
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

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            fontSize: 5,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontSize: 5,
          },
        },
      ],
    },
  };

  return (
    <>
      <div style={{ height: "240px" }}>
        {/* CHECKING DATA */}
        {data && data.data && data.data.typeWiseCount ? (
          countData.length == 0 ? (
            <p
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              No data found
            </p>
          ) : data && data.data && data.data.typeWiseCount ? (
            <Pie data={allData} options={options} />
          ) : (
            <Spinner height="350px" />
          )
        ) : (
          <Spinner height="350px" />
        )}
      </div>
    </>
  );
}
