import React from "react";
import CustomCard from "../../../Container/CustomCard";
import EventDataWithDate from "./EventDataWithDate";
import Stackkeys from "./Stackkeys";
import StackData from "./StackData";

export default function AnalyticsEventDataComp() {
  return (
    <>
      <CustomCard height="100%">
        <EventDataWithDate />
        <Stackkeys />
        {/* pending toggle button */}
        <StackData />
      </CustomCard>
    </>
  );
}
